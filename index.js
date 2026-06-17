const path = require('path');
const fs = require('fs');

const VERSION = require('./package.json').version;

const FRAMEWORKS_DIR = path.join(__dirname, 'frameworks');
const INDEX_PATH = path.join(FRAMEWORKS_DIR, 'index.json');

let _cachedIndex = null;

/**
 * Load the framework index from disk (synchronous, cached).
 * @returns {{ frameworks: Array, total: number, by_category: object, domains: string[] } | null}
 */
function loadFrameworkIndex() {
  if (_cachedIndex) return _cachedIndex;
  try {
    _cachedIndex = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
    return _cachedIndex;
  } catch (err) {
    return null;
  }
}

/**
 * Load the framework index from disk (async, cached via loadFrameworkIndex).
 * @returns {Promise<object|null>}
 */
async function loadFrameworkIndexAsync() {
  return loadFrameworkIndex();
}

/** @returns {string[]} */
function listFrameworks() {
  const index = loadFrameworkIndex();
  if (!index) return [];
  return index.frameworks
    .filter((fw) => fw.id)
    .map((fw) => fw.id);
}

/**
 * Get a framework's markdown content by id.
 * @param {string} frameworkId
 * @returns {string|null} markdown content, or null if not found / missing
 */
function getFramework(frameworkId) {
  const index = loadFrameworkIndex();
  if (!index) return null;

  for (const fw of index.frameworks) {
    if (fw.id === frameworkId && fw.file) {
      const filePath = path.join(__dirname, fw.file);
      try {
        return fs.readFileSync(filePath, 'utf-8');
      } catch (_) {
        return null;
      }
    }
  }
  return null;
}

/**
 * Get a framework's markdown content by id (async).
 * @param {string} frameworkId
 * @returns {Promise<string|null>}
 */
async function getFrameworkAsync(frameworkId) {
  return getFramework(frameworkId);
}

module.exports = {
  VERSION,
  loadFrameworkIndex,
  loadFrameworkIndexAsync,
  listFrameworks,
  getFramework,
  getFrameworkAsync,
  FRAMEWORKS_DIR,
};
