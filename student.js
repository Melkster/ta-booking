var app = new Vue({
    el: '#app',
    data: {
	message: 'Hello Vue!'
    },
    methods: {
	send_help: (name) => {
	    console.log(name);
	    Vue.http.post('name', name).then((val) => {
		console.log(val);
	    });
	}
    }
});
