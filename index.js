const path = require('path');
const fs = require('fs');

const VERSION = require('./package.json').version;

const FRAMEWORKS_DIR = path.join(__dirname, 'frameworks');
const INDEX_PATH = path.join(FRAMEWORKS_DIR, 'index.json');

let _cachedIndex = null;

function loadFrameworkIndex() {
  if (!_cachedIndex) {
    _cachedIndex = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  }
  return _cachedIndex;
}

function listFrameworks() {
  const index = loadFrameworkIndex();
  return index.frameworks
    .filter((fw) => fw.id)
    .map((fw) => fw.id);
}

function getFramework(frameworkId) {
  const index = loadFrameworkIndex();

  for (const fw of index.frameworks) {
    if (fw.id === frameworkId && fw.file) {
      // fw.file is relative to project root (e.g. "frameworks/simple/APE.md")
      const filePath = path.join(__dirname, fw.file);
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
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
