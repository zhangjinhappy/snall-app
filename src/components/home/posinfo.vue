<template>
    <div class="posinfo">
        <!-- 头部 -->
        <div class="posinfo_header">
            <!-- <h1>免费领取</h1><br> -->
            <img v-lazy="'../../lib/public/images/pos1.png'" alt="1234">
            <img v-lazy="'../../lib/public/images/pos2.png'" alt="1234">
            <img v-lazy="'../../lib/public/images/pos3.png'" alt="1234">
            <img v-lazy="'../../lib/public/images/pos4.png'" alt="1234">
        </div>
        <yd-button size="large" type="danger" @click.native="getPos" id="btn" v-if="isShowGetPos">免费获取</yd-button>
        <!-- 实名认证弹框 -->
         <div class= "ceng" v-if="show4" >
            <div class="line">
                <div class="ba">
                <div class="su">
                     <h1>提示</h1>
                    <img v-lazy="'../../lib/public/images/sa.png'" alt="222">
                    <br>
                    <h2> 你尚未完成实名认证，请先进行</h2><br>
                    <h2>实名认证</h2>
                    <div class="btn">
                        <yd-button size="large" type="danger" @click.native="toastNone" bgcolor="#1D75D6" color="#fff">实名认证</yd-button>
                    </div>
                </div>
            </div>
            </div>
            <div class="close">
                <img src="../../lib/public/images/close.png" alt="2322" @click="show4=false">
            </div>
        </div>
        <!-- 开通会员弹框 -->
         <div class="ceng" v-if="show2">
            <div class="line">
                <div class="img2">
                    <div class="btn1">
                        <div class="money">
                            <div class="z">每年最多可赚30万元</div>
                        </div>
                        <div class="bt1" @click="vip1">开通会员</div>
                    </div>
                </div>
            </div>
            <div class="close">
                <img src="../../lib/public/images/close.png" alt="2322" @click="show2=false">
            </div>
        </div>
    </div>
</template>
<script>
    import {
        USERINFO
    } from "../../store/types"
    export default {
        data() {
            return {
                show2: false,
                show4: false,
                isShowGetPos: true
            }
        },
        created() {
            this.init();

        },
        methods: {
             vip() {
                this.$router.push({
                    name: "member"
                })
            },
            getPos() {
                if (this.data.customer.levelvalue == 0) {
                    //没有交钱升级
                    this.show2 = true;
                    return;
                }
                if (this.data.customer.realnamestate != 2) { //判断实名是否通过
                    //不通过
                    this.show1 = true;
                    return;
                }
                this.$router.push({
                    name: "order"
                }); //去领取pos页面
            },
            toastNone() {
                this.$router.push({
                    name: "certification"
                }) //去实名页面
            },
            vip1() {
                console.log("posinfo vip start");
                this.$router.push({
                    name: "vip"
                }) //去开通会员
            },
            async init() {
                console.log("posinfo init start");
                this.data = JSON.parse(this.$store.state[USERINFO]);
                let res = await this.$axios.get("/posreceive");
                if (res.state == "00") {
                    this.isShowGetPos = false;
                }
                console.log("posinfo init end");
            }
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
        }
    }
</script>
<style scoped>
    .posinfo_header {
        width: 100%;
        height: 25.8rem;
        background: url("../../lib/public/images/bjing.png") center 0 #385bf5;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .posinfo_header h1 {
        color: #fff;
    }
    .posinfo_header img {
        width: 100%;
    }
    #btn {
        position: fixed;
        bottom: 2px;
    }
    .su {
        height: 270px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .su h1{
        text-align: center;
        font-size: 16px;
        height: 29px;
        line-height: 30px;
    }
    .ba{
      background-color:#fff;
      border-radius: 10px;
    }
    .su img {
        width: 90px;
    }
    h2 {
        text-align: center;
    }
    .btn {
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
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
     .ceng{
        width: 100%;
        height: 100%;
        z-index: 1500;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
    }
    .line{
        width: 69%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .close{
        height: 50px;
        position: absolute;
        left: 50%;
        bottom: 9%;
        transform: translate(-50%,-50%);
    }
</style>


