const express = require('express');

const systemRoutes = require('./routes/system');
const directoryRoutes = require('./routes/directory');
const serviceRoutes = require('./routes/service');

const port = 3000 ; 

const app = express();


app.use(express.json());

// ui
app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static('public'));


app.use('/api/system', systemRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/service', serviceRoutes);


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { commandOutput: null, cpuUsage: getCpuUsage(), ramUsage: getRamUsage() });
});



const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



function getCpuUsage() {
  const os = require('os');
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
  const os = require('os');
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  return {
    total: (totalMem / (1024 ** 3)).toFixed(2), 
    used: (usedMem / (1024 ** 3)).toFixed(2), 
    free: (freeMem / (1024 ** 3)).toFixed(2), 
    usagePercent: ((usedMem / totalMem) * 100).toFixed(2),
  };
}