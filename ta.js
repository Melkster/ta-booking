const socket = io();

socket.emit('getStudentList');

socket.on('studentList', function(data) {
    console.log("'studentList' recieved from server");
    app.studentList = data.studentList;
    app.helpedList = data.helpedList;
    console.log(app.studentList);
});

var app = new Vue({
    el: '#app',
    data: {
        studentList: [],
        helpedList: []
    },
    methods: {
        emit: (data) => {
            socket.emit('studentPickedUp', data);
        },
        pickup: (index) => {
            socket.emit('pickup',index);
        }
    }
});
