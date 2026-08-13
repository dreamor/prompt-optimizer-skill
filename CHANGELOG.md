# Changelog

All notable changes to this project will be documented in this file.

## [2.4.0] - 2026-08-13

### Added

- **CLI `template --framework <id>`**: Generate a static scaffold structured around a specific framework's own `elements` (from `frameworks/index.json`) instead of always falling back to the generic Basic/Enhanced/Expert templates. Errors out with a helpful message on unknown ids.
- **CLI `frameworks <id>`**: Print a single framework's full markdown definition (e.g. `frameworks race`) instead of requiring `cat frameworks/<category>/<NAME>.md`.

### Refactored

- **bin/prompt-optimizer.js**: Now reuses `index.js`'s `loadFrameworkIndex()` / `getFramework()` (which already have error handling and path-traversal protection) instead of re-implementing its own `index.json` reader. Removed an unused `existsSync` import.

### Fixed

- **bin/prompt-optimizer.js**: Fixed an argument-parsing bug where flags placed *after* the free-text input (e.g. `template "write an email" --basic`, the order shown in every doc example) were silently swallowed into the input string instead of being applied — `--basic`/`--enhanced`/`--expert`/`--framework` now work regardless of position.

### Changed

- **README.md / README_zh.md / SKILL.md**: Dropped hardcoded minor version numbers from H1 titles (e.g. "Prompt Optimizer v2.1") — they went stale every release since only the version badge/frontmatter were kept in sync by `postversion.js`.
- **tests/run-tests.js**: `runFrameworkTests()` now delegates file-system-level checks (category counts, orphan/missing files, duplicate ids/names) to the shared `tests/framework-integrity.test.js` module instead of re-implementing them, removing duplicated validation logic. Also added a check that every framework file has a `Structure` section and mentions its own name — previously only exercised by the unused `test:integrity` script, now run by default `npm test`.
- **CONTRIBUTING.md**: Fixed stale "Node.js >= 14.0.0" prerequisite to match `package.json` engines (`>= 16.0.0`).
- **CHANGELOG.md**: Renamed the stale "Planned for v2.2.0" roadmap heading to "Planned (next minor)" so it doesn't need a version bump every release.

### Removed

- **WELCOME.md**: Deleted — it was only ever displayed via `claude.json`'s `onInstall` hook, which was removed when the project went agent-agnostic. Nothing referenced it anymore.

### Security

- **devDependencies**: Ran `npm audit fix` to resolve a high-severity DoS advisory in the transitive `brace-expansion` dependency (via `standard-version`). Dev-only; not shipped in the published package.

## [2.3.0] - 2026-08-13

### Changed

- **Agent-agnostic skill**: Removed Claude Code plugin-specific infrastructure (`claude.json`, `.claude-plugin/marketplace.json`) and the Claude Marketplace installation method. This is now a plain `SKILL.md` + `frameworks/` skill package intended to work with any agent that supports the `SKILL.md` skill format.
- **SKILL.md**: Removed the Claude-specific `allowed-tools` frontmatter field and the "Claude Code >= 1.0.0" compatibility requirement. Step 1's progress-tracking instruction no longer names `TodoWrite` specifically — it now says to use your agent's task/todo tool if it has one, otherwise a text checklist.
- **README.md / README_zh.md**: Reworded installation and usage sections to be agent-agnostic (generic "your AI agent" / manual skills-directory install instead of Claude Marketplace-only instructions).
- **bin/prompt-optimizer.js, SECURITY.md, WELCOME.md**: Replaced remaining "Claude Code" wording with agent-agnostic phrasing.
- **scripts/postversion.js, tests/run-tests.js, package.json**: Dropped references to the removed `claude.json` / `.claude-plugin/marketplace.json` files.

## [2.2.1] - 2026-08-03

### Security

- **index.js**: Added path traversal protection (`guardPath`/`safeRead`) — all file reads now enforce that resolved paths stay within the skill directory.
- **scripts/postversion.js**: Replaced `execSync` with `execFileSync` to prevent command injection.

### Changed

- **index.js**: `loadFrameworkIndexAsync` is now a true async implementation using `fs.promises.readFile` instead of wrapping the sync version.
- **package.json**: Added `references/` to `files` list — reference docs are now included in the npm package.
- **.claude-plugin/marketplace.json**: Simplified to flat structure with `compatibility` field.
- **bin/prompt-optimizer.js**: Destructured `fs` imports for clarity.

### Fixed

- **references/Quick_Reference.md**: Changed image generation recommendation from Few-Shot to Atomic-Prompting (more appropriate framework).
- **SKILL.md**: Added `license: MIT` to frontmatter.

## [2.2.0] - 2026-06-24

### Changed

- **SKILL.md**: Progressive disclosure refactor — migrated Boundary Handling table + vague-input example, CLARITY scoring rubric, and refusal-handling table to `references/Decision_Tables.md`; replaced with one-line rules + reference links. Reduced inline table rows from 58 to 34.
- **SKILL.md Step 4**: Added *why* rationale for each of the 5 clarifying dimensions (Goal, Audience, Context, Format, Constraints) — explains what breaks when omitted.
- **SKILL.md Step 7**: Added filled presentation example (APE, Simple task, Basic) — placeholders now have a concrete end-to-end demonstration.
- **SKILL.md frontmatter**: Added 5 Chinese trigger keywords (优化提示词, 改写 prompt, 优化指令, 让提示词更好, 帮我把这个写成 prompt) for multilingual coverage.
- **CI (release.yml)**: Added pre-publish `npm view` check and pre-release `gh release view` check — skips publish/release if version already exists, preventing ghost tag failures.
- **references/Decision_Tables.md**: Added Boundary Handling, Refusal Handling, and CLARITY Scoring Rubric sections migrated from SKILL.md.

### Fixed

- Cleaned 4 trailing pipe characters in SKILL.md left from earlier table extractions.

## [2.1.14] - 2026-06-24

### Changed

- **SKILL.md**: Migrated Boundary Handling table and vague-input example (12 lines) to `references/Decision_Tables.md#boundary-handling`; replaced with one-line classification rule + reference link. Reduced main-body line count by ~15.
- **SKILL.md Step 4**: Added *why* explanations for each of the 5 clarifying dimensions (Goal, Audience, Context, Format, Constraints) — each now ends with an italic rationale explaining what breaks if that dimension is missing.
- **SKILL.md frontmatter description**: Added 5 Chinese trigger keywords (优化提示词, 改写 prompt, 优化指令, 让提示词更好, 帮我把这个写成 prompt) for multilingual user coverage.
- **references/Decision_Tables.md**: Added `## Boundary Handling` section (3-row classification table + vague-input example) migrated from SKILL.md.

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
| 2.4.0 | 2026-08-13 | CLI `--framework <id>` scaffold + `frameworks <id>` detail view, arg-parsing order bug fix, doc/test cleanup, npm audit fix |
| 2.3.0 | 2026-08-13 | Agent-agnostic skill — removed Claude Code plugin infra (claude.json, marketplace.json), generalized SKILL.md/README/CLI wording |
| 2.2.0 | 2026-06-24 | Progressive disclosure refactor, Step 4 why rationale, Chinese triggers, CI duplicate-guard |
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

### Planned (next minor)
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
