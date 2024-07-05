const os = require('os');
const { executeCommand } = require('../utils/commandExecutor');
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


exports.executeSystemCommand =  async (req, res) =>{
  const command = req.body.command;
  const result = await executeCommand(command);
  res.render('dashboard', { commandOutput: result.output || result.error });
}
