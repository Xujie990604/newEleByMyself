import axios from 'axios';
import Vue from 'vue'
// 引入mint ui库
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

// 安装mint ui插件
Vue.use(MintUI);
// 引入加载动画
import { Indicator } from 'mint-ui';

export function request(config) {
    const instance = axios.create({
        baseURL: '/api/', //加入一个基础路径， 用来匹配vue.config.js中的配置，api不会拼接到URL中只是一个用来匹配的标识
        timeout: 5000
    })

    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        Indicator.open({
            text: '加载中',
            spinnerType: 'fading-circle'
        })
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        Indicator.close();
        return response;
    }, function (error) {
        // 对响应错误做点什么
        Indicator.close();
        return Promise.reject(error);
    });

    return instance(config);
}