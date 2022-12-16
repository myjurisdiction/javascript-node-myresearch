import http from 'node:http';
import { fork } from 'node:child_process';


const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/compute':
            let forked = fork('./primeNumber.js');
            console.log(`new forked sub-process pid : ${forked.pid}`)
            forked.on('message', (msg) => {
                console.log('message from child process', msg.length);
                res.statusCode = 200;
                res.write(JSON.stringify(msg));
                res.end();
            })

            forked.send(10000000);
            break;


        case '/hello':
            res.statusCode = 200;
            res.write('hello from server !!');
            res.end();
            break;

        default:
            res.statusCode = 200;
            res.write('have a good day !!');
            res.end();
            break;
    }


})

server.listen(8080, () => console.log('Server is up PORT:8080'))