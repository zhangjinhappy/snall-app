<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <div class="header-header">
            <div class="sign-header">
                <div class="sign-left">
                    <img :src="R_parse_url.test(userInfo.customer.headimage)?userInfo.customer.headimage:'../../lib/public/images/tittle.png'" alt="333">
                    <div class="sign-center">
                        <p>Hi∽{{userInfo.customer.realname}} </p>
                        <p>你已经来到优合共<span class="find">{{day}}</span>天</p>
                    </div>
                </div>
                <div class="sign-right">
                    <img src="../../lib/public/images/buss.png" alt="..."><span>{{countIntegral}}积分</span>
                </div>
            </div>
            <!-- 弹框部分 -->
            <yd-popup v-model="show1" position="center" width="80%">
                <div style="background-color:#fff;" class="pop_img">
                    <img src="../../lib/public/images/r.png" alt="">
                    <h1 class="date1">每天签到领积分</h1>
                    <p class="date2">连续签到可以获得更多积分</p>
                    <div class="qian-body">
                        <div :class="{j:true,ac:obj.point==0 && key<3,active:obj.point!=0 && key<=3}" v-for="(obj,key) in checkInList" :key="key">
                            {{week[parseInt(obj.weekState)]}}
                            <h4 class="g" v-if="obj.point==0 && key<3">未签到</h4>
                            <h4 class="g" v-if="obj.point!=0 && key<=3">已签到</h4>
                            <h4 class="g" v-if="obj.point==0 && key>=3">+{{obj.toDayPoint}}</h4>
                        </div>
                        <!--
                            <div class="j ac">周一<h4 class="g">未签到</h4></div>
                            <div class="j active">周二<h4 class="g">已签到</h4></div>
                            <div class="j active">周三<h4 class="g">已签到</h4></div>
                            <div class="j active">周四<h4 class="g">已签到</h4></div>
                            <div class="j">周五<h4 class="g">+6</h4></div>
                            <div class="j">周六<h4 class="g">+7</h4></div>
                            <div class="j">周日<h4 class="g">+8</h4></div>
                            -->
                    </div>
                    <div class="btn3">
                        <input type="button" class="qdao" value="签到" @click="checkIn">
                    </div>
                </div>
            </yd-popup>
            <!-- 签到部分 -->
            <div class="header-body">
                <div class="body-header">
                    <div class="a">
                        <b>轻松签到,积分兑好礼</b>&nbsp;&nbsp;<span @click="show3 = !show3">?</span>
                    </div>
                    <i style="color:#cccccc">签到提醒</i>
                    <yd-switch v-model="switch1"></yd-switch>
                </div>
                <p class="word">连续签到不断签，获更多积分</p>
                <div class="xian">
                    <div class="time">
                        <div class="jin" v-for="(obj,key) in checkInList" :key="key">
                            <div class="click bg" v-if="obj.point!=0"></div>
                            <div class="click" v-else>+{{obj.toDayPoint}}</div>
                            <h6>{{new Date(obj.addtime).getMonth() + 1}}:{{new Date(obj.addtime).getDate()}}</h6>
                        </div>
                    </div>
                    <div class="l"></div>
                </div>
                <div class="btn">
                    <input type="button" class="qdao" v-if="checkInList.length != 0 && checkInList[3].point==0" value="签到" @click="checkIn">
                    <input type="button" class="qdaohuishe" v-else value="已签到">
                </div>
            </div>
        </div>
        <div class="center">
            <div class="sign-body">
                <h1>做任务赚积分</h1>
                <div class="sigin-a">
                    <div class="sigin-r">
                        <h2>邀请五人注册成为三星小伙伴</h2>
                        <p>奖励500积分</p>
                    </div>
                    <div class="sigin-l">
                        <span>继续完成</span>
                        <p class="f">已完成0/5</p>
                    </div>
                </div>
                <div class="sigin-a">
                    <div class="sigin-r">
                        <h2>升级成三星合伙人</h2>
                        <p>奖励500积分</p>
                    </div>
                    <div class="sigin-l">
                        <span>继续完成</span>
                        <p class="f"></p>
                    </div>
                </div>
                <div class="sigin-a">
                    <div class="sigin-r">
                        <h2>邀请10人注册会员</h2>
                        <p>奖励1000积分</p>
                    </div>
                    <div class="sigin-l" @click="fn1">
                        <span class="active">领取任务</span>
                        <p class="f"></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 签到成功的弹框 -->
        <div class="ceng" v-if="show2">
            <div class="line">
                <div style="background-color:#fff;" class="pop_img1">
                    <div class="img"></div>
                    <h1 class="date1">恭喜你签到成功，积分+{{checkInList[3].point}}</h1>
                    <p class="date2">连续签到可以获得更多积分</p>
                    <div class="btn3">
                        <yd-button @click.native.once="show2 = false" size="large" bgcolor="#1D75D6" color="#fff" class="btn12">签到完成</yd-button>
                    </div>
                </div>
            </div>
            <div class="close">
                <img src="../../lib/public/images/close.png" alt="2322" @click="show2=false">
            </div>
        </div>
        <!-- 签到规则 -->
        <div class="ceng" v-if="show3">
            <div class="line">
                <div style="background-color:#fff;" class="pop_img">
                    <div class="img4">签到规则</div>
                    <div class="img5">
                        <p class="p">1. 每7天为一个循环，第一天+5积分，以后每天多+1积分，最多连续签到7天；</p>
                        <p class="p">2. 断签则从第一天开始重新计算；</p>
                        <p class="p">3. 签到获得的积分可兑换礼品</p>
                    </div>
                    <div class="btn3">
                        <yd-button @click.native="show3 = false" size="large" bgcolor="#1D75D6" color="#fff" class="btn12">知道了</yd-button>
                    </div>
                </div>
            </div>
            <div class="close">
                <img src="../../lib/public/images/close.png" alt="2322" @click="show3=false">
            </div>
        </div>
    </div>
