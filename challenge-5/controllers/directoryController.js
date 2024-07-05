const { exec } = require('child_process');
const path = require('path');

exports.listDirectory = (req, res) => {
  const dirPath = req.query.path || '.';

  exec(`ls -l ${dirPath}`, (err, stdout, stderr) => {
    if (err) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.json({ files: stdout });
  });
};
