<template>
    <div class="home_content">
        <!-- 九宫格区域 -->
        <div class="home_body">
            <div class="header-body">
                <div class="header-nav">
                    <!-- <h1>首页</h1> -->
                    <yd-navbar title="首页" bgcolor="rgba(0,0,0,0)" color="#fff" border-color="rgba(0,0,0,0)">
                        <router-link to="" slot="right">
                            <img src="../../lib/public/images/kefu.png" alt="123" @click="telcall" width="25" height="25">
                        </router-link>
                    </yd-navbar>
                </div>
                <ul class="mui-table-view mui-grid-view mui-grid-9 img">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/posinfo">
                            <img v-lazy="'../../lib/public/images/me1.png'" alt="加载中">
                            <div class="mui-media-body" style="color:#fff">赠送POS机</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/mainsystem">
                            <img v-lazy="'../../lib/public/images/me2.png'" alt="加载中">
                            <div class="mui-media-body " style="color:#fff">提额系统</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/score">
                            <img v-lazy="'../../lib/public/images/me3.png'" alt="加载中">
                            <div class="mui-media-body" style="color:#fff">积分商城</div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="center">
                <ul class="mui-table-view mui-grid-view mui-grid-9 img1">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 bg1">
                        <router-link to="/home/shanghu">
                            <img v-lazy="'../../lib/public/images/me4.png'" alt="加载中">
                            <div class="mui-media-body">我要收款</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/team">
                            <img v-lazy="'../../lib/public/images/me.png'" alt="加载中">
                            <div class="mui-media-body">我的团队</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/mine/profit">
                            <img v-lazy="'../../lib/public/images/woYaoZhuanQian.png'" alt="加载中">
                            <div class="mui-media-body">我的收入</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/sign">
                            <img v-lazy="'../../lib/public/images/me7.png'" alt="加载中">
                            <div class="mui-media-body">每日任务</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <img v-lazy="'../../lib/public/images/me6.png'" alt="加载中">
                            <div class="mui-media-body">我要办卡</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <img v-lazy="'../../lib/public/images/me8.png'" alt="加载中">
                            <div class="mui-media-body">我要贷款</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 轮播图区域 -->
        <slider></slider>
        <!-- 会员弹框 -->
        <div class="ceng" v-if="show1">
            <div class="line">
                <div class="img2">
                    <div class="btn1">
                        <div class="money">
                            <div class="z">每年最多可赚30万元</div>
                        </div>
                        <div class="bt1" @click="vip">开通会员</div>
                    </div>
                </div>
            </div>
            <div class="close">
                <img src="../../lib/public/images/close.png" alt="2322" @click="show1=false">
            </div>
        </div>
        <!-- 客服弹框 -->
        <yd-popup v-model="show3" position="center" width="45%">
            <div class="ser-person">
                <h1 class="phone">400&nbsp;&nbsp;666&nbsp;&nbsp;3958</h1>
                <div class="ser-footer">
                    <div class="ser-l" @click="noser">取消</div>
                    <a href="tel:4006663958" class="ser-r">呼叫</a>
                </div>
            </div>
        </yd-popup>
    </div>
</template>

<script>
    import slider from '../subcomponents/slider.vue'
    import {
        getCookie
    } from '../../util/CookieUtils';
    import {
        TOKEN
    } from "../../store/types";
    import {
        USERINFO
    } from '../../store/types'
    import {
        isNull
    } from '../../util/Is';
    export default {
        data() {
            return {
                nlist: [],
                show1: false,
                show3: false
            }
        },
        created() {
            this.init();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu = false;
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showmenu = false;
            next()
        },
        methods: {
            noser() {
                this.show3 = false
            },
            async init() {
                console.log("home init start");
                if (isNull(this.$store.state[USERINFO]) || Object.keys(this.$store.state[USERINFO]).length == 0) { //判断是否有用户信息
                    let data = await this.$axios.get("/customer");
                    this.$store.commit(USERINFO, JSON.stringify(data.data));
                    if (data.data.customer.openid == null) {
                        console.log("openid == null");
                        let redirect_uri = "http://yf.zhejiangyouhe.com/wx/getToken"; //更新用户token地址
                        let token = getCookie(TOKEN); //获取浏览器token
                        let state = {
                            "token": token
                        };
                        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7851029a77b2f1ed&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=' + JSON.stringify(state) + '#wechat_redirect';
                        window.location.href = url;
                    }
                    this.member();
                }
                console.log("home init end");
            },
            member() {
                console.log("honme member start");
                console.log(this.$store.state[USERINFO]);
                let userInfo = JSON.parse(this.$store.state[USERINFO]);
                if (userInfo.customer.levelvalue < 1) {
                    this.show1 = true
                }
                console.log("home member end");
            },
            vip() {
                this.$router.push({
                    name: "member"
                })
            },
            telcall() {
                this.show3 = true;
                // window.location.href = "tel://4006663958";
            }
        },
        components: {
            slider
        }
    }
