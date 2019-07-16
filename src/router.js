import store from './store/store'
import * as types from './store/types'

import VueRouter from 'vue-router'
//导入底部工具栏组件路由
const home = () => import('./components/footer/home.vue');
// home里面的
const posinfo = () => import('./components/home/posinfo.vue');
const shanghu = () => import('./components/home/shanghu.vue');
const active = () => import('./components/shanghu/active.vue');
const orderinfo = () => import('./components/shanghu/orderinfo.vue');
//提额系统
import mainsystem from './components/moneysystem/mainsystem.vue'
import cardsystem from './components/moneysystem/cardsystem.vue'
import plansystem from './components/moneysystem/plansystem.vue'
import mapsystem from './components/moneysystem/mapsystem.vue'
//积分商城
const crule = () => import('./components/score/rule.vue');
const exchange = () => import('./components/score/exchange.vue');
const date = () => import('./components/score/date.vue');
import score from './components/home/score.vue'
import goodcar from './components/score/goodcar.vue'
import dateinfo from './components/score/dateinfo.vue'
import team from './components/home/team.vue'
//bill里面的
import bill from './components/footer/bill.vue'
import recode from './components/subcomponents/recode.vue'
import tixian from './components/subcomponents/tixian.vue'
import torder from './components/subcomponents/torder.vue'
// 我的里的
import mine from './components/footer/mine.vue'
import certification from './components/mine/certification.vue'
import profit from './components/mine/profit.vue'
import base from './components/mine/base.vue'
import banklist from './components/subcomponents/banklist.vue'
import fenxi from './components/mine/fenxi.vue'
import fenxi1 from './components/mine/fenxi1.vue'
import fenxi2 from './components/mine/fenxi2.vue'
import coupon from './components/mine/coupon.vue'
import rate from './components/mine/rate.vue'
import judge from './components/mine/judge.vue'
import setting from './components/mine/setting.vue'
import base1 from './components/mine/base1.vue'
import mycard from './components/mine/mycard.vue'
// 分享里的
import share from './components/footer/share.vue'
import face from './components/share/face.vue'
import face1 from './components/share/face1.vue'
import face2 from './components/share/face2.vue'
import sao from './components/share/sao.vue'
import sao1 from './components/share/sao1.vue'
import sao2 from './components/share/sao2.vue'
//import shareword from './components/share/shareword.vue'
// 登录及注册
import login from './components/public/login.vue'
import server from './components/public/server.vue'
import phonelogin from './components/public/phonelogin.vue'
import phonelogin1 from './components/public/phonelogin1.vue'
import login1 from './components/public/login1.vue'
// import regisrer from './components/public/regisrer.vue'
//import regisrer1 from './components/public/regisrer1.vue'
import wpsw from './components/public/wpsw.vue'
import wpsw1 from './components/public/wpsw1.vue'
import wpsw2 from './components/public/wpsw2.vue'

// 每日里面的
import sign from './components/date/sign.vue'
//测试
import test2 from './components/zhangjin/test2.vue'

//订单里的
import order from './components/order/order.vue'
import addcontrol from './components/order/addcontrol.vue'

import order1 from './components/order/order1.vue'
import address from './components/order/address.vue'
import ordersuccess from './components/order/ordersuccess.vue'
import userbill from './components/userbill/userbill.vue'
import userbill1 from './components/userbill/userbill1.vue'
import userbill2 from './components/userbill/userbill2.vue'
import orderfollow from './components/userbill/orderfollow.vue'
import ordercomment from './components/userbill/ordercomment.vue'
//会员专区
const match = () => import('./components/VIP/match.vue');
const card = () => import('./components/VIP/QQcard.vue');
import vip from './components/VIP/vip.vue'
import vip1 from './components/VIP/vip1.vue'
import vip2 from './components/VIP/vip2.vue'
import vip3 from './components/VIP/vip3.vue'
import vip4 from './components/VIP/vip4.vue'
import vip5 from './components/VIP/vip5.vue'
import vip6 from './components/VIP/vip6.vue'
import member from './components/VIP/member.vue'
import member1 from './components/VIP/member1.vue'

//
import {getCookie} from './util/CookieUtils';
import * as axios from '../src/api/indexapi';
import {Toast} from 'mint-ui';
import {isNull} from './util/Is.js'
let isLogin = false;//页面登录访问设置
let isRealName = true;//页面实名访问设置
let isOnPos = true;//页面领取pos机访问设置
let keepAlive = false;//页面是否缓存 //false是缓存!!!!!!重要！！！！！！


