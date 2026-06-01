#!/usr/bin/env node

/**
 * Prompt Optimizer CLI
 * Command-line tool for optimizing prompts
 */

const fs = require('fs');
const path = require('path');

const VERSION = require('../package.json').version;

function showHelp() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     Prompt Optimizer v${VERSION} - Prompt Optimization Tool  ║
╚════════════════════════════════════════════════════════╝

NOTE: The CLI ships STATIC templates only. Real, framework-aware
optimization happens inside Claude Code (the SKILL.md workflow).
Use the CLI for: quick template scaffolding, listing frameworks,
querying frameworks/index.json.

Usage:
  npx prompt-optimizer-skill [options] [command] [input]

Commands:
  template <text>          Print a static template scaffold (alias: optimize, o)
  frameworks               List all frameworks (alias: f)
    --json                 Print frameworks/index.json
    --filter <domain>      Filter by domain (e.g. marketing, education)
    --category <cat>       Filter by category (simple/medium/complex/patterns)
  test                     Show test-case summary (alias: t)
  version                  Show version number (alias: v)
  help                     Show this help (alias: h)

Options for template:
  -b, --basic              Basic scaffold
  -e, --enhanced           Enhanced scaffold (default)
  -x, --expert             Expert scaffold

Examples:
  npx prompt-optimizer-skill template "Write an email to a customer"
  npx prompt-optimizer-skill frameworks
  npx prompt-optimizer-skill frameworks --filter marketing
  npx prompt-optimizer-skill frameworks --json

More info: https://github.com/dreamor/prompt-optimizer-skill
`);
}

function showVersion() {
  console.log(`Prompt Optimizer v${VERSION}`);
}

function optimizePrompt(input, version = 'enhanced') {
  if (!input || input.trim() === '') {
    console.error('❌ Error: Please provide a prompt');
    console.log('Usage: npx prompt-optimizer-skill template "your prompt"');
    process.exit(1);
  }

  console.log(`
╔════════════════════════════════════════════════════════╗
║         Prompt Optimizer - Static Template Scaffold    ║
╚════════════════════════════════════════════════════════╝

NOTE: This is a STATIC template — it does not call any model
and does not perform real CLARITY scoring or framework selection.
For real optimization, invoke the skill from Claude Code.
`);

  console.log(`📥 Input: ${input}`);
  console.log(`📊 Version: ${version}`);
  console.log('\n' + '─'.repeat(56) + '\n');

  const templates = {
    basic: generateBasicTemplate(input),
    enhanced: generateEnhancedTemplate(input),
    expert: generateExpertTemplate(input)
  };

  console.log(templates[version] || templates.enhanced);

  console.log('\n' + '─'.repeat(56));
  console.log('\n💡 Use -e for enhanced, -x for expert');
  console.log('📖 Docs: https://github.com/dreamor/prompt-optimizer-skill');
}

function generateBasicTemplate(input) {
  return `# Optimized Prompt

## Role
You are a professional assistant

## Task
${input}

## Output Format
- Clear structure
- Concise expression

## Constraints
- Answer the core question directly
- Avoid redundant information
`;
}

function generateEnhancedTemplate(input) {
  return `# Optimized Prompt

## Role
You are an experienced professional with expertise in the relevant domain.

## Context
The user needs to complete the following task with professional, actionable results.

## Task
${input}

## Instructions
1. Analyze the core requirements of the task
2. Provide a structured solution
3. Give concrete, executable steps
4. Provide quality check criteria

## Output Format
1. Executive summary
2. Detailed plan
3. Step-by-step checklist
4. Success criteria

## Constraints
- Content must be professional and practical
- Steps must be clear and executable
- Consider common edge cases

## Examples
Input: ${input}
Output: [Professional output generated based on the above requirements]
`;
}

function generateExpertTemplate(input) {
  return `# Optimized Prompt (Expert Version)

## Role
You are a senior expert with 15+ years of experience in the relevant field, having served numerous leading organizations and deeply versed in industry best practices.

