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
	studentHelping: {}
    },
    methods: {
        emit: (data) => {
            socket.emit('studentPickedUp', data);
        },
        pickup: (person) => {
            socket.emit('pickup', person.id);
	    app.isHelping = true;
	    app.studentHelping = person;
        },
	doneHelp: (person) => {
	    socket.emit('done', person.id);
	    app.isHelping = false;
	    app.studentHelping = {};
	}
    }
});
