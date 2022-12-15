// The child_process.execFile() function is similar to child_process.exec() except that it does not spawn a shell by default. Rather, the specified executable file is spawned directly as a new process making it slightly more efficient than child_process.exec().


import { log, error } from 'node:console';
import { execFile, exec, spawn } from 'node:child_process'
// util.promisify(execFile);

// const execFile = util.promisify(require('node:child_process').execFile);
function getVersion() {
    exec('node --version', (error, stdout, stderr) => {
        if (error) {
            throw error;
        }

        log(`EXEC : ${stdout}`)
    });


    execFile('node', ['--version'], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }

        log(`EXEC-FILE : ${stdout}`)
    });

    const child = spawn('node', ['--version'], {
        shell: true,
        stdio: 'inherit'
    });

}


getVersion();