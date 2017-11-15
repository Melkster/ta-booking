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
	else if (req.url == '/student') {
	    var data = fs.readFileSync('./student.html');
	    res.write(data);
	    res.end();
	}
	else if (req.url == '/student.js') {
	    var data = fs.readFileSync('./student.js');
	    res.write(data);
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
	    console.log(body);
	});
    }
});
server.listen(port);
console.log('Server running on port ' + port);

server.listen(8080).on('error', (err) => {
    throw err;
});
