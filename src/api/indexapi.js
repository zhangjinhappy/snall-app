import axios from 'axios';
import {Toast} from 'mint-ui';
import QS from 'qs';

// import store from '../store/store'
// import * as types from '../store/types'
import config from '../config/SystemConfig';
import {setCookie,getCookie} from '../util/CookieUtils';
import {TOKEN} from "../store/types";
axios.defaults.baseURL = config["axios.defaults.baseURL"];//设置默认的基本路径

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://zgy.ngrok.it-wpf.info';//设置默认的基本路径
// axios.defaults.baseURL = 'http://yfps.ngrok.it-wpf.info';//设置默认的基本路径


axios.interceptors.response.use((res)=>{
    // Indicator.close();//关闭提示
    if(res.status==200){
        if(res.headers.token){
            setCookie(TOKEN,res.headers.token,"0.5h");
        }
    }else if(res.status!=200){
        Toast({
            message: "服务器开小差了",
            iconClass: 'icon icon-success',
            duration: 2000
        });
    }
    return res.data;
});

axios.interceptors.request.use((config)=>{
    // Indicator.open();//请求提示
    let token = getCookie(TOKEN);//请求都要带浏览器token
    if(token!=null){
        config.headers['accessToken'] = token;
    }
    return config;
});


export let get = (url,data) => {
    console.log(data);
    if(data==undefined){
        return axios.get(url);
    }
    return axios.get(url+"?"+QS.stringify(data));
};

export let post = (url,data) =>{
    return axios.post(url,QS.stringify(data));
};
export let apost = (url,data,config) =>{
    return axios.post(url,data,config);
};
export let put = (url,data) =>{
    return axios.put(url,QS.stringify(data));
};

export let deleteData = (url) => {
    return axios.delete(url);
};

export let postFile = (url,data,config) =>{
    console.log("postFile start");
    onUploadProgress = (progressEvent)=>{
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
        console.log("上传中吗。。。。。。" + complete);
    };
    console.log("postFile end");
    return axios.post(url,data,config,onUploadProgress);
};

export let postF = (url,data,config,onUploadProgress) => {
    return axios({
        url,data,config,onUploadProgress,method: 'post'
    }).catch(function (error) {
        console.log(error);
        console.log(error.response);
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
};

