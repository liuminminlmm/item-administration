import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//请求数据之二
import http from './utils/http.js';
Vue.use(http);
import store from './store/index';
//请求数据之一
// import axios from 'axios';
// Vue.prototype.$http = axios;
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router:router,
  store,
  render: h => h(App)
})
