// The functions spawn, exec, and execFile from the child_process module also have synchronous blocking versions that will wait until the child process exits.

//  methods are synchronous and will block the Node.js event loop, pausing execution of any additional code until the spawned process exits.

import { execFileSync, execSync, spawnSync } from 'node:child_process';
import { log, error } from 'node:console';

const { stdout: outout_1 } = spawnSync('ls', ['-al']);
const { stdout: outout_2 } = spawnSync('node', ['--version']);

log(outout_1.toString())
log(outout_2.toString())


const data_1 = execFileSync("docker", ["--version"]);
log(data_1.toString())

const data_2 = execSync("curl example.com");
log(data_2.toString())


// child_1.stdout.on('data', function (data) {
//     log('data', data)
// })

// child_1.stderr.on('data', function (data) {
//     log('err', data)
// })

