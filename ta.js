const socket = io();

var list = [];
socket.emit('getStudentList', "");

socket.on('studentList', function(data) {
    console.log("'studentList' recieved from server");
    console.log(data);
    app.studentList = data;
});

var app = new Vue({
    el: '#app',
    data: {
        studentList: list,
    },
    methods: {
        emit: (data) => {
            socket.emit('studentPickedUp', data);
        }
    }
});
