# Changelog

All notable changes to this project will be documented in this file.

## [2.1.13] - 2026-06-24

### Changed

- **SKILL.md**: Progressive disclosure refactor — moved CLARITY scoring rubric (9-row pass-criterion table) and refusal-handling table from inline to `references/Decision_Tables.md`; replaced inline rubric with compact 7-row one-line trigger table + reference links. Reduced inline table rows from 42 to 37.
- **SKILL.md**: Added filled example to Step 7 Presentation Template (APE framework, Simple task, Basic version) — `{framework}`, `{reasoning}`, `{score}`, `{X}`, `{optimized_prompt}` placeholders now have a concrete end-to-end demonstration.
- **SKILL.md**: Cleaned 4 trailing `|` characters left from earlier table extractions.
- **references/Decision_Tables.md**: Added `## Refusal Handling` section (smart defaults + user-response matrix) and `## CLARITY Scoring Rubric` section (full pass criteria + validation thresholds + fail-patch procedure) migrated from SKILL.md.

## [2.1.12] - 2026-06-18

### Fixed

- **README.md & README_zh.md**: Updated version badge from 2.1.6 to 2.1.11 (was stale since v2.1.7).
- **README.md & README_zh.md**: Updated project structure tree to match current repo — added `index.js`, `references/Quick_Reference.md`, `references/Decision_Tables.md`, `scripts/`, `.claude-plugin/`.

## [2.1.11] - 2026-06-18

### Fixed

- **SKILL.md frontmatter**: Replaced remaining Chinese trigger description ("当用户输入模糊的指令、需要优化提示词、或对 AI 输出质量不满意时，务必使用本技能") with English ("Always use this skill when the user inputs vague instructions, needs prompt optimization, or is dissatisfied with AI output quality") for consistency.

## [2.1.10] - 2026-06-17

### Fixed

- **CI**: v2.1.9 was already published to npm despite CI job failure (GitHub Release step errored on "Provenance" auth but npm publish succeeded). Bumped to v2.1.10 to enable publishing.

## [2.1.9] - 2026-06-17

### Refactor

- **SKILL.md**: Migrated 7 reference tables (Elements, Framework by Domain, Advanced Techniques, CLARITY, Version, Anti-patterns, Quality checks) to `references/Decision_Tables.md` — reduced inline table rows from ~58 to 45
- **claude.json & SKILL.md frontmatter**: Added `allowed-tools: "Read TodoWrite"` field
- **frameworks/index.json**: Added `_intro` and `_schema` documentation fields for maintainability

## [2.1.8] - 2026-06-17

### Fixed

- **CI**: Added `package.json` and `package-lock.json` to `postversion.js` git stage list to prevent VERSION consistency check failures during lint

### Changed

- **SKILL.md**: Enhanced description with even-if/whenever trigger language, Chinese keywords, and compatibility field

## [2.1.7] - 2026-06-17

### Changed

- **postversion.js**: Invalidated — published to npm but CI lint failed due to missing package.json in stage list. Fixed in v2.1.8.

## [2.1.6] - 2026-06-17

### Fixed

- **CI: restore OIDC Trusted Publisher** — `NODE_AUTH_TOKEN` was accidentally reverted to `${{ secrets.NPM_TOKEN }}` during a patch, breaking the npm OIDC flow. Restored to empty string to let OIDC credentials pass through unchallenged.
- **Release compare URL** — Fixed `sed`-based changelog extraction (incompatible across macOS/Linux), replaced with Node script. Compare URL now correctly links `vPREV...vCURRENT` instead of `vCURRENT...HEAD`.
- **CI test matrix** — Added Node 24 to test matrix to match the Node version used in the publish job.
- **YAML parsing conflict** — Moved inline Node changelog extraction to separate `scripts/extract-changelog.js` to avoid quote escaping conflicts.

### Changed

- **index.js API** — `loadFrameworkIndex()` and `getFramework()` now have try/catch protection against corrupted or missing index.json. Added async API variants (`loadFrameworkIndexAsync`, `getFrameworkAsync`).
- **CLI argument parsing** — `--filter` and `--category` no longer consume subsequent flags as their value. Standalone `--version`/`--help` now work correctly without degenerating into `optimizePrompt`.
- **`optimizePrompt` input validation** — Added `typeof input !== 'string'` guard.
- **Expert template** — Removed hardcoded "RACEF/CRISPE" and "CLARITY + RACEF" references in static template; replaced with generic framework descriptions.
- **`postversion` script** — Replaced unmaintainable minified inline Node script with a readable, documented `scripts/postversion.js` file.
- **`claude.json`** — `test` command description now accurately describes the test suite. Removed unused `language` and `validation` config fields.
- **Updated version references** — Synced all metadata files to 2.1.5.

