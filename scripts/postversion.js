#!/usr/bin/env node

/**
 * postversion — sync version across all metadata files after npm version bump.
 *
 * Called automatically by `npm version` via package.json `postversion` hook.
 * Reads the new version from package.json and writes it to:
 *   - VERSION
 *   - claude.json
 *   - .claude-plugin/marketplace.json
 *   - frameworks/index.json
 *   - SKILL.md  (frontmatter `version:` field)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf-8');
}

function write(file, content) {
  fs.writeFileSync(path.join(ROOT, file), content);
}

function main() {
  const pkg = JSON.parse(read('package.json'));
  const version = pkg.version;

  if (!version || typeof version !== 'string') {
    console.error('❌ Could not read version from package.json');
    process.exit(1);
  }

  // 1. VERSION file — plain text
  write('VERSION', version + '\n');
  console.log(`✅ VERSION → ${version}`);

  // 2. claude.json — replace "version": "..." (first occurrence)
  write(
    'claude.json',
    read('claude.json').replace(/(?<="version":\s*")[^"]+/, version)
  );
  console.log(`✅ claude.json → ${version}`);

  // 3. .claude-plugin/marketplace.json — all occurrences (metadata + plugin)
  write(
    '.claude-plugin/marketplace.json',
    read('.claude-plugin/marketplace.json').replace(/(?<="version":\s*")[^"]+/g, version)
  );
  console.log(`✅ marketplace.json → ${version}`);

  // 4. frameworks/index.json — "version" key only
  write(
    'frameworks/index.json',
    read('frameworks/index.json').replace(/(?<="version":\s*")[^"]+/, version)
  );
  console.log(`✅ frameworks/index.json → ${version}`);

  // 5. SKILL.md — frontmatter version: line
  const skill = read('SKILL.md');
  if (/^version:\s*.+/m.test(skill)) {
    write('SKILL.md', skill.replace(/^(version:\s*).+/m, `$1${version}`));
    console.log(`✅ SKILL.md frontmatter → ${version}`);
  } else {
    console.warn('⚠️  Could not find "version:" in SKILL.md frontmatter — skipping');
  }

  // Stage all updated files
  const { execSync } = require('child_process');
  const files = ['package.json', 'package-lock.json', 'VERSION', 'claude.json', '.claude-plugin/marketplace.json', 'frameworks/index.json', 'SKILL.md'];
  try {
    execSync(`git add ${files.join(' ')}`, { cwd: ROOT, stdio: 'ignore' });
    console.log('✅ git staged version files');
  } catch (_) {
    console.warn('⚠️  Could not git stage files (not a git repo or git not available)');
  }

  console.log(`\n🎉 All files synced to v${version}`);
}

main();