## Context
### Background
- Task type: Professional-grade content generation
- Target audience: Industry professionals
- Quality requirement: Highest standard

### Reference Framework
This task applies the RACEF/CRISPE complex framework

## Task
${input}

## Instructions
### Phase 1: Analysis and Planning
1. Deeply understand the task requirements and constraints
2. Identify critical success factors
3. Formulate an execution strategy

### Phase 2: Execution and Generation
1. Generate content according to professional standards
2. Ensure every section is well-substantiated
3. Use industry terminology and best practices

### Phase 3: Validation and Refinement
1. Self-review the generated content
2. Check compliance with all constraints
3. Optimize wording and structure

## Output Format
1. **Executive Summary**
   - Core insights
   - Key data
   - Primary recommendations

2. **Detailed Analysis**
   - Background analysis
   - Problem diagnosis
   - Solution

3. **Implementation Plan**
   - Step-by-step checklist
   - Timeline
   - Resource requirements
   - Risk management

4. **Quality Criteria**
   - Acceptance criteria
   - Evaluation metrics
   - Review checklist

## Constraints
### Hard Constraints
- Content must be original and professional
- All recommendations must be actionable
- Edge cases must be considered

### Soft Constraints
- Tone: professional yet approachable
- Structure: clear and readable
- Use visual elements appropriately (tables, lists)

## Validation Checklist
- [ ] Content meets professional standards
- [ ] Logic is rigorous and complete
- [ ] High actionability
- [ ] Risks and edge cases considered
- [ ] Output format requirements met

## Meta
- Optimization framework: CLARITY + RACEF
- Quality grade: Expert
- Use case: Important projects, client deliverables, public releases
`;
}

function loadIndex() {
  const indexPath = path.join(__dirname, '..', 'frameworks', 'index.json');
  try {
    return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  } catch (err) {
    return null;
  }
}

function listFrameworks({ json = false, filterDomain = null, filterCategory = null } = {}) {
  const index = loadIndex();

  if (json) {
    if (!index) {
      console.error('❌ frameworks/index.json not found');
      process.exit(1);
    }
    console.log(JSON.stringify(index, null, 2));
    return;
  }

  console.log(`
