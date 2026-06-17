# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 2.1.x   | ✅ Yes    |
| 2.0.x   | ✅ Yes    |
| < 2.0   | ❌ No     |

## Reporting a Vulnerability

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please report security issues by:

1. **GitHub Private Vulnerability Reporting** (preferred): Go to [Security Advisories](https://github.com/dreamor/prompt-optimizer-skill/security/advisories/new) and submit a private report.

2. **GitHub Issues with `[security]` label**: If private reporting is unavailable, create an issue with the title prefixed by `[security]` and avoid including exploit details in the public issue.

### What to Include

- Description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Suggested fix (if you have one)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Fix and disclosure**: We follow coordinated disclosure — fixes are released before public disclosure

### Scope

This project is a CLI tool and Claude Code Skill that runs locally. It does not:

- The skill code (SKILL.md) does not make network requests
- The CLI tool does not collect or transmit user data
- The `npm publish` workflow and `npx` installation make network requests to npmjs.org as expected for package distribution
- It does not execute arbitrary code beyond the CLI commands documented in the README

Vulnerabilities in dependencies should be reported the same way and will be addressed promptly.