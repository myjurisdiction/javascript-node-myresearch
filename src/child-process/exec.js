import { exec, spawn } from "node:child_process";
import { log, error } from "node:console";

// exec creates a child process.
// it has three standard I/O streams -> stderr, stdin (writable stream), stdout(readable stream)
// it creates a shell by defualt to execute the CMD we pass into it.
// It buffers the output of comand.

// By default, the spawn function does not create a shell to execute the command we pass into it. This makes it slightly more efficient than the exec function, which does create a shell. The exec function has one other major difference. It buffers the command’s generated output and passes the whole output value to a callback function (instead of using streams, which is what spawn does).

// Since the exec function uses a shell to execute the command, we can use the shell syntax directly here, making use of the shell pipe feature.

// Note that using the shell syntax comes with a security risk if you’re executing any kind of dynamic input provided externally. A user can simply do a command injection attack using shell syntax characters like ; and $ (for example, command + '; rm -rf ~' )

exec("ls", (err, stdout, stderr) => {
  if (err) throw err;
  log(stdout);
});

// the below command finds the total number of file in the current directly. then we pipe the previous command which counts the number of lines
exec("find . -type f | wc -l", (err, stdout, stderr) => {
  if (err) throw err;

  console.log("The number of files here are: ", stdout);
});
