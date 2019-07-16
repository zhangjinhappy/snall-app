<template>
    <div class="bill-content">
        <yd-navbar :title="chang">
            <a href="#/home" slot="left" @click="goBack()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </a>
        </yd-navbar>
        <img src="../../lib/public/images/shop.png" alt="1234" width="100%">
        <div class="center" style="margin-bottom: 5px">
            <p class="title">创意小夜灯充电池卧室床头婴儿喂奶用护眼暖光夜光台灯可调节亮度</p>
            <div class="pice">
                <span class="word">¥<span class="word1">49</span> + 3000积分</span> &nbsp;&nbsp;&nbsp;<del class="word2">￥53</del>
            </div>
        </div>
        <div class="center">
            <div class="center-contect">
                <span class="base">规格</span>
                <div class="color" @click="color">请选择&nbsp;&nbsp;颜色</div>
                <p class="sb"><img src="../../lib/public/images/left.png" alt="234" width="30" height="30"></p>
            </div>
        </div>
        <br>
        <div class="center">
            <div class="center-contect">
                <span class="base">送至</span>
                <div class="color" style="width:60%" @click="goaddress">你还未填写收货信息，马上去填写</div>
                <p class="sb"><img src="../../lib/public/images/left.png" alt="234" width="30" height="30"></p>
            </div>
        </div>
        <!-- 地址写在这里 -->
        <!-- <p class="ad">安徽省合肥市经开区尚泽大楼444号楼</p> -->
        <div class="center">
            <div class="center-contect" style="height:50px">
                <span class="base">运费</span>
                <div class="color">包邮</div>
                <p class="sb"></p>
            </div>
        </div>
        <div class="body-content">
            <h1 class="shop1">商品详情</h1>
            <img src="" alt="">
        </div>
        <div class="btn-footer">
            <div class="goodcar">
                <a class="car" @click="goodcar()">
                    <span class="mui-icon-extra mui-icon-extra-cart"></span>
                    <span class="mui-badge mui-badge-danger number">5</span>
                </a>
            </div>
            <div class="goodcenter">加入购车</div>
            <div class="chang">立即兑换</div>
        </div>
        <!-- 弹层 -->
        <yd-popup v-model="show2" position="bottom" height="40%">
            <div class="body">
                <div class="body-header">
                    <img src="../../lib/public/images/shop1.png" alt="11" class="image1">
                    <div class="pop-right">
                        <div class="score">￥<i>49</i>+3000积分</div>
                        <del>￥53</del>
                    </div>
                </div>
                <div class="body-footer">
                    <p>选择颜色&nbsp;:</p>
                    <div class="btn39">
                        <div class="btn2 c">白色款</div>
                        <div class="btn2 ">黄色款</div>
                        <div class="btn2 ">粉色款</div>
                    </div>
                </div>
            </div>
        </yd-popup>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "创意小店灯充电卧室",
                show2: false
            }
        },
        created() {},
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true
            this.$parent.$data.showmenu = true
            next()
        },
        methods: {
            goaddress(){
             this.$router.push({name:"address"})
            },
            goodcar() {
                this.$router.push({
                    name: "goodcar"
                })
            },
            color() {
                this.show2 = true
            }
        },
        components: {}
    }
</script>
<style scoped>
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
    .center {
        padding-left: 12px;
        padding-right: 12px;
        background-color: #fff
    }
    .title {
        font-family: PingFangSC-Regular;
        padding-top: 10px;
        font-size: 15px;
        color: #333333;
    }
    .pice {
        padding-top: 10px;
        width: 100%;
        height: 50px;
    }
    .word {
        font-size: 15px;
        color: #1D75D6;
    }
    .word1 {
        font-size: 20px
    }
    .word2 {
        font-size: 15px;
        color: #999999;
    }
    .ad {
        text-align: center;
        background-color: #fff
    }
    .center-contect {
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .sb {
        flex-grow: 1;
    }
    .color {
        width: 50%;
        flex-grow: 4;
    }
    .base {
        color: #999999;
        flex-grow: 1;
    }
    .body-content {
        margin-top: 5px;
        background-color: #fff;
    }
    .body-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .image1 {
        width: 117px;
        height: 87px;
    }
    .shop1 {
        width: 100%;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        color: #333333;
        padding-left: 10px;
        font-weight: 400
    }
    .btn-footer {
        display: flex;
        height: 60px;
        width: 100%;
        align-items: center;
        position: fixed;
        bottom: 0;
    }
    .goodcar {
        flex-grow: 1;
        height: 100%;
        font-size: 16px;
    }
    .goodcenter {
        flex-grow: 3;
        height: 100%;
        text-align: center;
        font-size: 16px;
        line-height: 60px;
        color: #fff;
        background-color: #82BDFF;
    }
    .chang {
        flex-grow: 3;
        height: 100%;
        text-align: center;
        font-size: 16px;
        line-height: 60px;
        color: #fff;
        background-color: #1D75D6
        /* background: -webkit-linear-gradient(#1D75D6, #1D75D6);
                background: -o-linear-gradient(#1D75D6, #1D75D6);
                background: -moz-linear-gradient(#1D75D6, #1D75D6);
                background: linear-gradient(#1D75D6, #1D75D6); */
    }
    .car {
        display: block;
        height: 100%;
        text-align: center;
        line-height: 84px;
        background-color: #fff;
        position: relative
    }
    .number {
        position: absolute;
        top: 19%;
        right: 13%;
    }
    .mui-icon-extra {
        font-size: 40px;
    }
    .body {
        width: 100%;
        height: 221px;
        padding: 20px 20px;
    }
    .pop-right {
        width: 60%;
    }
    .pop-right del {
        width: 100%;
        height: 39px;
        line-height: 39px;
        font-size: 14px;
        color: #CCC
    }
    .score {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: #1D75D6;
    }
    .score i {
        font-size: 20px;
    }
    .body-footer {
        width: 100%;
    }
    .body-footer p {
        height: 50px;
        color: #000;
        line-height: 50px;
    }
    .btn39 {
        display: flex;
        width: 87%;
        align-items: center;
        justify-content: space-around;
    }
    .btn2 {
        width: 60px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 20px;
        background-color: #D8D8D8;
    }
    .c{
        background-color: #1D75D6;
        color: #fff;
    }
</style>

