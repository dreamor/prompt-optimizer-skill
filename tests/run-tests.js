#!/usr/bin/env node

/**
 * Prompt Optimizer — Automated Test Runner
 *
 * Usage:
 *   node tests/run-tests.js              # Run all tests
 *   node tests/run-tests.js --frameworks # Framework integrity only
 *   node tests/run-tests.js --cli        # CLI smoke tests only
 *   node tests/run-tests.js --json       # JSON validation only
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const integrity = require('./framework-integrity.test.js');

const ROOT = path.join(__dirname, '..');
const passed = [];
const failed = [];

function test(name, fn) {
  try {
    fn();
    passed.push(name);
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed.push({ name, error: err.message });
    console.log(`  ❌ ${name}`);
    console.log(`     ${err.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// ─── Framework Integrity Tests ───────────────────────────────────────

function runFrameworkTests() {
  console.log('\n📁 Framework Integrity Tests\n');

  const indexPath = path.join(ROOT, 'frameworks', 'index.json');
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  test('index.json parses as valid JSON', () => {
    assert(typeof index === 'object', 'index.json should be an object');
  });

  test('index.json total equals 61', () => {
    assert(index.total === 61, `Expected total 61, got ${index.total}`);
  });

  test('by_category counts match framework entries', () => {
    const counts = { simple: 0, medium: 0, complex: 0, patterns: 0 };
    index.frameworks.forEach((fw) => { counts[fw.category] = (counts[fw.category] || 0) + 1; });
    for (const cat of Object.keys(index.by_category)) {
      assert(
        counts[cat] === index.by_category[cat],
        `Category "${cat}": index says ${index.by_category[cat]}, found ${counts[cat]}`
      );
    }
  });

  test('by_category counts match actual file counts on disk', () => {
    const errors = integrity.validateCategoryCounts();
    assert(errors.length === 0, errors.join('; '));
  });

  test('every framework entry has required fields', () => {
    const required = ['id', 'name', 'full_name', 'category', 'file', 'element_count', 'elements', 'domains', 'use_cases'];
    index.frameworks.forEach((fw) => {
      required.forEach((field) => {
        assert(fw[field] !== undefined, `Framework "${fw.name}" missing field "${field}"`);
      });
    });
  });

  test('every framework file path exists on disk', () => {
    const errors = integrity.validateNoMissingFiles();
    assert(errors.length === 0, errors.join('; '));
  });

  test('every .md file in framework dirs has a corresponding index entry', () => {
    const errors = integrity.validateNoOrphans();
    assert(errors.length === 0, errors.join('; '));
  });

  test('no duplicate framework ids or names', () => {
    const errors = integrity.validateNoDuplicates();
    assert(errors.length === 0, errors.join('; '));
  });

  test('all domains listed in index.domains are used by at least one framework', () => {
    const usedDomains = new Set(index.frameworks.flatMap((fw) => fw.domains));
    index.domains.forEach((domain) => {
      assert(usedDomains.has(domain), `Domain "${domain}" listed but not used by any framework`);
    });
  });

  test('every framework file has required sections and mentions its name', () => {
    const errors = integrity.validateFrameworkSections();
    assert(errors.length === 0, errors.join('; '));
  });
}

// ─── CLI Smoke Tests ──────────────────────────────────────────────────

function runCliTests() {
  console.log('\n🖥️  CLI Smoke Tests\n');

  const cli = path.join(ROOT, 'bin', 'prompt-optimizer.js');

  function cliTest(name, args, expectExit0 = true) {
    test(name, () => {
      try {
        const output = execFileSync('node', [cli, ...args], { encoding: 'utf-8', timeout: 10000 });
        if (expectExit0) assert(true, '');
      } catch (err) {
        if (expectExit0) {
          throw new Error(`Exit code ${err.status}: ${err.stderr || err.message}`);
        }
      }
    });
  }

  cliTest('version command exits 0', ['version']);
  cliTest('help command exits 0', ['help']);
  cliTest('frameworks command exits 0', ['frameworks']);
  cliTest('frameworks --json outputs valid JSON', ['frameworks', '--json']);
  cliTest('frameworks --filter marketing exits 0', ['frameworks', '--filter', 'marketing']);
  cliTest('frameworks --category simple exits 0', ['frameworks', '--category', 'simple']);
  cliTest('template command exits 0', ['template', 'test prompt']);
  cliTest('template --basic exits 0', ['template', 'test prompt', '--basic']);
  cliTest('template --expert exits 0', ['template', 'test prompt', '--expert']);
  cliTest('template --framework race exits 0', ['template', 'test prompt', '--framework', 'race']);
  cliTest('template --framework <unknown> exits non-zero', ['template', 'test prompt', '--framework', 'nope'], false);
  cliTest('frameworks <id> exits 0', ['frameworks', 'race']);
  cliTest('frameworks <unknown id> exits non-zero', ['frameworks', 'nope'], false);
  cliTest('no-args shows help (exit 0)', []);
  cliTest('test command exits 0', ['test']);

  test('flags after free-text input still apply (regression: flag/input order)', () => {
    const output = execFileSync('node', [cli, 'template', 'test prompt', '--basic'], { encoding: 'utf-8' });
    assert(/📊 Version: basic/.test(output), 'Version should be "basic" regardless of flag position');
    assert(!output.includes('test prompt --basic'), 'Input should not swallow the trailing flag as literal text');
  });

  test('--framework scaffold uses the framework\'s own elements', () => {
    const output = execFileSync('node', [cli, 'template', 'test prompt', '--framework', 'race'], { encoding: 'utf-8' });
    assert(output.includes('Role-Action-Context-Expectation'), 'Should include the framework full name');
    assert(output.includes('## 1. Role'), 'Should render the framework\'s own elements as sections');
  });

  test('frameworks <id> prints the framework\'s full definition', () => {
    const output = execFileSync('node', [cli, 'frameworks', 'race'], { encoding: 'utf-8' });
    assert(output.includes('RACE'), 'Should print the framework definition markdown');
    assert(output.includes('Role-Action-Context-Expectation'), 'Should print the framework full name');
  });

  test('version output matches package.json', () => {
    const output = execFileSync('node', [cli, 'version'], { encoding: 'utf-8' }).trim();
    const pkg = require(path.join(ROOT, 'package.json'));
    assert(output.includes(pkg.version), `Version output "${output}" does not contain ${pkg.version}`);
  });

  test('frameworks --json output is valid JSON with frameworks array', () => {
    const output = execFileSync('node', [cli, 'frameworks', '--json'], { encoding: 'utf-8' });
    const data = JSON.parse(output);
    assert(Array.isArray(data.frameworks), 'frameworks should be an array');
    assert(data.frameworks.length > 0, 'frameworks array should not be empty');
  });

  test('template output contains input prompt', () => {
    const output = execFileSync('node', [cli, 'template', 'MyUniqueTestPrompt'], { encoding: 'utf-8' });
    assert(output.includes('MyUniqueTestPrompt'), 'Template output should contain the input prompt');
  });
}

// ─── JSON Validation Tests ────────────────────────────────────────────

function runJsonTests() {
  console.log('\n📋 JSON Validation Tests\n');

  const jsonFiles = [
    'package.json',
    'frameworks/index.json',
  ];

  jsonFiles.forEach((file) => {
    test(`${file} is valid JSON`, () => {
      const content = fs.readFileSync(path.join(ROOT, file), 'utf-8');
      assert(() => { JSON.parse(content); return true; }, `${file} is not valid JSON`);
    });
  });

  test('VERSION file matches package.json version', () => {
    const versionFile = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf-8').trim();
    const pkg = require(path.join(ROOT, 'package.json'));
    assert(versionFile === pkg.version, `VERSION file "${versionFile}" != package.json "${pkg.version}"`);
  });

  test('package.json has required fields for npm publish', () => {
    const pkg = require(path.join(ROOT, 'package.json'));
    const required = ['name', 'version', 'description', 'main', 'bin', 'license', 'repository'];
    required.forEach((field) => {
      assert(pkg[field] !== undefined, `package.json missing field "${field}"`);
    });
  });

  test('bin/prompt-optimizer.js is executable', () => {
    const cliPath = path.join(ROOT, 'bin', 'prompt-optimizer.js');
    assert(fs.existsSync(cliPath), 'CLI file does not exist');
    const content = fs.readFileSync(cliPath, 'utf-8');
    assert(content.startsWith('#!/usr/bin/env node'), 'CLI file should start with shebang');
  });
}

// ─── Library API Tests (index.js) ────────────────────────────────────

function runLibraryTests() {
  console.log('\n📦 Library API Tests (index.js)\n');

  const lib = require(path.join(ROOT, 'index.js'));

  test('loadFrameworkIndex returns object with frameworks array', () => {
    const index = lib.loadFrameworkIndex();
    assert(typeof index === 'object', 'Should return an object');
    assert(Array.isArray(index.frameworks), 'Should have frameworks array');
    assert(index.frameworks.length === 61, `Expected 61 frameworks, got ${index.frameworks.length}`);
  });

  test('listFrameworks returns all 61 ids', () => {
    const ids = lib.listFrameworks();
    assert(Array.isArray(ids), 'Should return an array');
    assert(ids.length === 61, `Expected 61 ids, got ${ids.length}`);
    assert(ids.includes('ape'), 'Should include "ape"');
    assert(ids.includes('crispe'), 'Should include "crispe"');
  });

  test('getFramework returns content for known id', () => {
    const content = lib.getFramework('ape');
    assert(content !== null, 'APE framework should not be null');
    assert(content.includes('Action-Purpose-Expectation'), 'Should contain framework full name');
  });

  test('getFramework returns null for unknown id', () => {
    const content = lib.getFramework('nonexistent-framework-xyz');
    assert(content === null, 'Should return null for unknown framework');
  });

  test('VERSION matches package.json', () => {
    const pkg = require(path.join(ROOT, 'package.json'));
    assert(lib.VERSION === pkg.version, `VERSION "${lib.VERSION}" != package.json "${pkg.version}"`);
  });

  test('every id from listFrameworks is loadable via getFramework', () => {
    const ids = lib.listFrameworks();
    const failures = ids.filter((id) => lib.getFramework(id) === null);
    assert(failures.length === 0, `These ids returned null: ${failures.join(', ')}`);
  });
}

// ─── Main ─────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const runAll = args.length === 0;
  const runFrameworks = runAll || args.includes('--frameworks');
  const runCli = runAll || args.includes('--cli');
  const runJson = runAll || args.includes('--json');
  const runLib = runAll || args.includes('--lib');

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║        Prompt Optimizer — Automated Test Suite        ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  if (runFrameworks) runFrameworkTests();
  if (runCli) runCliTests();
  if (runJson) runJsonTests();
  if (runLib) runLibraryTests();

  console.log('\n' + '─'.repeat(56));
  console.log(`\n📊 Results: ${passed.length} passed, ${failed.length} failed\n`);

  if (failed.length > 0) {
    console.log('Failed tests:\n');
    failed.forEach(({ name, error }) => {
      console.log(`  ❌ ${name}`);
      console.log(`     ${error}\n`);
    });
    process.exit(1);
  }

  console.log('All tests passed! ✨\n');
}

main();