╔════════════════════════════════════════════════════════╗
║         Prompt Optimizer - Framework Library           ║
╚════════════════════════════════════════════════════════╝
`);

  if (index) {
    let entries = index.frameworks;
    if (filterDomain) {
      entries = entries.filter(f => f.domains.includes(filterDomain));
    }
    if (filterCategory) {
      entries = entries.filter(f => f.category === filterCategory);
    }

    if (entries.length === 0) {
      console.log(`(no frameworks match filter — domain=${filterDomain || 'any'}, category=${filterCategory || 'any'})`);
      console.log(`\nAvailable domains: ${index.domains.join(', ')}`);
      console.log(`Available categories: ${Object.keys(index.by_category).join(', ')}`);
      return;
    }

    const byCat = entries.reduce((acc, fw) => {
      (acc[fw.category] ||= []).push(fw);
      return acc;
    }, {});

    for (const cat of ['simple', 'medium', 'complex', 'patterns']) {
      if (!byCat[cat]) continue;
      console.log(`\n📁 ${cat} (${byCat[cat].length})`);
      console.log('─'.repeat(56));
      for (const fw of byCat[cat]) {
        const fullName = fw.full_name ? ` — ${fw.full_name}` : '';
        console.log(`  • ${fw.name}${fullName}`);
      }
    }

    console.log(`\n${'─'.repeat(56)}`);
    console.log(`Total: ${entries.length} of ${index.total} frameworks`);
    if (filterDomain || filterCategory) {
      console.log(`Filters: domain=${filterDomain || 'any'}, category=${filterCategory || 'any'}`);
    }
    console.log(`Domains available: ${index.domains.join(', ')}`);
  } else {
    // Fallback: scan directory if index.json missing
    const frameworksDir = path.join(__dirname, '..', 'frameworks');
    const categories = {
      simple: 'Simple frameworks (≤3 elements)',
      medium: 'Medium frameworks (4-5 elements)',
      complex: 'Complex frameworks (6+ elements)',
      patterns: 'Reusable patterns'
    };
    for (const [dir, title] of Object.entries(categories)) {
      try {
        const files = fs.readdirSync(path.join(frameworksDir, dir)).filter(f => f.endsWith('.md'));
        console.log(`\n📁 ${title}`);
        console.log('─'.repeat(56));
        files.forEach(file => console.log(`  • ${file.replace('.md', '')}`));
        console.log(`  Total: ${files.length}`);
      } catch (err) {
        console.log(`\n📁 ${title}\n  (no files found)`);
      }
    }
  }

  console.log(`\n${'─'.repeat(56)}`);
  console.log('Usage:');
  console.log('  1. View framework details: cat frameworks/<category>/<NAME>.md');
  console.log('  2. Print structured index: npx prompt-optimizer-skill frameworks --json');
  console.log('  3. More info: https://github.com/dreamor/prompt-optimizer-skill');
}

function runTests() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║            Prompt Optimizer - Test Suite               ║
╚════════════════════════════════════════════════════════╝
`);

  const testsDir = path.join(__dirname, '..', 'tests');

  try {
    const testFile = path.join(testsDir, 'test-cases.md');
    const content = fs.readFileSync(testFile, 'utf-8');

    const testCount = (content.match(/### TC-/g) || []).length;

    console.log(`✅ Found ${testCount} test cases`);
    console.log(`📄 Test file: tests/test-cases.md`);
    console.log('\nTest categories:');

    const categories = [
      'Boundary condition tests',
      'Framework selection tests',
      'Clarification question tests',
      'Quality validation tests',
      'Multi-version output tests',
      'Iterative optimization tests',
      'Framework library tests',
      'Performance tests'
    ];

    categories.forEach((cat, index) => {
      console.log(`  ${index + 1}. ${cat}`);
    });

    console.log(`
${'─'.repeat(56)}
💡 Tip: See tests/test-cases.md for detailed test cases
`);

  } catch (err) {
    console.error('❌ Test file not found');
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0];
  const options = args.slice(1);

  let version = 'enhanced';
  let input = '';
  let frameworksOpts = { json: false, filterDomain: null, filterCategory: null };

  for (let i = 0; i < options.length; i++) {
    const opt = options[i];

    switch (opt) {
      case '-v':
      case '--version':
        showVersion();
        return;
      case '-h':
      case '--help':
        showHelp();
        return;
      case '-b':
      case '--basic':
        version = 'basic';
        break;
      case '-e':
      case '--enhanced':
        version = 'enhanced';
        break;
      case '-x':
      case '--expert':
        version = 'expert';
        break;
      case '--json':
        frameworksOpts.json = true;
        break;
      case '--filter':
        frameworksOpts.filterDomain = options[++i];
        break;
      case '--category':
        frameworksOpts.filterCategory = options[++i];
        break;
      default:
        if (!opt.startsWith('-')) {
          input = options.slice(i).join(' ');
          i = options.length;
        }
    }
  }

  if (!input && options.length > 0 && !options[0].startsWith('-')) {
    input = options.filter(o => !o.startsWith('-')).join(' ');
  }

  switch (command) {
    case 'template':
    case 'optimize':
    case 'o':
      optimizePrompt(input, version);
      break;
    case 'frameworks':
    case 'f':
      listFrameworks(frameworksOpts);
      break;
    case 'test':
    case 't':
      runTests();
      break;
    case 'version':
    case 'v':
      showVersion();
      break;
    case 'help':
    case 'h':
      showHelp();
      break;
    default:
      if (command && !command.startsWith('-')) {
        optimizePrompt([command, ...options].join(' '), version);
      } else {
        console.error(`❌ Unknown command: ${command}`);
        console.log('Use "npx prompt-optimizer-skill help" to see available commands');
        process.exit(1);
      }
  }
}

main();
