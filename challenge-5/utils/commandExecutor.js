const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executeCommand(command) {
  try {
    const { stdout, stderr } = await exec(command);
    if (stderr) {
      console.error(`Error executing command: ${stderr}`);
      return { error: stderr };
    }
    return { output: stdout };
  } catch (err) {
    console.error('Error executing command:', err);
    return { error: err.message };
  }
}

module.exports = 
  executeCommand()
;
