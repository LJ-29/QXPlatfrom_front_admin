import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import './plugins/element.js'
axios.defaults.withCredentials = true; //设置每次请求携带cookie
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')