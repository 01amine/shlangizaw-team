const os = require('os');

exports.getSystemMetrics = (req, res) => {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  res.json({
    cpuUsage: cpus,
    totalMemory,
    freeMemory,
  });
};
