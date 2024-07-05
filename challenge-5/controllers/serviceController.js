const { exec } = require('child_process');

exports.listServices = (req, res) => {
  exec('service --status-all', (err, stdout, stderr) => {
    if (err) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.json({ services: stdout });
  });
};

exports.startService = (req, res) => {
  const { serviceName } = req.body;
  exec(`service ${serviceName} start`, (err, stdout, stderr) => {
    if (err) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.json({ message: `${serviceName} started` });
  });
};

exports.stopService = (req, res) => {
  const { serviceName } = req.body;
  exec(`service ${serviceName} stop`, (err, stdout, stderr) => {
    if (err) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.json({ message: `${serviceName} stopped` });
  });
};
