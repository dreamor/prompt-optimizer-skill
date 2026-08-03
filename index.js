const path = require('path');
const { readFileSync } = require('fs');
const { readFile } = require('fs').promises;

const VERSION = require('./package.json').version;

const FRAMEWORKS_DIR = path.join(__dirname, 'frameworks');
const INDEX_PATH = path.join(FRAMEWORKS_DIR, 'index.json');
const BASE_DIR = path.resolve(__dirname);

/**
 * Ensure a resolved path stays within the skill's own directory.
 * @param {string} resolved
 * @returns {string} the same path if valid
 */
function guardPath(resolved) {
  if (!resolved.startsWith(BASE_DIR + path.sep) && resolved !== BASE_DIR) {
    throw new Error('Access denied: path outside skill directory');
  }
  return resolved;
}

/**
 * Safe version of readFileSync with path-boundary enforcement.
 * @param {string} filePath
 * @param {string} encoding
 * @returns {string}
 */
function safeRead(filePath, encoding) {
  return readFileSync(guardPath(path.resolve(filePath)), encoding);
}

let _cachedIndex = null;

/**
 * Load the framework index from disk (synchronous, cached).
 * @returns {{ frameworks: Array, total: number, by_category: object, domains: string[] } | null}
 */
function loadFrameworkIndex() {
  if (_cachedIndex) return _cachedIndex;
  try {
    _cachedIndex = JSON.parse(safeRead(INDEX_PATH, 'utf-8'));
    return _cachedIndex;
  } catch (err) {
    return null;
  }
}

/**
 * Load the framework index from disk (async, bypasses sync cache).
 * @returns {Promise<object|null>}
 */
async function loadFrameworkIndexAsync() {
  try {
    const content = await readFile(INDEX_PATH, 'utf-8');
    const index = JSON.parse(content);
    _cachedIndex = index;
    return index;
  } catch (err) {
    return null;
  }
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
        return safeRead(filePath, 'utf-8');
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
  const index = await loadFrameworkIndexAsync();
  if (!index) return null;

  for (const fw of index.frameworks) {
    if (fw.id === frameworkId && fw.file) {
      const filePath = path.join(__dirname, fw.file);
      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(BASE_DIR + path.sep) && resolved !== BASE_DIR) {
        return null;
      }
      try {
        return await readFile(resolved, 'utf-8');
      } catch (_) {
        return null;
      }
    }
  }
  return null;
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
