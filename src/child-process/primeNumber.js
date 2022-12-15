function listPrime(num) {
    const array = [];
    for (let i = 0; i < num; i++) {
        if (is_prime(i)) {
            array.push(i);
        }
    }
    return array
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





process.on('message', (msg) => {
    const result = listPrime(msg);
    process.send(result)
})
