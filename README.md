English | [简体中文](./README_zh.md)

# Prompt Optimizer

> A professional agent skill that transforms simple instructions into production-ready prompts. Works with any AI agent that supports the `SKILL.md` skill format (Claude Code and others).

[![Version](https://img.shields.io/badge/version-2.4.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🎯 Core Capabilities

- **CLARITY Framework**: A systematic prompt optimization method covering 7 key elements (Context, Logic, Action, Role, Input/Output, Tone, Yardstick).
- **61 Prompt Frameworks**: Categorized by complexity and domain, with detailed definitions and examples.
- **Quality Validation**: Automatic validation using a 7-point checklist after generation to ensure high-quality output.
- **Multi-Version Output**: Provides Basic, Enhanced, and Expert versions for different scenarios.
- **Boundary Handling**: Intelligently handles vague inputs and situations where users refuse to clarify.
- **Multiple Installation Methods**: Supports npm, npx, and manual/local installation.

### 🆕 What's New in v2.4

| Feature | Description |
| :--- | :--- |
| **Framework-specific scaffolding** | `template "<text>" --framework <id>` prints a scaffold structured around that framework's own `elements` (from `frameworks/index.json`) instead of the generic Basic/Enhanced/Expert template. |
| **Inspect a framework from the CLI** | `frameworks <id>` prints a single framework's full Markdown definition, e.g. `frameworks race`. |
| **Position-independent CLI flags** | `--basic` / `--enhanced` / `--expert` / `--framework` are applied wherever they appear, so `template "write an email" --basic` behaves as documented. |
| **Shared, hardened lookups** | The CLI reuses `index.js`'s `loadFrameworkIndex()` / `getFramework()` (path-traversal guarded) instead of re-reading `index.json` itself. |

### 📜 Release History

| Version | Highlights |
| :--- | :--- |
| **v2.3** | Agent-agnostic packaging — dropped Claude Code plugin infrastructure; works with any `SKILL.md`-compatible agent. |
| **v2.2** | Security hardening (`index.js` path-traversal guard, `execFileSync` in the release script) and a progressive-disclosure refactor of `SKILL.md` (CLARITY rubric, boundary & refusal tables moved into `references/Decision_Tables.md`). |
| **v2.1** | Structured `frameworks/index.json`; CLI `template` command (renamed from `optimize`); `frameworks --json/--filter/--category`; 29 deduplicated test cases; agent-agnostic workflow tracking (uses your agent's task tool instead of a hard-coded one). |
| **v2.0** | 61-framework library with CLARITY validation, multi-version output, boundary handling, and npx support. |

---

## 📦 Installation

### Method 1: npm Install (Recommended)

Install globally or locally via npm:

```bash
# Install globally
npm install -g prompt-optimizer-skill

# Or install as a project dependency
npm install prompt-optimizer-skill
```

After global installation, use the CLI directly:

```bash
prompt-optimizer-skill template "Write an email to a customer"
prompt-optimizer-skill frameworks
prompt-optimizer-skill version
```

### Method 2: npx Usage (No Installation Required)

Use directly via npx without local installation:

```bash
# Generate a prompt template (static scaffold)
npx prompt-optimizer-skill template "Write an email to a customer"

# List all frameworks
npx prompt-optimizer-skill frameworks

# Print one framework's full definition
npx prompt-optimizer-skill frameworks race

# Query frameworks by domain or category
npx prompt-optimizer-skill frameworks --filter marketing
npx prompt-optimizer-skill frameworks --category medium

# Output frameworks as JSON
npx prompt-optimizer-skill frameworks --json

# Run tests
npx prompt-optimizer-skill test

# View help
npx prompt-optimizer-skill help
```

**Quick Commands**:
```bash
# Use short aliases
npx pos "Write an email to a customer"
npx prompt-optimizer-skill optimize "Write code"   # alias for template

# Specify output version
npx prompt-optimizer-skill template "Write code" --basic      # Basic version
npx prompt-optimizer-skill template "Write code" --enhanced   # Enhanced version (default)
npx prompt-optimizer-skill template "Write code" --expert     # Expert version

# Scaffold using a specific framework's own elements (see `frameworks --json` for ids)
npx prompt-optimizer-skill template "Write code" --framework race
```

### Method 3: Manual Install / Symbolic Link (Development/Customization)

If your agent supports the `SKILL.md` skill format, it will look for skills in its own skills directory. Copy or symlink this repo into that directory (check your agent's docs for the exact path):

```bash
# Clone the repository
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# Copy or symlink into your agent's skills directory
ln -s /path/to/prompt-optimizer-skill /path/to/your-agent/skills/prompt-optimizer
```

### Verify Installation

```bash
# npm global install method
prompt-optimizer-skill version

# npx method
npx prompt-optimizer-skill version

# Manual / symbolic link method
ls -la /path/to/your-agent/skills/prompt-optimizer/
# Should see: SKILL.md, frameworks/, tests/, CHANGELOG.md, etc.
```

---

## 🚀 Usage

### Method A: Use within your AI agent

If your agent supports the `SKILL.md` skill format, just describe what you want in conversation:

```
optimize this prompt: Write an email to a customer
```

Or, if your agent supports slash-style skill invocation:

```
/prompt-optimizer help me optimize this prompt
```

### Method B: Use via npx Command Line

No installation needed, use directly:

```bash
# Basic usage
npx prompt-optimizer-skill "Write an email to a customer"

# Specify output version
npx prompt-optimizer-skill "Write code" -b    # Basic version
npx prompt-optimizer-skill "Write code" -e    # Enhanced version (default)
npx prompt-optimizer-skill "Write code" -x    # Expert version

# List all frameworks
npx prompt-optimizer-skill frameworks

# View help
npx prompt-optimizer-skill help
```

### Workflow

```
User Input → Analysis → Framework Selection → Clarification → Optimization → Quality Validation → Output
```

### Multi-Version Output

Based on your needs, you can get optimization results with different levels of detail:

| Version | Use Case | Characteristics |
| :--- | :--- | :--- |
| **Basic** | Quick use, simple tasks | Core elements, concise and clear |
| **Enhanced** | Regular work, team collaboration | Complete structure with examples |
| **Expert** | Complex projects, high-quality requirements | Full elements + constraints + validation criteria |

### Examples

#### Example 1: Code Generation

**Before:**
```
write a function to sort a list
```

**After (Expert Version):**
```markdown
# Role
You are a senior Python developer specializing in algorithms and data structures.

# Task
Implement a robust sorting function with comprehensive error handling.

# Instructions
1. Implement the function with type hints following Python 3.10+ standards
2. Include detailed docstrings with examples in Google style
3. Handle edge cases: empty list, None values, mixed types
4. Provide both ascending and descending sort options
5. Include time and space complexity analysis

# Constraints
- Use only Python standard library
- Follow PEP 8 style guidelines
- Include at least 5 test cases covering edge cases
- Keep function under 50 lines (excluding tests and docs)

# Output Format
1. Function implementation with type hints
2. Comprehensive docstring with examples
3. Complexity analysis table
4. Test suite with pytest-style assertions
5. Usage examples

# Quality Criteria
- Function passes all test cases
- Code is idiomatic Python
- Documentation is clear and complete
```

#### Example 2: Content Writing

**Before:**
```
write a blog post about AI
```

**After (Enhanced Version):**
```markdown
# Role
You are a technology journalist and AI researcher with 10+ years of experience.

# Context
The blog targets software developers and tech professionals.

# Task
Write an informative blog post about practical AI tools for developers.

# Instructions
1. Start with a compelling hook about AI's impact
2. Cover 3-5 specific AI tools developers can use today
3. Include real-world examples and code snippets
4. Address common concerns and misconceptions
5. End with actionable next steps

# Constraints
- Target audience: intermediate to senior developers
- Tone: informative, practical, conversational
- Length: 1,500-2,000 words
- Avoid overly technical jargon

# Output Format
1. Catchy headline (under 60 characters)
2. Introduction with hook and thesis
3. Body sections with clear subheadings
4. Conclusion with call-to-action
5. Author bio (2-3 sentences)
```

---

## 📚 Framework Library

### Simple Frameworks (≤3 Elements)

| Framework | Full Name | Use Case |
| :--- | :--- | :--- |
| APE | Action-Purpose-Expectation | Quick prompt building |
| ERA | Expectation-Role-Action | Simple task instructions |
| TAG | Task-Action-Goal | Quick task definition |
| RTF | Role-Task-Format | Specific format output required |
| BAB | Before-After-Bridge | Marketing promotion |
| PEE | Point-Evidence-Explanation | Academic writing |
| ELI5 | Explain Like I'm 5 | Complex concept explanation |

### Medium Frameworks (4-5 Elements)

| Framework | Full Name | Use Case |
| :--- | :--- | :--- |
| RACE | Role-Action-Context-Expectation | Role-playing dialogue |
| COAST | Context-Objective-Actions-Scenario-Task | AI dialogue system design |
| ROSES | Role-Objective-Scenario-Expected Solution-Steps | Role-playing scenarios |
| SMART | Specific-Measurable-Achievable-Relevant-Time-bound | Goal setting |
| FOCUS | Features-Objective-Constraints-User-Setup | Product analysis and evaluation |

### Complex Frameworks (6+ Elements)

| Framework | Full Name | Use Case |
| :--- | :--- | :--- |
| CRISPE | Capacity-Role-Insight-Statement-Personality-Experiment | Marketing campaign planning |
| RACEF | Role-Action-Context-Expectation-Format | Complex analysis tasks |
| RISEN | Role-Input-Steps-Expectation-Narrowing | Detailed plan formulation |

Detailed definitions can be found in the `frameworks/` directory.

---

## 🧪 Testing

### Run Tests

```bash
# Full suite: framework integrity + CLI smoke + JSON validation
npm test

# Individual suites
npm run test:frameworks   # framework definitions & index integrity
npm run test:cli          # CLI smoke tests
npm run test:json         # JSON schema validation
npm run test:integrity    # standalone integrity module

# Or run the runner directly
node tests/run-tests.js

# Quick manual sanity check
ls frameworks/simple/   # Should see 16 frameworks
ls frameworks/medium/   # Should see 33 frameworks
ls frameworks/complex/  # Should see 9 frameworks
```

The same suites run in CI (`.github/workflows/test.yml`) against Node.js 16, 18, 20, 22, and 24.

### Test Cases

View `tests/test-cases.md` for complete test coverage:
- Boundary condition tests (completely vague, ultra-short, meaningless inputs)
- Framework selection tests
- Clarification handling tests
- Quality validation tests
- Multi-version output tests
- Iterative optimization tests

---

## 🏗️ Project Structure

```
prompt-optimizer-skill/
├── SKILL.md                     # Main skill definition (agent workflow)
├── README.md                    # This file (English)
├── README_zh.md                 # Chinese README
├── CHANGELOG.md                 # Release history
├── CONTRIBUTING.md              # Contribution guide
├── CODE_OF_CONDUCT.md           # Community guidelines
├── SECURITY.md                  # Security policy
├── LICENSE                      # MIT License
├── VERSION                      # Current version (2.4.0)
├── index.js                     # Library entry point (framework index + lookup)
├── package.json                 # npm package manifest
├── bin/
│   └── prompt-optimizer.js      # CLI (template scaffolds + framework lookup)
├── frameworks/                  # Framework library (61 total)
│   ├── index.json               # Structured metadata (id, category, elements, domains, use_cases)
│   ├── simple/                  # Simple frameworks (16, ≤3 elements)
│   ├── medium/                  # Medium frameworks (33, 4-5 elements)
│   ├── complex/                 # Complex frameworks (9, 6+ elements)
│   └── patterns/                # Reusable patterns (3)
├── references/                  # Reference materials
│   ├── Frameworks_Summary.md
│   ├── Quick_Reference.md
│   └── Decision_Tables.md       # Domain map, CLARITY rubric, boundary & refusal tables
├── scripts/                     # Build & release scripts
│   ├── postversion.js           # Sync version across metadata files
│   └── extract-changelog.js     # Extract a release's CHANGELOG entry for GitHub Releases
├── tests/
│   ├── test-cases.md            # 29 documented test cases
│   ├── run-tests.js             # Test runner (framework / CLI / JSON modes)
│   └── framework-integrity.test.js
└── .github/
    └── workflows/
        ├── test.yml             # CI: test matrix (Node 16-24) + lint
        └── release.yml          # CD: on `v*` tag → test, publish to npm (OIDC), GitHub Release
```

---

## 🤝 Contributing

Contributions are welcome! Please check [CHANGELOG.md](CHANGELOG.md) to understand the project's development direction.

### Ways to Contribute

1. **Add New Frameworks**: Add new framework definitions under `frameworks/`
2. **Improve Documentation**: Enhance examples and descriptions for existing frameworks
3. **Add Tests**: Supplement with more test cases
4. **Report Issues**: Submit issues describing problems encountered

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.
