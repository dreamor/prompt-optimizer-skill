#!/usr/bin/env node

/**
 * Prompt Optimizer CLI
 * Command-line tool for optimizing prompts
 */

const path = require('path');
const { readFileSync, readdirSync } = require('fs');
const skillLib = require('../index.js');

const VERSION = require('../package.json').version;

function showHelp() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     Prompt Optimizer v${VERSION} - Prompt Optimization Tool  ║
╚════════════════════════════════════════════════════════╝

NOTE: The CLI ships STATIC templates only. Real, framework-aware
optimization happens inside your AI agent, via the SKILL.md workflow
(any agent that supports the SKILL.md skill format).
Use the CLI for: quick template scaffolding, listing frameworks,
querying frameworks/index.json.

Usage:
  npx prompt-optimizer-skill [options] [command] [input]

Commands:
  template <text>          Print a static template scaffold (alias: optimize, o)
  frameworks               List all frameworks (alias: f)
    <id>                   Print one framework's full definition (e.g. "frameworks race")
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
  --framework <id>         Scaffold using a specific framework's own elements
                           (see "frameworks --json" for valid ids)

Examples:
  npx prompt-optimizer-skill template "Write an email to a customer"
  npx prompt-optimizer-skill template "Write an email to a customer" --framework race
  npx prompt-optimizer-skill frameworks
  npx prompt-optimizer-skill frameworks race
  npx prompt-optimizer-skill frameworks --filter marketing
  npx prompt-optimizer-skill frameworks --json

More info: https://github.com/dreamor/prompt-optimizer-skill
`);
}

function showVersion() {
  console.log(`Prompt Optimizer v${VERSION}`);
}

function optimizePrompt(input, version = 'enhanced', frameworkId = null) {
  if (typeof input !== 'string' || !input.trim()) {
    console.error('❌ Error: Please provide a prompt');
    console.log('Usage: npx prompt-optimizer-skill template "your prompt"');
    process.exit(1);
  }

  let framework = null;
  if (frameworkId) {
    framework = findFramework(frameworkId);
    if (!framework) {
      console.error(`❌ Error: Unknown framework id "${frameworkId}"`);
      console.log('Run "npx prompt-optimizer-skill frameworks --json" to see valid ids');
      process.exit(1);
    }
  }

  console.log(`
╔════════════════════════════════════════════════════════╗
║         Prompt Optimizer - Static Template Scaffold    ║
╚════════════════════════════════════════════════════════╝

