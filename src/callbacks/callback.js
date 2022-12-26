// What atre callbacks ?
// callbacks are functions passed to other higher order functions. This is possible because in JS, functions are first class objects.

// This is asynchronously calling the callback
function logPersonDetails(cb, param) {
  setTimeout(() => {
    cb(param);
  }, 0);
  console.log("Function executed successfullly");
}

function logDetails(param) {
  for (let i = 1; i < 1e9; i++) {}
  console.log(`I am ${param.name} and my hobby is ${param.hobby}`);
  return;
}

// This example is of SYNCHRONOUSLY executing the callback function.
logPersonDetails(logDetails, { name: "Abhishek", hobby: "dancing" });

import { EventEmitter } from "node:events";

class MyEventEmmitter extends EventEmitter {
  execute(taskFunc) {
    console.log("Before Executing...");
    this.emit("begin");

    taskFunc();

    this.emit("end");

    console.log("Post execution...");
  }

  executeAsync(taskFunc) {
    console.log("Before Executing...");
    this.emit("begin");

    setImmediate(taskFunc);

    this.emit("end");

    console.log("Post execution...");
  }
}

const logEvent = new MyEventEmmitter();

// logEvent.on("begin", function () {
//   console.log("About to execute...");
// });

// logEvent.on("end", function () {
//   console.log("Done executing ...");
// });

// logEvent.execute(() => console.log("I AM SUPER AWESOME !!!"));

// the resULT for the above is like this

// Before Executing...
// About to execute...
// I AM SUPER AWESOME !!!
// Done executing ...
// Post execution...

// logEvent.executeAsync(() =>
//   console.log("I AM SUPER AWESOME AND I WILL BE EXECUTED ASYNCHRONOUSLY !!!")
// );

// Before Executing...
// About to execute...
// Done executing ...
// Post execution...
// I AM SUPER AWESOME AND I WILL BE EXECUTED ASYNCHRONOUSLY !!!

import fs from "node:fs";

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit("begin");
    console.time("execute");
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit("error", err);
      }

      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    });
  }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("data", function (data) {
  console.log(data.toString());
});

// error was handled soprocess did not exit.
withTime.on("error", function (err) {
  console.log(err);
});


// order of execution

// first
withTime.on("data", function (data) {
  console.log(`Length of the data : ${data.length}`);
});


// second
withTime.prependListener("data", function (data) {
  console.log(`Characters in data : ${data.toString().length}`);
});

withTime.execute(fs.readFile, "");
withTime.execute(fs.readFile, "./someTest.txt");
