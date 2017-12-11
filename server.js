const http = require('http');
const fs   = require('fs');
const port = 80;
const qs   = require('querystring')

var nameList = [];

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
        else if (req.url == '/ta') {
            getRequestHandler('./ta.html', res);
        }
        else if (req.url == '/ta.js') {
            getRequestHandler('./ta.js', res);
        }
        else if (req.url == 'nameList') {
            res.write("nameList");
            res.end();
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
            nameList.push(qs.parse(body).name);
            console.log(nameList);
        });
	getRequestHandler('./student.html', res);
    }
});

var io = require('socket.io')(server);
io.on('connection', function(client){
    console.log('User connected');
    client.on('studentPicketUp', function(data){
        console.log(data);
    });
    client.on('disconnect', function(){
        console.log('User disconnected');
    });
});

console.log('Server running on port ' + port);

server.listen(port).on('error', (err) => {
    throw err;
});
