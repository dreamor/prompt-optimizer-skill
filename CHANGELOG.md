# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.1](https://github.com/dreamor/prompt-optimizer-skill/compare/v2.1.0...v2.1.1) (2026-06-04)


### Features

* add automated testing, CI/CD, npm publishing, and community docs ([c04d8d3](https://github.com/dreamor/prompt-optimizer-skill/commit/c04d8d337e04b8c986580e6ad56cd60d0d235132))
* add missing index.js module entry point for npm publish ([d5e5371](https://github.com/dreamor/prompt-optimizer-skill/commit/d5e5371705e21509992ee25f3da813fcf2f68039))


### Bug Fixes

* replace ||= with compatible syntax, drop Node 14 from CI ([dc56c56](https://github.com/dreamor/prompt-optimizer-skill/commit/dc56c5601da5dd85d04a6b14bb6da246dec0fbdd))


### Documentation

* add npm install method to both README versions ([5c58fe5](https://github.com/dreamor/prompt-optimizer-skill/commit/5c58fe51c2ca14167e5eab028809ce8eca8ffd2c))
* split bilingual README into separate English and Chinese versions ([ff0f926](https://github.com/dreamor/prompt-optimizer-skill/commit/ff0f9269536cef03f438a94655522121eb11504f))

## [2.1.0] - 2026-06-01

### ✨ Added

- **`frameworks/index.json`**: Structured metadata (id, full_name, category, element_count, elements, domains, use_cases) for all 61 frameworks. Step 3 of the SKILL workflow now uses lookup-first instead of guessing file paths.
- **`LICENSE`** (MIT): Added the actual file the README and `package.json` were already referencing.
- **CLI `frameworks --json`**: Print `index.json` directly.
- **CLI `frameworks --filter <domain>`** and **`--category <cat>`**: Query frameworks by inferred domain or by complexity bucket.
- **CLI `template <text>`**: New name for the `optimize` command, makes it explicit that the CLI prints STATIC scaffolds and does not perform real optimization. `optimize` / `o` remain as aliases.
- **CLARITY rubric**: Step 6 of the SKILL is now a binary pass/fail checklist with explicit criteria per letter — scores are reproducible across runs.

### 🔧 Changed

- **`SKILL.md` frontmatter description**: Trimmed and now lists explicit trigger phrases so Claude Code's skill router fires reliably.
- **Workflow tracking**: Step 1 now instructs the agent to use `TaskCreate` for the 7 steps, instead of relying on a plain-text checklist that the harness can't enforce.
- **CLI help / output banners**: Now state explicitly that the CLI ships static templates and that real optimization happens inside Claude Code.

### 🧹 Removed / Fixed

- **`tests/test-cases.md`**: Deduplicated overlapping cases and renumbered. From 34 entries with duplicate Category 6 / TC-011 / TC-013 to 29 unique cases across 8 clean categories. Added a `bash` sanity script that actually checks the framework counts.
- **`references/Frameworks_Summary.md`**: Was listing 57 frameworks; now lists all 61 (added Critique-Refine, Role-Play, complex ROSES, ROSE).

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
│   ├── index.json          # Structured metadata (added in v2.1.0)
│   ├── simple/            # 16 simple frameworks
│   ├── medium/            # 33 medium frameworks
│   ├── complex/           # 9 complex frameworks
│   └── patterns/          # 3 reusable patterns
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

### Planned for v2.2.0
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