//创建路由对象
var router = new VueRouter({
    routes: [
        // 重定向
        {path: '/', redirect: '/home'},
        // home里的内容
        {path: '/home', component: home, name: 'home', meta: {isLogin: isLogin}},//首页注册就能进入
        {path: '/home/posinfo', component: posinfo, name: 'posinfo', meta: {isLogin: isLogin}},//pos机免费领取页面
        {path: '/home/shanghu', component: shanghu, name: 'shanghu', meta: {isLogin: isLogin,isRealName:isRealName,isOnPos:isOnPos}},//商户收款页面
        {path: '/home/shanghu/active', component: active, name: 'active', meta: {isLogin: isLogin}},//选择商户里的页面
        {path: '/home/shanghu/orderinfo', component: orderinfo, name: 'orderinfo',meta: {isLogin: isLogin,isRealName:isRealName,isOnPos:isOnPos}},//商户账单里面的页面
        //积分商城
        {path: '/exchange', component: exchange, name: 'exchange', meta: {isLogin: isLogin}},
        {path: '/home/score', component: score, name: 'score', meta: {isLogin: isLogin}},//积分商城页面
        {path: '/goodcar', component: goodcar, name: 'goodcar', meta: {isLogin: isLogin}},//购物车
        {path: '/home/score/date', component: date, name: 'date', meta: {isLogin: isLogin}},//生活日用页面
        {path: '/home/score/date/dateinfo', component: dateinfo, name: 'dateinfo'},//生活日用品的详情页面
        {path: '/crule', component: crule, name: 'crule', meta: {isLogin: isLogin}},//积分商城规则制度
        {path: '/home/team', component: team, name: 'team', meta: {isLogin: isLogin}},//我的团队页面
        //提额系统
        {path: '/mainsystem', component: mainsystem, name: 'mainsystem', meta: {isLogin: isLogin}},
        {path: '/cardsystem', component: cardsystem, name: 'cardsystem', meta: {isLogin: isLogin}},
        {path: '/plansystem', component: plansystem, name: 'plansystem', meta: {isLogin: isLogin}},
        {path: '/mapsystem', component: mapsystem, name: 'mapsystem', meta: {isLogin: isLogin}},
        // 账单及账单详情页及地址
        {path: '/recode', component: recode, name: 'recode', meta: {isLogin: isLogin}},//提现记录
        {path: '/tixian', component: tixian, name: 'tixian', meta: {isLogin: isLogin}},//提现成功页面
        {path: '/torder', component: torder, name: 'torder', meta: {isLogin: isLogin}},//提现输入密码页面
        {path: '/bill', component: bill, name: 'bill', meta: {isLogin: isLogin}},//账单页面
        {path: '/userbill', component: userbill, name: 'userbill', meta: {isLogin: isLogin}},//订单处理页面
        {path: '/userbill1', component: userbill1, name: 'userbill1', meta: {isLogin: isLogin}},//交易成功页面
        {path: '/userbill2', component: userbill2, name: 'userbill2', meta: {isLogin: isLogin}},//交易订单已签收页面
        {path: '/orderfollow', component: orderfollow, name: 'orderfollow', meta: {isLogin: isLogin}},//交易订单已签收页面
        {path: '/ordercomment', component: ordercomment, name: 'ordercomment', meta: {isLogin: isLogin}},//客户订单评价页面
        {path: '/order', component: order, name: 'order', meta: {isLogin: isLogin}},//确认订单页面
        {path: '/addcontrol', component: addcontrol, name: 'addcontrol', meta: {isLogin: isLogin}},//增加地址页面
        {path: '/order1', component: order1, name: 'order1', meta: {isLogin: isLogin}},//确认订单付款页面
        {path: '/address/:did', component: address, name: 'address', meta: {isLogin: isLogin}},//填写地址
        {path: '/ordersuccess', component: ordersuccess, name: 'ordersuccess', meta: {isLogin: isLogin}},//支付成功页面
        //  分享里的内容
        {path: '/share/face', component: face, name: 'face', meta: {isLogin: isLogin}},//面对面注册
        {path: '/share/face1/:phonenumber', component: face1, name: 'face1'},//既享注册
        {path: '/share/face2', component: face2, name: 'face2', meta: {isLogin: isLogin}},//分享图文库
        {path: '/share', component: share, name: 'share', meta: {isLogin: isLogin}},//分享页面
        // {path: '/share/shareword', component: shareword, name: 'shareword'},//分享文档
        {path: '/share/sao', component: sao, name: 'sao'},//扫二维码页面
        {path: '/share/sao1', component: sao1, name: 'sao1'},//扫二维码页面
        {path: '/share/sao2', component: sao2, name: 'sao2'},//扫二维码页面
        {path: '/banklist', component: banklist, name: 'banklist', meta: {isLogin: isLogin,keepAlive:keepAlive}},//支行列表
        //我的内容里面
        {path: '/mine', component: mine, name: 'mine', meta: {isLogin: isLogin}},//我的页面
        {path: '/setting', component: setting, name: 'setting', meta: {isLogin: isLogin}},
        {path: '/mine/certification', component: certification, name: 'certification', meta: {isLogin: isLogin}},//实名认证
        {path: '/mine/base', component: base, name: 'base', meta: {isLogin: isLogin,keepAlive:keepAlive}},//实名认证下基本信息的填写
        {path: '/mine/base1', component: base1, name: 'base1', meta: {isLogin: isLogin}},//客户填写好的基本信息的展示页面
        {path: '/mine/judge', component: judge, name: 'judge', meta: {isLogin: isLogin}},//扫脸认证
        {path: '/mine/profit', component: profit, name: 'profit', meta: {isLogin: isLogin}},//我的收益
        {path: '/mine/rate', component: rate, name: 'rate', meta: {isLogin: isLogin}},//我的费率
        //{path: '/mine/fenrui', component: fenrui, name: 'fenrui', meta: {isLogin: false}},//分润提现
        {path: '/mine/fenxi', component: fenxi, name: 'fenxi', meta: {isLogin: isLogin}},//分润明细
        {path: '/mine/fenxi1', component: fenxi1, name: 'fenxi1', meta: {isLogin: isLogin}},//分润明细筛选
        {path: '/mine/fenxi2', component: fenxi2, name: 'fenxi2', meta: {isLogin: isLogin}},//分润明细到账收款
        {path: '/mine/coupon', component: coupon, name: 'coupon', meta: {isLogin: isLogin,isRealName:isRealName,isOnPos:isOnPos}},//我的优惠卷
        {path: '/mine/mycard', component: mycard, name: 'mycard', meta: {isLogin: isLogin,isRealName:isRealName}},//我的结算卡
        // 每日里面
        {path: '/home/sign', component: sign, name: 'sign', meta: {isLogin: isLogin}},//每日签到
        // 会员专区
        {path: '/vip', component: vip, name: 'vip', meta: {isLogin: isLogin}},//开通会员之前的页面
        {path: '/vip1', component: vip1, name: 'vip1'},//（卡农）特权详情
        {path: '/match', component:match, name: 'match'},//智能匹配商户养卡系统
        {path: '/card', component: card, name: 'card'},//腾讯乐刷M60养卡大机
        {path: '/vip2', component: vip2, name: 'vip2'},//升级卡王级别会员详情
        {path: '/vip3', component: vip3, name: 'vip3'},//升级卡神别会员详情
        {path: '/vip4', component: vip4, name: 'vip4'},//升级卡农级别
        {path: '/vip5', component: vip5, name: 'vip5'},//升级卡王会员页面
        {path: '/vip6', component: vip6, name: 'vip6'},//升级卡神会员页面
        {path: '/member', component: member, name: 'member', meta: {isLogin: isLogin}},//开通会员
        {path: '/member1', component: member1, name: 'member1'},//会员权益
        // 登录注册
         {path: '/test2', component: test2, name: 'test2'},//测试用的
        {path: '/login', component: login, name: 'login'},//密码登录页面
        {path: '/server', component: server, name: 'server'},//合同规则
        {path: '/wpsw', component: wpsw, name: 'wpsw'},//找回密码
        {path: '/wpsw1', component: wpsw1, name: 'wpsw1'},//找回密码
        {path: '/wpsw2', component: wpsw2, name: 'wpsw2', meta: {isLogin: isLogin}},//修改密码
        {path: '/phonelogin', component: phonelogin, name: 'phonelogin'},//手机短信登录页面
        {path: '/phonelogin1', component: phonelogin1, name: 'phonelogin1'},//手机一建注册
        {path: '/login1', component: login1, name: 'login1'},//选择三个登录页面
        // {path: '/regisrer', component: regisrer, name: 'regisrer'},//注册
        // {path: '/regisrer1', component: regisrer1, name: 'regisrer1'}//分享里的注册
    ],
    linkActiveClass: "mui-active"
});
//路由要做判断，有些要登录才能访问，有些要实名才能访问，有些充值为会员才能访问

