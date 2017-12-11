const socket = io();

socket.emit('getStudentList');

socket.on('needHelpList', function(data) {
    app.needHelpList = data.needHelpList;
    app.helpedList = data.helpedList;
});

var app = new Vue({
    el: '#app',
    data: {
        needHelpList: [],
        helpedList: [],
	isHelping: false,
	studentHelpingName: ""
    },
    methods: {
        emit: (data) => {
            socket.emit('studentPickedUp', data);
        },
        pickup: (person) => {
            socket.emit('pickup', person.id);
	    app.isHelping = true;
	    app.studentHelpingName = person.name;
        }
    }
});
