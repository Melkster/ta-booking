var sleep = time => new Promise(resolve => setTimeout(resolve, time))
var poll = (promiseFn, time) => promiseFn().then(
    sleep(time).then(() => poll(promiseFn, time))
)
var studentList = "";

// Greet the World every second
function getRequest() {
    poll(() => new Promise(() => {
        Vue.http.get('nameList', nameList).then((val) => {
            console.log(val);
        });
    }), 100000000)
}


var app = new Vue({
    el: '#app',
    data: {
        studentList: studentList
    },
    methods: {
        req: getRequest()
        //post_request: () => {
            //poll(() => new Promise(() => {
                //Vue.http.get('name', name).then((val) => {
                    //console.log('Request sent')), 1000)
                //}
            //});
        //}
    }
});
