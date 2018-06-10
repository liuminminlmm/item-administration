import Vue from 'vue/dist/vue.esm.js';
import axios from 'axios';
//创建一个axios实例
let instance = axios.create({
    timeout: 3000
})
//请求拦截
instance.interceptors.request.use((config) => {
    // console.log(config);
    //打包上线发送请求的真实路径
    if(process.env.NODE_ENV=='production'){
        config.baseURL = 'https://eip.btte.net'
    }else{
        config.baseURL = 'http://localhost:8080'
    }
    return config;
}, (err) => {
    return Promise.reject(err);
})
//响应拦截
instance.interceptors.response.use((response) => {
    // console.log(response);
    if(response.status===200){
          return response.data;
    }else{
        return Promise.reject(response)
    }

}, (err) => {
     return Promise.reject(err);
})
//vue插件
let httpPlugin = {
    install() {
        //防止$http将来被覆盖
        Object.defineProperty(Vue.prototype, '$http', {
            value: instance
        })
    }
}
export { instance };
export default httpPlugin;

