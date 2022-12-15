import { fork } from 'node:child_process';
import { log, error } from 'node:console';

// The fork function is a variation of the spawn function for spawning node processes. The biggest difference between spawn and fork is that a communication channel is established to the child process when using fork, so we can use the send function on the forked process along with the global process object itself to exchange messages between the parent and forked processes. We do this through the EventEmitter module interface

const forked = fork('./child.js');
const forked_prime_numbers = fork('./primeNumber.js');

forked.on("message", function (message) {
    log(`message from child: ${message}`)
})


forked_prime_numbers.on('message', (message) => {
    log(`result from child: ${message}`)
})


forked_prime_numbers.send(100);

forked.send('Hey child :)')