NOTE: This is a STATIC template — it does not call any model
and does not perform real CLARITY scoring or framework selection.
For real optimization, invoke this skill from your AI agent.
`);

  console.log(`📥 Input: ${input}`);
  console.log(`📊 Version: ${version}`);
  if (framework) console.log(`🧩 Framework: ${framework.name} (${framework.full_name})`);
  console.log('\n' + '─'.repeat(56) + '\n');

  if (framework) {
    console.log(generateFrameworkTemplate(input, framework, version));
  } else {
    const templates = {
      basic: generateBasicTemplate(input),
      enhanced: generateEnhancedTemplate(input),
      expert: generateExpertTemplate(input)
    };
    console.log(templates[version] || templates.enhanced);
  }

  console.log('\n' + '─'.repeat(56));
  console.log('\n💡 Use -e for enhanced, -x for expert, --framework <id> for a framework-specific scaffold');
  console.log('📖 Docs: https://github.com/dreamor/prompt-optimizer-skill');
}

function findFramework(frameworkId) {
  const index = skillLib.loadFrameworkIndex();
  if (!index) return null;
  const needle = frameworkId.toLowerCase();
  return index.frameworks.find((fw) => fw.id.toLowerCase() === needle) || null;
}

function showFrameworkDetail(frameworkId) {
  const framework = findFramework(frameworkId);
  if (!framework) {
    console.error(`❌ Error: Unknown framework id "${frameworkId}"`);
    console.log('Run "npx prompt-optimizer-skill frameworks --json" to see valid ids');
    process.exit(1);
  }
  const content = skillLib.getFramework(framework.id);
  if (!content) {
    console.error(`❌ Error: Could not read definition file for "${framework.id}"`);
    process.exit(1);
  }
  console.log(content);
}

function generateFrameworkTemplate(input, framework, version) {
  const lines = [
    `# ${framework.full_name} (${framework.name}) Template`,
    '',
    `> Category: ${framework.category} | Elements: ${framework.element_count}`,
    ''
  ];

  framework.elements.forEach((element, i) => {
    lines.push(`## ${i + 1}. ${element}`);
    lines.push(`[Fill in ${element} for: ${input}]`);
    if (version !== 'basic') {
      lines.push(`_Guidance: describe the "${element}" aspect of the task in 1-3 sentences._`);
    }
    lines.push('');
  });

  if (version === 'expert') {
    lines.push('## Validation Checklist');
    (framework.use_cases || []).slice(0, 3).forEach((useCase) => {
      lines.push(`- [ ] Relevant to use case: ${useCase}`);
    });
    lines.push('- [ ] Every element above is filled with task-specific (not generic) content');
    lines.push('');
  }

  lines.push('## Meta');
  lines.push(`- Framework: ${framework.name} (${framework.category})`);
  lines.push(`- Domains: ${framework.domains.join(', ')}`);

  return lines.join('\n');
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
This template applies a structured prompt engineering framework for high-quality generation

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
- Optimization framework: CLARITY-based prompt engineering
- Quality grade: Expert
- Use case: Important projects, client deliverables, public releases
`;
}

function listFrameworks({ json = false, filterDomain = null, filterCategory = null } = {}) {
  const index = skillLib.loadFrameworkIndex();

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
      if (!acc[fw.category]) acc[fw.category] = [];
      acc[fw.category].push(fw);
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
        const files = readdirSync(path.join(frameworksDir, dir)).filter(f => f.endsWith('.md'));
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
  console.log('  1. View framework details: npx prompt-optimizer-skill frameworks <id>');
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
    const content = readFileSync(testFile, 'utf-8');

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

  // Standalone flags that should not fall through to optimizePrompt
  if (command === '--version' || command === '-v') {
    showVersion();
    return;
  }
  if (command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  let version = 'enhanced';
  let frameworkId = null;
  let inputParts = [];
  let frameworksOpts = { json: false, filterDomain: null, filterCategory: null };

  // Flags are recognized regardless of position; everything else is collected,
  // in order, as free-text input. This keeps `template "text" --basic` and
  // `template --basic "text"` equivalent.
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
      case '--filter': {
        const next = options[++i];
        if (next !== undefined && !next.startsWith('-')) {
          frameworksOpts.filterDomain = next;
        } else {
          i--; // put back — no valid value
        }
        break;
      }
      case '--category': {
        const next = options[++i];
        if (next !== undefined && !next.startsWith('-')) {
          frameworksOpts.filterCategory = next;
        } else {
          i--; // put back — no valid value
        }
        break;
      }
      case '--framework': {
        const next = options[++i];
        if (next !== undefined && !next.startsWith('-')) {
          frameworkId = next;
        } else {
          i--; // put back — no valid value
        }
        break;
      }
      default:
        inputParts.push(opt);
    }
  }

  switch (command) {
    case 'template':
    case 'optimize':
    case 'o':
      optimizePrompt(inputParts.join(' '), version, frameworkId);
      break;
    case 'frameworks':
    case 'f':
      if (inputParts.length > 0) {
        showFrameworkDetail(inputParts.join(' '));
      } else {
        listFrameworks(frameworksOpts);
      }
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
        optimizePrompt([command, ...inputParts].join(' '), version, frameworkId);
      } else {
        console.error(`❌ Unknown command: ${command}`);
        console.log('Use "npx prompt-optimizer-skill help" to see available commands');
        process.exit(1);
      }
  }
}

main();
