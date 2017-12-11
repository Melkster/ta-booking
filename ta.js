const socket = io();

socket.emit('getStudentList');

socket.on('needHelpList', function(data) {
    console.log("'needHelpList' recieved from server");
    app.needHelpList = data.needHelpList;
    app.helpedList = data.helpedList;
    console.log(app.needHelpList);
    console.log(app.helpedList);
});

var app = new Vue({
    el: '#app',
    data: {
        needHelpList: [],
        helpedList: []
    },
    methods: {
        emit: (data) => {
            socket.emit('studentPickedUp', data);
        },
        pickup: (id) => {
            console.log(id);
            socket.emit('pickup', id);
        }
    }
});
