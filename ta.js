const socket = io();

socket.emit('getStudentList');

socket.on('needHelpList', function(data) {
    console.log("'needHelpList' recieved from server");
    app.needHelpList = data.needHelpList;
    app.helpedList = data.helpedList;
    console.log(app.needHelpList);
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
        pickup: (index) => {
            socket.emit('pickup',index);
        }
    }
});
