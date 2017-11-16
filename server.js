const http = require('http');
const fs   = require('fs');
const port = 8080;

function getRequestHandler(url, res) {
    var data = fs.readFileSync(url);
    res.write(data);
    res.end();
}

const server = http.createServer((req,res) => {
    if (req.method == 'GET') {
        if(req.url == '/') {
            getRequestHandler('./index.html', res);
        }
        else if (req.url == '/app.js') {
            getRequestHandler('./app.js', res);
        }
        else if (req.url == '/node_modules/vue/dist/vue.js') {
            getRequestHandler('./node_modules/vue/dist/vue.js', res);
        }
        else if (req.url == '/student') {
            getRequestHandler('./student.html', res);
        }
        else if (req.url == '/student.js') {
            getRequestHandler('./student.js', res);
        }
    }
    else if (req.method == 'POST') {
        console.log("POST request!");
        var body = [];
        req.on('error', (err) => {
            console.log(err);
            throw err;
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            console.log(body);
        });
    }
});

server.listen(port);
console.log('Server running on port ' + port);

server.listen(8080).on('error', (err) => {
    throw err;
});
