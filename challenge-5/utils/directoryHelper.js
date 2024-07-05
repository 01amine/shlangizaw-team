const fs = require('fs').promises;

async function listDirectory(path) {
  try {
    const files = await fs.readdir(path);
    return files;
  } catch (err) {
    console.error('Error listing directory:', err);
    return [];
  }
}

module.exports = {
  listDirectory,
};
