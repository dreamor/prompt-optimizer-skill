# Prompt Optimizer v2.0

> A professional Claude Code Skill that transforms simple instructions into production-ready prompts

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🎯 Core Capabilities

- **CLARITY Framework**: Systematic prompt optimization method covering 7 key elements
- **61 Prompt Frameworks**: Categorized by complexity and domain with detailed definitions and examples
- **Quality Validation**: Automatic validation using 7-point checklist after generation
- **Multi-Version Output**: Basic/Enhanced/Expert versions for different scenarios
- **Boundary Handling**: Intelligent handling of vague inputs and user refusal to clarify
- **Multiple Installation Methods**: Supports Claude Marketplace, npx, and local installation

### 🆕 v2.0 New Features

| Feature | Description |
|---------|-------------|
| **Framework Library** | 61 detailed framework definitions with structure, examples, and best practices |
| **Quality Validation** | CLARITY 7-point checklist to ensure output quality |
| **Multi-Version** | Different optimization levels based on user needs |
| **Boundary Handling** | Graceful handling of vague inputs and refusal to clarify |
| **Test Suite** | 34 test cases covering various usage scenarios |
| **Claude Plugin** | Support for installation via Claude Code Marketplace |
| **npx Support** | Use directly via npx without installation |

---

## 📦 Installation

### Method 1: Claude Code Marketplace (Recommended)

Install directly from GitHub using the marketplace command:

```bash
/plugin marketplace add dreamor/prompt-optimizer-skill
```

---

### Method 2: npx Usage (No Installation Required)

Use directly via npx without local installation:

```bash
# Optimize a prompt
npx prompt-optimizer-skill optimize "Write an email to a customer"

# List all frameworks
npx prompt-optimizer-skill frameworks

# Run tests
npx prompt-optimizer-skill test

# View help
npx prompt-optimizer-skill help
```

**Quick Commands**:
```bash
# Use short alias
npx pos "Write an email to a customer"

# Specify output version
npx prompt-optimizer-skill optimize "Write code" --basic      # Basic version
npx prompt-optimizer-skill optimize "Write code" --enhanced   # Enhanced version (default)
npx prompt-optimizer-skill optimize "Write code" --expert     # Expert version
```

---

### Method 4: Symbolic Link (Development/Customization)

Suitable for users who need to modify or customize:

```bash
# Clone the repository
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# Create symbolic link
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-optimizer
```

### Method 5: Direct Copy

```bash
# Clone the repository
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# Copy to skills directory
cp -r prompt-optimizer-skill ~/.claude/skills/prompt-optimizer
```

### Verify Installation

```bash
# Claude Plugin method
claude plugin list | grep prompt-optimizer

# npx method
npx prompt-optimizer-skill version

# Local installation method
ls -la ~/.claude/skills/prompt-optimizer/
# Should see: SKILL.md, frameworks/, tests/, CHANGELOG.md, etc.
```

---

## 🚀 Usage

### Method A: Use in Claude Code (After Marketplace Installation)

In Claude Code conversation:

```
optimize this prompt: Write an email to a customer
```

Or

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
|---------|----------|-----------------|
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
|-----------|-----------|----------|
| APE | Action-Purpose-Expectation | Quick prompt building |
| ERA | Expectation-Role-Action | Simple task instructions |
| TAG | Task-Action-Goal | Quick task definition |
| RTF | Role-Task-Format | Specific format output required |
| BAB | Before-After-Bridge | Marketing promotion |
| PEE | Point-Evidence-Explanation | Academic writing |
| ELI5 | Explain Like I'm 5 | Complex concept explanation |

### Medium Frameworks (4-5 Elements)

| Framework | Full Name | Use Case |
|-----------|-----------|----------|
| RACE | Role-Action-Context-Expectation | Role-playing dialogue |
| COAST | Context-Objective-Actions-Scenario-Task | AI dialogue system design |
| ROSES | Role-Objective-Scenario-Expected Solution-Steps | Role-playing scenarios |
| SMART | Specific-Measurable-Achievable-Relevant-Time-bound | Goal setting |
| FOCUS | Features-Objective-Constraints-User-Setup | Product analysis and evaluation |

### Complex Frameworks (6+ Elements)

| Framework | Full Name | Use Case |
|-----------|-----------|----------|
| CRISPE | Capacity-Role-Insight-Statement-Personality-Experiment | Marketing campaign planning |
| RACEF | Role-Action-Context-Expectation-Format | Complex analysis tasks |
| RISEN | Role-Input-Steps-Expectation-Narrowing | Detailed plan formulation |

Detailed definitions can be found in the `frameworks/` directory.

---

## 🧪 Testing

### Run Tests

```bash
# Check framework file integrity
bash tests/test-cases.md

# Or manually check
ls frameworks/simple/   # Should see 16 frameworks
ls frameworks/medium/   # Should see 33 frameworks
ls frameworks/complex/  # Should see 9 frameworks
```

### Test Cases

View `tests/test-cases.md` for complete test coverage:
- Boundary condition tests (completely vague, ultra-short, meaningless inputs)
- Framework selection tests
- Clarification handling tests
- Quality validation tests
- Multi-version output tests
- Iterative optimization tests

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [SKILL.md](SKILL.md) | Main skill file with complete workflow |
| [CHANGELOG.md](CHANGELOG.md) | Version update history |
| [frameworks/](frameworks/) | 61 detailed framework definitions |
| [tests/test-cases.md](tests/test-cases.md) | Test cases |

---

## 🏗️ Project Structure

```
prompt-optimizer-skill/
├── SKILL.md                 # Main skill file
├── README.md               # This file
├── CHANGELOG.md            # Changelog
├── VERSION                 # Current version
├── claude.json             # Claude Plugin configuration
├── bin/                    # CLI tools
│   └── prompt-optimizer.js # npx command line tool
├── frameworks/             # Framework library
│   ├── simple/            # Simple frameworks (16)
│   ├── medium/            # Medium frameworks (33)
│   ├── complex/           # Complex frameworks (9)
│   └── patterns/          # Reusable patterns (3)
├── tests/                 # Test cases
│   └── test-cases.md
└── references/            # Reference materials
    └── Frameworks_Summary.md
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

MIT License - See [LICENSE](LICENSE) file for details

---
