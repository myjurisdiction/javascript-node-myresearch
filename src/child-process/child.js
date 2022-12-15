process.on('message', (msg) => {
    console.log(`message from parent: ${msg}`)
})

let counter = 0;

process.send('Heya Parent !!')

setInterval(() => {
    counter += 1;
    process.send(counter);
}, 1000)