</template>
<script>
    import {
        week
    } from "../../util/week";
    import {
        R_parse_url
    } from '../../util/Regular'
    import {
        USERINFO
    } from '../../store/types'
    export default {
        data() {
            return {
                chang: "每日签到",
                switch1: false,
                show1: false,
                show2: false,
                show3: false,
                day: 0,
                countIntegral: 0,
                checkInList: [],
                week: week,
                R_parse_url
            }
        },
        beforeCreate() {},
        created() {
            this.init();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false;
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next()
        },
        methods: {
            async init() {
                this.userInfo = JSON.parse(this.$store.state[USERINFO]);
                console.log("userInfo" + this.$store.state[USERINFO]);
                let data = await this.$axios.get("/custpointdetail/getSignDay");
                console.log("sign");
                console.log(data);
                if (data.state == "00") {
                    this.day = data.data.day;
                    this.countIntegral = data.data.countIntegral;
                    this.checkInList = data.data.list;
                }
                if (this.checkInList[3].point > 0) { //判断今天是否签到
                    this.show1 = false;
                } else {
                    this.show1 = true;
                }
                console.log(this.show1);
                console.log("sign init end");
            },
            async checkIn() {
                let res = await this.$axios.put("/custpointdetail/signIn", {});
                console.log(res);
                console.log(res.state == "00");
                if (res.state == "00") {
                    this.show1 = false;
                    this.show2 = true;
                    console.log(this.show1);
                    this.checkInList[3].point = this.checkInList[3].toDayPoint;
                }
            },
            fn() {
                this.point = this.point + 1;
                return this.point;
            },
            fn1() {
                this.show1 = !this.show1;
                console.log(this.show1);
            }
        },
        components: {}
    }
