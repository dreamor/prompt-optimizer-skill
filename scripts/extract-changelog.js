#!/usr/bin/env node

/**
 * Extract changelog entry for a given version.
 *
 * Usage: node scripts/extract-changelog.js <version>
 *
 * Reads CHANGELOG.md from the repo root, finds the entry matching
 * `## [<version>]`, and prints the body. Exits with code 1 if not found.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function main() {
  const version = process.argv[2];
  if (!version) {
    console.error('Usage: node scripts/extract-changelog.js <version>');
    process.exit(1);
  }

  const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf-8');
  const pattern = new RegExp(`## \\[${escapeRegex(version)}\\][^#]+`);
  const match = changelog.match(pattern);

  if (!match) {
    console.error(`❌ Changelog entry not found for version ${version}`);
    process.exit(1);
  }

  const body = match[0].replace(/^##[^\n]*\n*/, '').trim();
  console.log(body);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main();