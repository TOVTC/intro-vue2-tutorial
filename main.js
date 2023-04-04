// creates new Vue instance - root of Vue application, pass in options object to store data and perform actions
// Vue is reactive, so all data properties are linked to where that data is being referenced
var app = new Vue({
    // el property specifies which element to plug our app into (here, div with id app)
    el: '#app',
    data: {
        product: 'Socks',
        description: 'These are socks'
    }
})