router.beforeEach((to, from, next) => {
    console.log(from);
    // console.log("⭐" +(to.meta.keepAlive?"不缓存":"缓存"));//false是缓存!!!!!!重要！！！！！！
    let token = getCookie(types.TOKEN);//获取浏览器token
    if(to.path=="/home" && !isNull(token)){
        store.commit(types.TOKEN, token);
        next();
        return;
    }
    if (to.meta.isLogin && Object.keys(store.state[types.USERINFO]).length==0) {//判断页面是否需要登录和是否已经登录
        next({
            path: '/login1',
            query: {redirect: to.fullPath}
        })
    } else {
        if(to.meta.isRealName && Object.keys(store.state[types.USERINFO]).length>0){//判断是否需要用户实名才能使用的页面
            let u =  JSON.parse(store.state[types.USERINFO]);
            if(u.customer.realnamestate==0){
                Toast({
                    message: "你需要先实名才能使用此页面",
                    duration: 2000
                });
                return;
            }
        }
        if(to.meta.isOnPos && Object.keys(store.state[types.USERINFO]).length>0){
            if(isNull(store.state[types.CUSTOMERNO])){//判断是否有小商户号
                axios.get("/custrouting").then(function(res){
                    if(res.state!="00" && res.thirdnumber==null){
                        Toast({
                            message: "你需要先领取pos机才能使用此页面",
                            duration: 2000
                        });
                    }else{//缓存一下小商户号
                        store.commit(types.CUSTOMERNO,res.thirdnumber);
                    }
                });
            }else{
                next();
            }
        }else{
            next();
        }
    }
});
export default router