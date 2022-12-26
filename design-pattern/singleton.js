let instance;

let counter = 0;

class Singleton {
  constructor() {
    if (instance) {
      throw Error("you can only instantiate it once");
    }

    instance = this;
  }

  getInstance() {
    return this;
  }

  increment() {
    counter++;
  }

  decrement() {
    counter--;
  }

  getCounter() {
    return counter;
  }
}

let counter_1 = new Singleton(); // can be instantiated only once.
// let counter_2 = new Singleton();

counter_1.increment();
counter_1.increment();

console.log(counter_1.getCounter());
