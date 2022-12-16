function listPrime(num) {
    return new Promise((resolve) => {
        const array = [];
        for (let i = 0; i < num; i++) {
            if (is_prime(i)) {
                array.push(i);
            }
        }
        resolve(array);
    })

}

function is_prime(num) {
    // check if the given number is prime or not
    // a prime is a number which is divisible by 1 and the number itself
    if (num < 2) {
        return false;
    }

    else if (num === 2) {
        return true
    }

    else if (num > 2 && num % 2 === 0) {
        return false;
    }

    else {
        let dividend = Math.floor(Math.sqrt(num)) + 1;

        for (let i = 3; i < dividend; i += 2) {
            if (num % i === 0) {
                return false
            }
        }
        return true

    }
}



// console.log(listPrime(10000000))

process.on('message', async (msg) => {
    console.log('start');
    let startTime = Date.now();
    const result = await listPrime(msg);
    console.log('total length: ', result.length)
    console.log('end', Date.now() - startTime);
    process.send(result)
    console.log('ready to exit now');
    const processExitInitiation = Date.now();
    setTimeout(() => {
        console.log('exiting process after 500 ms !!', Date.now() - processExitInitiation);
        process.exit();
    }, 500)
})

process.on('exit', function (code, signal) {
    console.log(`process ${process.pid} has exited !!`);
})
