# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-04-20

### ✨ Added

- **Framework Library**: Added detailed framework definitions for 61 prompt engineering frameworks
  - 16 simple frameworks (APE, ERA, TAG, RTF, BAB, PEE, ELI5, Zero-shot, 4S-Method, Challenge-Solution-Benefit, CAR-PAR-STAR, Five-Ws-and-One-H, Imagine, Hamburger-Model, Elicitation, Help-Me-Understand)
  - 33 medium frameworks (RACE, COAST, ROSES, Chain-of-Thought, SMART, FOCUS, CIDI, SPEAR, ORID, Pros-and-Cons, HMW, Blooms-Taxonomy, PROMPT, RICE, Tree-of-Thought, 3Cs-Model, RISE, SPAR, GRADE, Atomic-Prompting, FOCUS, PAUSE, TRACE, TRACI, What-If, ROSE, SPARK, Socratic-Method, GOPA, BLOG, RHODES, Chain-of-Destiny, TQA)
  - 9 complex frameworks (CRISPE, RACEF, RISEN, SCAMPER, Six-Thinking-Hats, ROSES, RASCEF, RELIC, RODES)
  - 3 reusable patterns (Few-Shot, Critique-Refine, Role-Play)
  - Each framework includes: structure, use cases, examples, and best practices

- **Quality Validation**: Added Step 6 - Quality Validation with CLARITY Checklist
  - 7-point validation checklist (Context, Logic, Action, Role, Input/Output, Tone, Yardstick)
  - Automatic quality grading (Excellent/Good/Needs Improvement)
  - Re-validation loop for failed checks

- **Multi-Version Output**: Support for Basic/Enhanced/Expert versions
  - Basic: Core elements, concise and clear
  - Enhanced: Complete structure with examples
  - Expert: Full elements + constraints + validation criteria

- **Boundary Handling**: Comprehensive edge case handling
  - Completely vague input detection and guidance
  - Partial clarity detection with targeted questions
  - Clear input fast-path processing

- **Refusal Handling**: Graceful handling when users decline clarification
  - Smart defaults for each category
  - Polite continuation without forced questioning
  - Timeout handling for non-responsive users

- **Framework Selection Explanation**: Transparent reasoning for framework choices
  - Why this framework selection
  - Confidence score (1-10)
  - Alternative options when confidence < 7

- **Test Suite**: Comprehensive test cases
  - 34 test cases covering boundary conditions, framework selection, quality validation, multi-version output, iteration, and performance
  - Automated test script for framework file existence
  - Performance benchmarks

- **Documentation**: Enhanced documentation
  - Detailed framework definitions
  - Complete usage examples
  - Best practices guide

### 🔧 Changed

- **Restructured SKILL.md**: Clearer workflow with 7 steps (added validation step)
- **Modular Architecture**: Split monolithic SKILL.md into organized directory structure
- **Enhanced Installation**: Support for Claude Plugin, npx, symlink and copy installation methods

### 📦 Installation Methods

- **Claude Plugin**: `claude plugin install prompt-optimizer`
- **npx**: `npx prompt-optimizer-skill "your prompt"`
- **Symlink**: `ln -s /path/to/skill ~/.claude/skills/prompt-optimizer`
- **Copy**: `cp -r skill ~/.claude/skills/prompt-optimizer`

### 📁 New Structure

```
prompt-optimizer-skill/
├── SKILL.md                 # Main skill file (v2.0.0)
├── CHANGELOG.md            # This file
├── README.md               # Updated documentation
├── frameworks/             # Framework definitions
│   ├── simple/            # 7 simple frameworks
│   ├── medium/            # 6 medium frameworks
│   ├── complex/           # 3 complex frameworks
│   └── patterns/          # 2 reusable patterns
├── tests/                 # Test cases
│   └── test-cases.md
└── references/            # Reference materials
    └── Frameworks_Summary.md
```

## [1.0.0] - 2024-01-15

### 🎉 Initial Release

- Basic CLARITY framework implementation
- 57 framework list with categorization
- 6-step optimization workflow
- 3 complete examples (code, content, data analysis)
- Basic pattern library (Chain-of-Thought, Few-Shot, Critique-Refine)

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 2.0.0 | 2024-04-20 | Major refactor with framework library, validation, multi-version support |
| 1.0.0 | 2024-01-15 | Initial release |

---

## Roadmap

### Planned for v2.1.0
- [ ] Add 10 more framework definitions
- [ ] Interactive web interface for framework selection
- [ ] Prompt version history and comparison
- [ ] Batch optimization for multiple prompts

### Planned for v3.0.0
- [ ] Project context awareness (read project files)
- [ ] Adversarial testing integration
- [ ] Quantitative scoring system (0-100)
- [ ] WebView desktop application

---

## Contributing

When adding changes, please:
1. Add entry under [Unreleased] section
2. Use categories: Added, Changed, Deprecated, Removed, Fixed, Security
3. Reference issue/PR numbers when applicable
4. Keep entries concise but descriptive