### Documentation

- **README** — Updated version badge to 2.1.5. Fixed broken `bash tests/test-cases.md` command to `node tests/run-tests.js` in both English and Chinese docs.
- **WELCOME.md** — Updated hardcoded version to 2.1.5.
- **SECURITY.md** — Corrected "makes no network requests" claim to accurately describe the project's network activity scope.
- **CHANGELOG** — Added 2.1.5 entry to version history table.

## [2.1.4] - 2026-06-17

### Fixed

- **CI: restore OIDC Trusted Publisher** — `NODE_AUTH_TOKEN` was accidentally reverted to `${{ secrets.NPM_TOKEN }}` during a patch, breaking the npm OIDC flow. Restored to empty string to let OIDC credentials pass through unchallenged.
- **Release compare URL** — Fixed `sed`-based changelog extraction (incompatible across macOS/Linux), replaced with Node script. Compare URL now correctly links `vPREV...vCURRENT` instead of `vCURRENT...HEAD`.
- **CI test matrix** — Added Node 24 to test matrix to match the Node version used in the publish job.

### Changed

- **index.js API** — `loadFrameworkIndex()` and `getFramework()` now have try/catch protection against corrupted or missing index.json. Added async API variants (`loadFrameworkIndexAsync`, `getFrameworkAsync`).
- **CLI argument parsing** — `--filter` and `--category` no longer consume subsequent flags as their value. Standalone `--version`/`--help` now work correctly without degenerating into `optimizePrompt`.
- **`optimizePrompt` input validation** — Added `typeof input !== 'string'` guard.
- **Expert template** — Removed hardcoded "RACEF/CRISPE" and "CLARITY + RACEF" references in static template; replaced with generic framework descriptions.
- **`postversion` script** — Replaced unmaintainable minified inline Node script with a readable, documented `scripts/postversion.js` file.
- **`claude.json`** — `test` command description now accurately describes the test suite. Removed unused `language` and `validation` config fields.
- **Updated version references** — Synced VERSION, package.json, claude.json, SKILL.md, marketplace.json, and frameworks/index.json to 2.1.4.

### Documentation

- **README** — Updated version badge to 2.1.4. Fixed broken `bash tests/test-cases.md` command to `node tests/run-tests.js` in both English and Chinese docs.
- **WELCOME.md** — Updated hardcoded v2.1.0 to v2.1.4.
- **SECURITY.md** — Corrected "makes no network requests" claim to accurately describe the project's network activity scope.
- **CHANGELOG** — Added 2.1.4 entry to version history table.

## [2.1.2] - 2026-06-05

### Changed

- **CI: stable OIDC publishing** — Switched publish job to Node 24 (npm 11.x) and cleared `NODE_AUTH_TOKEN` to prevent `setup-node` from injecting `GITHUB_TOKEN` and blocking the npm OIDC Trusted Publisher flow.

## [2.1.1] - 2026-06-04

### Added

- **Automated CI/CD** — GitHub Actions workflows for testing (Node 16–22 matrix) and automated npm publishing via OIDC Trusted Publisher (no long-lived tokens).
- **`index.js` entry point** — Added missing module entry so the package works correctly when required as a library.

### Fixed

- **Compatibility** — Replaced `||=` logical assignment with equivalent compatible syntax; dropped Node 14 from the test matrix (EOL).

### Documentation

- Split README into separate English (`README.md`) and Chinese (`README_zh.md`) versions.
- Added `npm install -g` as an explicit installation method.

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
| 2.1.10 | 2026-06-17 | Bump to unpublishable 2.1.9 (already on npm despite CI failure) |
| 2.1.9 | 2026-06-17 | Migrated 7 reference tables to Decision_Tables.md, added allowed-tools, documented index.json schema |
| 2.1.8 | 2026-06-17 | CI fix (postversion git stage), SKILL.md description/tone/why improvements |
| 2.1.7 | 2026-06-17 | Attempted publish — invalidated, fixed in v2.1.8 |
| 2.1.6 | 2026-06-17 | Code quality fixes, CLI bugfixes, CI hardening, docs fixes |
| 2.1.5 | 2026-06-17 | Changelog reorganization (unpublished) |
| 2.1.4 | 2026-06-17 | OIDC fix, index.js API repair, test hardening (unpublished) |
| 2.1.2 | 2026-06-05 | Stable OIDC CI publishing |
| 2.1.1 | 2026-06-04 | Automated CI/CD, npm publishing, compatibility fixes |
| 2.1.0 | 2026-06-01 | Structured framework index, CLARITY rubric, CLI relabel |
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
