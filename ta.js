const socket = io();
//var io = require('socket.io-client');

var list = [];

socket.on('studentList', function(data) {
    console.log("'studentList' recieved from server");
    console.log(data);
    app.studentList = data;
});

var app = new Vue({
    el: '#app',
    data: {
        studentList: list,
        name
    },
    methods: {
        emit: (data) => {
            socket.emit('studentPickedUp', data);
        }
    }
});