</script>
<style scoped>
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border-right: 0px solid #eee;
        border-bottom: 0px solid #eee
    }
    a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }
    ul {
        padding-left: 10px;
        background-color: #fff;
    }
    li {
        width: 30%;
    }
    .center {
        background-color: #fff;
    }
    .img {
        margin-bottom: 24px;
    }
    .yd-navbar {
        padding-right: 12px;
    }
    .header-body {
        height: 185px;
        width: 100%;
        background-image: url(../../lib/public/images/me5.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }
    .header-nav {
        height: 40px;
        width: 100%;
    }
    .header-nav h1 {
        color: #fff;
        font-size: 16px;
        font-weight: 400
    }
    .mui-grid-view.mui-grid-9 {
        background-color: rgba(0, 0, 0, 0);
        border-top: 0px solid #eee;
        border-left: 0px solid #eee;
    }
    .mui-table-view {
        background-color: rgba(0, 0, 0, 0)
    }
    ul[data-v-7416bd73] {
        background-color: rgba(0, 0, 0, 0)
    }
    .img img {
        width: 50px;
        height: 50px;
    }
    .img1 {
        background-color: #fff;
    }
    .img1 img {
        width: 40px;
        height: 40px;
    }
    .img2 {
        width: 100%;
        height: 300px;
        background-image: url(../../lib/public/images/member.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }
    .img2 img {
        width: 80%;
    }
    .btn1 {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 203px;
    }
    .money {
        width: 100%;
        height: 35px;
    }
    .z {
        margin: 0 auto;
        width: 60%;
        border-radius: 10px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #FFC471;
        color: #773719;
        font-size: 12px;
    }
    .bt1 {
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 18px;
        border-radius: 22px;
        color: #eee;
        box-shadow: 0px 2px 7px 1px #971203;
        background: -webkit-linear-gradient(#ff8049, #c81904);
        background: -o-linear-gradient(#ff8049, #c81904);
        background: -moz-linear-gradient(#ff8049, #c81904);
        background: linear-gradient(#ff8049, #c81904);
    }
    .mui-col-xs-4 {
        width: 33.33333333%;
    }
    .ceng {
        width: 100%;
        height: 100%;
        z-index: 1500;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
    }
    .line {
        width: 69%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .close {
        height: 50px;
        position: absolute;
        left: 50%;
        bottom: 9%;
        transform: translate(-50%, -50%);
    }
    .ser-person {
        width: 100%;
        height: 112px;
        background-color: #fff;
        border-radius: 10px;
    }
    .phone {
        width: 100%;
        height: 70px;
        font-size: 18px;
        color: #333333;
        text-align: center;
        line-height: 70px;
    }
    .ser-footer {
        display: flex
    }
    .ser-l,
    .ser-r {
        display: block;
        height: 40px;
        width: 50%;
        line-height: 40px;
        font-size: 15px;
        color: #333333;
        text-align: center;
    }
    .ser-r {
        border-top: 1px solid #979797;
        color: #1D75D6;
        border-radius: 0 0 10px 0;
    }
    .ser-l {
        border-top: 1px solid #979797;
        border-right: 1px solid #979797;
        border-radius: 0 0 0 10px;
    }
    .ceng {
        width: 100%;
        height: 100%;
        z-index: 1500;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
    }
</style>

