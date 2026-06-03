# Contributing to Prompt Optimizer

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Getting Started

### Prerequisites

- Node.js >= 14.0.0
- Git

### Setup

```bash
git clone https://github.com/dreamor/prompt-optimizer-skill.git
cd prompt-optimizer-skill
npm install --ignore-scripts
```

### Running Locally

```bash
# CLI usage
node bin/prompt-optimizer.js template "your prompt"

# List frameworks
node bin/prompt-optimizer.js frameworks

# Run tests
npm test
```

## How to Contribute

### Adding a New Framework

1. **Create the framework file**: `frameworks/<category>/<FRAMEWORK-NAME>.md`
   - Category: `simple` (≤3 elements), `medium` (4-5), `complex` (6+), or `patterns`
   - Required sections: `# Framework Name`, `## Structure`, `## Use Cases`

2. **Add entry to `frameworks/index.json`**:
   ```json
   {
     "id": "framework-name",
     "name": "FRAMEWORK",
     "full_name": "Full Name of Framework",
     "category": "simple|medium|complex|patterns",
     "file": "frameworks/<category>/<FRAMEWORK-NAME>.md",
     "element_count": 3,
     "elements": ["Element1", "Element2", "Element3"],
     "domains": ["general", "writing_creation"],
     "use_cases": ["Use case 1", "Use case 2"]
   }
   ```

3. **Validate**: `npm run test:frameworks`

4. **Update documentation**:
   - Add framework to `references/Frameworks_Summary.md`
   - Update total count in `README.md` framework tables

### Reporting Bugs

Use the [Bug Report](https://github.com/dreamor/prompt-optimizer-skill/issues/new?template=bug_report.yml) template. Include:

- CLI version (`npx prompt-optimizer-skill version`)
- Node.js version (`node --version`)
- OS
- Command that failed
- Expected vs actual behavior

### Suggesting Features

Use the [Feature Request](https://github.com/dreamor/prompt-optimizer-skill/issues/new?template=feature_request.yml) template. Describe the use case, not just the solution.

### Suggesting a Framework

Use the [Framework Suggestion](https://github.com/dreamor/prompt-optimizer-skill/issues/new?template=framework_suggestion.yml) template. Include the framework name, elements, domains, and example usage.

### Improving Documentation

- Keep the bilingual (English + Chinese) format consistent with `README.md`
- Test all CLI examples before submitting
- Use clear, concise language

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Ensure all tests pass: `npm test`
5. Update `CHANGELOG.md` under `[Unreleased]`
6. Follow conventional commit format
7. Submit a PR using the [PR template](.github/PULL_REQUEST_TEMPLATE.md)

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature (framework, CLI command, etc.)
- `fix:` — Bug fix
- `docs:` — Documentation only
- `refactor:` — Code restructuring without behavior change
- `test:` — Adding or updating tests
- `chore:` — Maintenance (CI, dependencies, etc.)

## Versioning

We follow [SemVer](https://semver.org/). Use the release scripts:

```bash
npm run release          # Patch: 2.1.0 → 2.1.1
npm run release:minor    # Minor: 2.1.0 → 2.2.0
npm run release:major    # Major: 2.1.0 → 3.0.0
```

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).