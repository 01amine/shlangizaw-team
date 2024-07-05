const { exec } = require('child_process');
const os = require('os');

async function executeSystemCommand(req, res)  {

  const command = req.body.command;

  exec(command, (error, stdout, stderr) => {
    let commandOutput = '';
    if (error) {
      commandOutput = `Error: ${error.message}`;
    } else if (stderr) {
      commandOutput = `Error: ${stderr}`;
    } else {
      commandOutput = stdout;
    }

    res.render('dashboard', { 
      commandOutput, 
      cpuUsage: getCpuUsage(), 
      ramUsage: getRamUsage() 
    });
  });
}

function getCpuUsage() {
  const cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  let total = 0;

  for (let cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  }

  total = user + nice + sys + idle + irq;

  return {
    user: ((user / total) * 100).toFixed(2),
    sys: ((sys / total) * 100).toFixed(2),
    idle: ((idle / total) * 100).toFixed(2),
  };
}

function getRamUsage() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  return {
    total: (totalMem / (1024 ** 3)).toFixed(2), // in GB
    used: (usedMem / (1024 ** 3)).toFixed(2), // in GB
    free: (freeMem / (1024 ** 3)).toFixed(2), // in GB
    usagePercent: ((usedMem / totalMem) * 100).toFixed(2),
  };
}

module.exports = {
  executeSystemCommand,
};
