#!/usr/bin/env node

/**
 * Framework Integrity Validation Module
 *
 * Validates the structural integrity of the prompt framework library.
 * Can be imported by run-tests.js or used standalone.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CATEGORIES = ['simple', 'medium', 'complex', 'patterns'];
const EXPECTED_COUNTS = { simple: 16, medium: 33, complex: 9, patterns: 3 };
const REQUIRED_FIELDS = ['id', 'name', 'full_name', 'category', 'file', 'element_count', 'elements', 'domains', 'use_cases'];

function loadIndex() {
  const indexPath = path.join(ROOT, 'frameworks', 'index.json');
  return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
}

function getMdFiles(category) {
  const dir = path.join(ROOT, 'frameworks', category);
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
}

/**
 * Validate all framework .md files have required sections
 */
function validateFrameworkSections() {
  const errors = [];
  const index = loadIndex();

  index.frameworks.forEach((fw) => {
    const filePath = path.join(ROOT, fw.file);
    const content = fs.readFileSync(filePath, 'utf-8');

    if (!/^#\s/.test(content)) {
      errors.push(`Framework "${fw.name}" missing top-level heading`);
    }

    if (!/##?\s*(Structure|结构)/i.test(content)) {
      errors.push(`Framework "${fw.name}" missing "Structure" section`);
    }

    const nameVariant = fw.name.replace(/-/g, ' ');
    const baseAcronym = fw.name.split('-')[0];
    if (!content.includes(fw.name) && !content.includes(fw.full_name) && !content.includes(nameVariant) && !content.includes(baseAcronym)) {
      errors.push(`Framework file ${fw.file} does not mention framework name "${fw.name}" or full name "${fw.full_name}"`);
    }
  });

  return errors;
}

/**
 * Validate category file counts match expected values
 */
function validateCategoryCounts() {
  const errors = [];

  CATEGORIES.forEach((cat) => {
    const files = getMdFiles(cat);
    const expected = EXPECTED_COUNTS[cat];
    if (files.length !== expected) {
      errors.push(`Category "${cat}": expected ${expected} files, found ${files.length}`);
    }
  });

  return errors;
}

/**
 * Validate no orphan files (on disk but not in index.json)
 */
function validateNoOrphans() {
  const errors = [];
  const index = loadIndex();
  const indexedFiles = new Set(index.frameworks.map((fw) => fw.file));

  CATEGORIES.forEach((cat) => {
    const files = getMdFiles(cat);
    files.forEach((file) => {
      const relativePath = `frameworks/${cat}/${file}`;
      if (!indexedFiles.has(relativePath)) {
        errors.push(`Orphan file not in index.json: ${relativePath}`);
      }
    });
  });

  return errors;
}

/**
 * Validate no missing files (in index.json but not on disk)
 */
function validateNoMissingFiles() {
  const errors = [];
  const index = loadIndex();

  index.frameworks.forEach((fw) => {
    const filePath = path.join(ROOT, fw.file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing file referenced in index.json: ${fw.file}`);
    }
  });

  return errors;
}

/**
 * Validate no duplicate ids or names
 */
function validateNoDuplicates() {
  const errors = [];
  const index = loadIndex();

  const ids = index.frameworks.map((fw) => fw.id);
  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate framework ids: ${[...new Set(duplicateIds)].join(', ')}`);
  }

  const names = index.frameworks.map((fw) => fw.name);
  const duplicateNames = names.filter((name, i) => names.indexOf(name) !== i);
  if (duplicateNames.length > 0) {
    errors.push(`Duplicate framework names: ${[...new Set(duplicateNames)].join(', ')}`);
  }

  return errors;
}

/**
 * Run all framework integrity checks
 */
function runAll() {
  const allErrors = [
    ...validateCategoryCounts(),
    ...validateNoOrphans(),
    ...validateNoMissingFiles(),
    ...validateNoDuplicates(),
    ...validateFrameworkSections(),
  ];

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}

module.exports = {
  loadIndex,
  validateFrameworkSections,
  validateCategoryCounts,
  validateNoOrphans,
  validateNoMissingFiles,
  validateNoDuplicates,
  runAll,
};

// Run standalone if called directly
if (require.main === module) {
  const result = runAll();
  if (result.valid) {
    console.log('✅ All framework integrity checks passed');
  } else {
    console.log('❌ Framework integrity checks failed:\n');
    result.errors.forEach((err) => console.log(`  - ${err}`));
    process.exit(1);
  }
}