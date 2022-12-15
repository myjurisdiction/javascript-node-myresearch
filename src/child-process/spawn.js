import { spawn, exec } from "node:child_process";
import { log, error } from "node:console";

// SYNTAX :  child_process.spawn(command[, args][, options])

// spawn creates a child process.
// It has three standard I/O streams -> stderr, stdin (writable stream), stdout(readable stream)
// ITt does not create a shell by defualt to execute the CMD we pass into it.
// ITt streams the output of comand.

/**
 * Child process 1
 *
 */

const c1 = spawn("ls", ["-al"]);

// stdout is a readable stream
c1.stdout.on("data", function (data) {
  log(data.toString());
});

/**
 * Child process input output streanms
 */

const find = spawn("find", [".", "-type", "f"]);
const wc = spawn("wc", ["-l"]);

find.stdout.pipe(wc.stdin);

wc.stdout.on("data", (data) => {
  console.log(`Number of files ${data}`);
});


// We can make the spawned child process inherit the standard IO objects of its parents if we want to, but more importantly, we can make the spawn function use the shell syntax as well. Here’s the same find | wc command implemented with the spawn function:

// Because of the stdio: 'inherit' option above, when we execute the code, the child process inherits the main process stdin, stdout, and stderr. This causes the child process data events handlers to be triggered on the main process.stdout stream, making the script output the result right away.

const spawned_child_1 = spawn("find . -type f | wc -l", {
  stdio: "inherit",
  shell: true,
});

const spawned_child_2 = spawn("find . -type f | wc -l", {
  stdio: "inherit",
  shell: true,
  cwd: "./",
});


// we can use the cwd option to change the working directory of the script
const spawned_child_3 = spawn("find . -type f | wc -l", {
  stdio: "inherit",
  shell: true,
  cwd: "/home/abhishek/projects/personal_projects/javascript-node-research/src/child-process",
});

// Another option we can use is env to specify the environment variables that will be visible to the new child process. The default for this option is process.env which gives any command access to the current process environment. If we want to override that behavior, we can simply pass an empty object as the env option or new values there to be considered as the only environment variables:
const spawned_child_4 = spawn("echo $ANSWER", {
  stdio: "inherit",
  shell: true,
  env: { ANSWER: 42 }
});

// One last important child process option to explain here is the detached option, which makes the child process run independently of its parent process.
const spawned_child_5 = spawn('node', ["./timer.js"], {
  detached: true,
  stdio: 'ignore'
});
// If the unref function is called on the detached process, the parent process can exit independently of the child. This can be useful if the child is executing a long-running process, but to keep it running in the background the child’s stdio configurations also have to be independent of the parent.
spawned_child_5.unref()



// The importance of the distinction between child_process.exec() and child_process.execFile() can vary based on platform. On Unix-type operating systems (Unix, Linux, macOS) child_process.execFile() can be more efficient because it does not spawn a shell by default. On Windows, however, .bat and .cmd files are not executable on their own without a terminal, and therefore cannot be launched using child_process.execFile(). When running on Windows, .bat and .cmd files can be invoked using child_process.spawn() with the shell option set, with child_process.exec(), or by spawning cmd.exe and passing the .bat or .cmd file as an argument (which is what the shell option and child_process.exec() do)


/**
 * 
 * //only in windows
 * const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.error(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

//  /or

const { exec, spawn } = require('node:child_process');
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

// Script with spaces in the filename:
const bat = spawn('"my script.cmd"', ['a', 'b'], { shell: true });
// or:
exec('"my script.cmd" a b', (err, stdout, stderr) => {
  // ...
});


 */









