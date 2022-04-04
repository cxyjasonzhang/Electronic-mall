// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress";
// 在当前模块引入store
import store from "@/store"
// 引入进度条样式
import 'nprogress/nprogress.css'
// console.log(nprogress);
/* 
01  利用axios对象中create方法 创建一个axios实例
02  request为axios，配置一下
*/
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL: '/api',
    // 代表请求超时的时间为5s
    timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) => {
    //现在的问题是config是什么?配置对象
    //可以让进度条开始动
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段(userTempId):和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 请求成功的回调，服务器响应数据回来后，响应拦截器可以检测到，
    nprogress.done();//进度条结束
    return res.data;
}, (err) => {
    // 失败的回调
    return Promise.reject(new Error('faile'));
})

// 对外暴露
export default requests;