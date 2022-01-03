"use strict";

import Vue from 'vue';
import router from '../router';
import axios from "axios";
import { Message } from 'element-ui';


let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        if (response.data.code == "20") {
            router.push({ name: "Login" });
            Message.error("未登录，请重新登录");
            return Promise.reject(response);
        }
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

// Plugin.install = function(Vue, options) {
//     Vue.axios = _axios;
//     window.axios = _axios;
//     Object.defineProperties(Vue.prototype, {
//         axios: {
//             get() {
//                 return _axios;
//             }
//         },
//         $axios: {
//             get() {
//                 return _axios;
//             }
//         },
//     });
// };

// Vue.use(Plugin)

// export default Plugin;
export default _axios;