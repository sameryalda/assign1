const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Greetings from my first NodeJS app!</h1>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="create-user"/><button type="submit">Submit</button></form>')
        return res.end();
    }
    if(url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        return res.end();
    }
    if(url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<ul><li>User 1</li> <li>User 2</li> <li>User 3</li> </ul>')
        return res.end();
    }

});

server.listen(3000);
