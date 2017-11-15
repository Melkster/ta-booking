const http = require('http');
const fs   = require('fs');
const port = 8080

const server = http.createServer((req,res) => {
    if (req.method == 'GET') {
        if(req.url == '/') {
            var data = fs.readFileSync('./index.html');
            res.write(data);
            res.end();
        }
        else if (req.url == '/app.js') {
            var data = fs.readFileSync('./app.js');
            res.write(data);
            res.end();
        }
        else if (req.url == '/node_modules/vue/dist/vue.js') {
            var data = fs.readFileSync('./node_modules/vue/dist/vue.js');
            res.write(data);
            res.end();
        }
    }
});

server.listen(port);
console.log('Server running on port ' + port);
