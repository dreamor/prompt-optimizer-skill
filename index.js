/**
 * Prompt Optimizer Skill
 *
 * A professional Claude Code Skill that transforms simple instructions
 * into production-ready prompts using the CLARITY framework.
 *
 * This module exports metadata and utilities for programmatic use.
 * For CLI usage, run: npx prompt-optimizer-skill
 */

const path = require('path');
const fs = require('fs');

const VERSION = require('./package.json').version;

const FRAMEWORKS_DIR = path.join(__dirname, 'frameworks');
const INDEX_PATH = path.join(FRAMEWORKS_DIR, 'index.json');

/**
 * Load the framework index
 * @returns {object} The framework index containing all categories and frameworks
 */
function loadFrameworkIndex() {
  const raw = fs.readFileSync(INDEX_PATH, 'utf-8');
  return JSON.parse(raw);
}

/**
 * List all available framework IDs
 * @returns {string[]} Array of framework identifiers
 */
function listFrameworks() {
  const index = loadFrameworkIndex();
  const ids = [];

  for (const category of Object.values(index)) {
    if (Array.isArray(category.frameworks)) {
      for (const fw of category.frameworks) {
        if (fw.id) ids.push(fw.id);
      }
    }
  }

  return ids;
}

/**
 * Read a specific framework's content
 * @param {string} frameworkId - The framework identifier (e.g. "CO-STAR", "CRISPE")
 * @returns {string|null} The framework markdown content, or null if not found
 */
function getFramework(frameworkId) {
  const index = loadFrameworkIndex();

  for (const category of Object.values(index)) {
    if (Array.isArray(category.frameworks)) {
      for (const fw of category.frameworks) {
        if (fw.id === frameworkId && fw.file) {
          const filePath = path.join(FRAMEWORKS_DIR, fw.file);
          if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf-8');
          }
        }
      }
    }
  }

  return null;
}

module.exports = {
  VERSION,
  loadFrameworkIndex,
  listFrameworks,
  getFramework,
  FRAMEWORKS_DIR,
};