</script>
<style scoped>
    .center {
        padding-left: 8px;
        padding-right: 8px
    }
    .bill-content {
        background-color: #fff
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .sign-header {
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        height: 111px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #3E91ED;
    }
    .find {
        color: #F5B112
    }
    .sign-center {
        padding-left: 10px;
    }
    .sign-center p {
        color: #F4F8FD;
        font-size: 15px;
    }
    .sign-left {
        display: flex;
        align-items: center;
    }
    .sign-left>img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .sign-right img {
        vertical-align: bottom;
        padding-right: 8px;
        width: 35px;
    }
    .sign-right span {
        color: #fff;
        font-size: 15px;
        padding-right: 10px;
    }
    .sigin-l span {
        display: inline-block;
        width: 80px;
        height: 28px;
        font-size: 12px;
        border: 1px solid #979797;
        border-radius: 14px;
        text-align: center;
        line-height: 28px;
    }
    .qdao {
        width: 100%;
        height: 40px;
        background-color: #3E91ED;
        border-radius: 17px;
        color: #fff;
    }
    .qdaohuishe {
        width: 100%;
        height: 40px;
        background-color: #cccccc;
        border-radius: 17px;
        color: #fff;
    }
    .pop_img {
        width: 100%;
        height: 323px;
        border-radius: 5px;
    }
    .pop_img1 {
        width: 100%;
        height: 373px;
        border-radius: 16px;
    }
    .img {
        width: 100%;
        height: 200px;
        background-image: url(../../lib/public/images/qd.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }
    .pop_img img {
        width: 100%;
        height: 118px;
    }
    .btn12 {
        border-radius: 16px;
    }
    .g {
        font-size: 12px;
        font-weight: 400
    }
    .pop_img .j {
        width: 41px;
        height: 41px;
        font-size: 12px;
        text-align: center;
        border: 1px solid #cccccc
    }
    .ac {
        background-color: #eee;
        color: #ccc;
    }
    .date1 {
        margin-top: 10px;
        height: 22px;
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #333333
    }
    .date2 {
        text-align: center;
        margin-bottom: 10px;
    }
    .header-body {
        padding-top: 14px;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 10px;
        box-shadow: 0 2px 4px 0;
        height: 199px;
        width: 84%;
        background-color: #fff;
        position: absolute;
        top: 29%;
        left: 8%;
    }
    .header-header {
        height: 300px;
        width: 100%;
        position: relative;
    }
    .word {
        padding-top: 2px;
        padding-left: 3px;
        font-size: 13px;
        padding-bottom: 10px;
    }
    .body-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .a b {
        font-size: 15px;
        color: #333333;
    }
    .a span {
        display: inline-block;
        border: 1px solid #cccccc;
        border-radius: 50%;
        color: #ccc;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
    }
    .a i {
        font-size: 13px;
        color: #999999;
    }
    .btn {
        padding-right: 30px;
        padding-left: 30px;
        margin-top: 10px;
    }
    .sign-body {
        padding-left: 10px;
    }
    .sign-body h1 {
        height: 40px;
        width: 100%;
        font-size: 15px;
        color: #333333;
        text-align: left;
        line-height: 40px;
        padding-left: 10px;
        border-bottom: 1px solid #ccc;
    }
    .sigin-a {
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
    }
    .sigin-r h2 {
        font-size: 15px;
        font-weight: 400;
        color: #333333;
    }
    .sigin-r p {
        padding-top: 8px;
    }
    .f {
        padding-left: 12px;
        font-size: 12px;
    }
    .active {
        background-color: #1D75D6;
        color: #fff;
    }
    .qian-body {
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .btn3 {
        padding: 20px;
    }
    .img4 {
        width: 100%;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 20px;
        font-weight: 700;
    }
    .img5 {
        width: 80%;
        margin: 0 auto;
    }
    .p {
        padding-top: 10px;
    }
    .xian {
        padding-top: 20px;
        padding-left: 5px;
        width: 90%;
        margin: 0px auto;
        height: 50px;
        position: relative;
    }
    .l {
        height: 1px;
        background-color: #ccc;
        margin-left: 10px;
        width: 80%;
        height: 1px;
    }
    .time {
        position: absolute;
        top: 5px;
        left: 9px;
        width: 90%;
        margin: 0px auto;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .click {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        background-color: #ccc;
        line-height: 25px;
        text-align: center;
        color: #fff;
        font-size: 13px;
    }
    .bg {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        background-image: url(../../lib/public/images/qiandao.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }
    .time h6 {
        padding-top: 10px;
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
</style>

