import { spawn } from "node:child_process";
import { log, error } from "node:console";

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
  cwd: "/home/abhishek/projects/personal_projects/javascript-playground/child-process",
});

// Another option we can use is env to specify the environment variables that will be visible to the new child process. The default for this option is process.env which gives any command access to the current process environment. If we want to override that behavior, we can simply pass an empty object as the env option or new values there to be considered as the only environment variables:

const child = spawn("echo $ANSWER", {
  stdio: "inherit",
  shell: true,
  env: { ANSWER: 42 }
});




