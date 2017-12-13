const http = require('http');
const fs   = require('fs');
const port = 80;
const qs   = require('querystring')

var date = new Date()
var atomic = require('atomic')()

counter = {
    id: 0,
    generateId: function() {
        return this.id++;
    }
}

var students = {};
var rawdata = fs.readFile('backup.json', (err, data) => {
    if (err) {
        var emptyStudents = {'needHelpList':[],'helpedList': []};
        var studentJSON = JSON.stringify(emptyStudents);
        fs.writeFileSync('backup.json', studentJSON);
        students = emptyStudents;
    } else {
        students = JSON.parse(data);
    }
});

function backup() {
    var data = JSON.stringify(students);
    fs.writeFileSync('backup.json', data);
}

function helpStudent(id) {
    for (var i = 0; i < students.needHelpList.length; i++) {
        if (students.needHelpList[i].id == id) {
            students.helpedList.push(students.needHelpList[i]);
            students.needHelpList.splice(i, 1);
            break;
        }
    }
}

function doneStudent(id) {
    for (var i = 0; i < students.helpedList.length; i++) {
        if (students.helpedList[i].id == id) {
            students.helpedList.splice(i, 1);
            return true
        }
    }
    return false
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
            students.needHelpList.push({
                id: counter.generateId(),
                name: name,
                time: date.toLocaleTimeString('en-SW', {hour12: false, hour: '2-digit', minute: '2-digit'})
            });
            backup();
            console.log('Student "' + name + '" added to list');
            io.emit('needHelpList', students);
        });
        getRequestHandler('./wait.html', res);
    }
});

var io = require('socket.io')(server);

io.on('connection', function(client){
    console.log('User connected');
    client.on('studentPickedUp', function(data){
        io.emit('needHelpList', students);
        console.log(data);
    });
    client.on('getStudentList', function(data){
        io.emit('needHelpList', students);
    });
    client.on('pickup', function(id) {
        helpStudent(id);
        backup();
        io.emit('needHelpList', students);
    });
    client.on('done', function(id) {
        atomic('lock', function (done, key, id){
            doneStudent(id)
            done()
        });
        backup();
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
