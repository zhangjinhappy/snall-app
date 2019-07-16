// 移动端点击事件3000ms 的延迟。
//导入vue
import Vue from "../node_modules/vue/dist/vue.js"
//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);
// 导入MUI
import './lib/mui/css/app.css'
// import './lib/mui/css/layui.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/mui.picker.css'
import './lib/mui/css/icons-extra.css'
//导入yunDUi
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.px.css';
import 'vue-ydui/dist/ydui.base.css';
Vue.use(YDUI);
import {DateTime} from 'vue-ydui/dist/lib.px/datetime'
import {CheckList, CheckListItem} from 'vue-ydui/dist/lib.px/checklist'
Vue.component(DateTime.name, DateTime);
Vue.component(CheckList.name, CheckList);
Vue.component(CheckListItem.name, CheckListItem);

// 导入路由 包,
import VueRouter from 'vue-router'
// 手动安装VueRouter
Vue.use(VueRouter);
// //导入MintUi
 import MintUI from 'mint-ui'
// //导入MintUI的样式
 import 'mint-ui/lib/style.css'
 Vue.use(MintUI);
//引入Vue懒加载图片
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);
Vue.use(VueLazyload,{
    error:"./lib/public/images/fenxiangWenAn.png",
    loading:"./lib/public/images/loading.gif",
});
//跨域问题npm 
// import VueJsonp from 'vue-jsonp'
// Vue.use(VueJsonp)
//导入vuex的包
import Vuex from 'vuex'
Vue.use(Vuex);

import store from './store/store'
import * as axios from '../src/api/indexapi';

Vue.prototype.$axios = axios;

import app from './App.vue'

import router from './router.js'
//导入格式化时间
// import moment from 'moment'
// // 全局过滤器
// Vue.filter("timename", function(str,ptn="YYYY-MM-DD HH:mm:ss"){
//  return moment(str).format(ptn)  
// });
//全局的前面请求的域名
//  Vue.http.options.root='http://yfps.ngrok.it-wpf.info'
//  Vue.http.options.emulateJSON=true

var vm= new Vue({
    el:"#app",
    render:c=>c(app),
    router,
    store,
    data:{
        eventHub:new Vue()   // 在main.js设置所有组件都能用调用
     },
});