const socket = io();

var studentList = "";

var app = new Vue({
    el: '#app',
    data: {
        studentList: studentList
    },
    methods: {
        //req: getRequest()
        //post_request: () => {
            //poll(() => new Promise(() => {
                //Vue.http.get('name', name).then((val) => {
                    //console.log('Request sent')), 1000)
                //}
            //});
        //}
    }
});