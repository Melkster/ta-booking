const http = require('http');
const fs   = require('fs');
const port = 8080;
const qs   = require('querystring')

var students = {
    'needHelpList': ["Michael"],
    'helpedList': ["Jonatan"]
}

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
            io.emit('needHelpList', students.needHelpList);
        }
        else if (req.url == '/ta.js') {
            getRequestHandler('./ta.js', res);
        }
        else if (req.url == '/node_modules/socket.io-client/dist/socket.io.js') {
            getRequestHandler('./node_modules/socket.io-client/dist/socket.io.js', res);
        }
        else if (req.url == '/wait') {
            getRequestHandler('./wait.html', res);
        }
    }
    else if (req.method == 'POST') {
        var body = [];
        req.on('error', (err) => {
            console.log(err);
            throw err;
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            name = qs.parse(body).name
            students.needHelpList.push(name);
            console.log('Student "' + name + '" added to list');
            io.emit('needHelpList', students);
        });
        getRequestHandler('./wait.html', res);
    }
});

var io = require('socket.io')(server);

io.on('connection', function(client){
    console.log('User connected');
    //client.send('needHelpList', nameList);
    client.on('studentPickedUp', function(data){
        io.emit('needHelpList', students);
        console.log(data);
    });
    client.on('getStudentList', function(data){
        io.emit('needHelpList', students);
    });
    client.on('pickup', function(index){
        students.helpedList.push(students.needHelpList[index]);
        students.needHelpList.splice(index, 1);
        io.emit('needHelpList', students);
    });
    client.on('disconnect', function(){
        console.log('User disconnected');
    });
});

server.listen(port).on('error', (err) => {
    console.log(err);
    throw err;
});

console.log('Server running on port ' + port);
