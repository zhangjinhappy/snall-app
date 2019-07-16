<template>
    <div class="bill-content">
         <navname :navname="chang"></navname>
        <div class="center">
            <div class="bill-header">
                <div class="header-top">
                    <img class="tipBjiMG" src="../../lib/public/images/userbill4.png" alt="订单详情">
                    <span class="miaoshu">订单完成</span>
                </div>
                <router-link class="header-body" tag="div" to="/orderfollow">
                    <div class="header-img">
                        <img class="center-block" src="../../lib/public/images/userbill2.png" alt="物流信息">
                    </div>
                    <div class="header-time">
                        <span class="a">订单已签收</span>
                        <p>2019-1-14 15:29:00</p>
                    </div>
                    <div class="header-left">
                        <img class="center-block" src="../../lib/public/images/userbill5.png" alt="">
                    </div>
                </router-link>
                <div class="header-footer">
                    <img src="../../lib/public/images/userbill1.png" alt="">
                    <div class="adressP">
                        <p class="p">张三<span>139****4372</span></p>
                        <p class="p">地址：安徽省合肥市经开区尚泽大都会C座903</p>
                    </div>
                </div>
            </div>
            <div class="content-body">
                <img src="../../lib/public/images/pos.png" alt="3333">
                <div class="content-msg">
                    <h1>乐刷POS机M60</h1>
                    <p>
                        <span>数量：1 &nbsp;</span>
                        <span> 颜色：黑色</span>
                    </p>
                    <p class="p">￥298.00</p>
                </div>
            </div><br>
            <div class="bill-footer">
                <yd-preview-item>
                    <div slot="left">商品总额：</div>
                    <div slot="right">￥298.00</div>
                </yd-preview-item>
                <yd-preview-item>
                    <div slot="left">运费：</div>
                    <div slot="right">￥0.00</div>
                </yd-preview-item>
                <yd-preview-item>
                    <div slot="left">优惠：</div>
                    <div slot="right">-￥298.00</div>
                </yd-preview-item>
                <yd-preview-header>
                    <div slot="left"></div>
                    <div slot="right">实付款:&nbsp;&nbsp;<span style="color:red">￥0.00</span></div>
                </yd-preview-header>
                <div class="order">
                    <yd-preview-item>
                        <div slot="left">订单编号：</div>
                        <div slot="right">26643255522555887</div>
                    </yd-preview-item>
                    <yd-preview-item>
                        <div slot="left">订单交易号：</div>
                        <div slot="right">11111111111</div>
                    </yd-preview-item>
                    <yd-preview-item>
                        <div slot="left">创建时间：</div>
                        <div slot="right">2019-1-14 16:59:00</div>
                    </yd-preview-item>
                    <yd-preview-item>
                        <div slot="left">付款时间：</div>
                        <div slot="right">2019-1-14 17:00:04</div>
                    </yd-preview-item>
                </div>
                <div class="btn">
                    <div class="l"></div>
                    <div class="l" @click="delet">删除订单</div>
                    <div class="r" @click="judge">订单评价</div>
                    <!-- <yd-button type="primary" bgcolor="#2a81df" color="#fff"></yd-button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navname from '../subcomponents/nav.vue'
    export default {
        data() {
            return {
                chang:"订单"
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
            delet() {
                alert("删除订单")
            },
            judge() {
                alert("订单评价")
            }
        },
        components: {
            navname
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff;
    }
    .center{
      padding-bottom: 50px;
      padding-left: 8px;
      padding-right: 8px;
    }
    .header-top {
        height: 100px;
        width: 100%;
        background-image: url(../../lib/public/images/userbill.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        padding-left: 10%;
        display: flex;
        align-items: center
    }
    .tipBjiMG {
        width: 30px;
        height: 30px;
    }
    .miaoshu {
        line-height: 70px;
        color: white;
        font-size: 18px;
        margin-left: 5%;
    }
    .header-body {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 80%;
        height: 80px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
        border-radius: 4px;
        position: absolute;
        top: 19%;
        left: 10%;
    }
    .header-footer {
        margin-top: 80px;
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
    .adressP {
        text-align: justify;
        padding-left: 10px;
    }
    .p {
        color: #000;
    }
    .adressP p:last-child {
        font-size: 10px;
    }
    .content-body {
        padding-left: 10px;
        padding-top: 10px;
        display: flex;
        align-items: center;
    }
    .content-msg {
        padding-left: 10px;
    }
    .content-msg h1 {
        height: 18px;
        text-align: left;
    }
    .btn {
        padding-left: 8px;
        padding-right: 14px;
        width: 100%;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 10px;
        background-color: #fff;
        display: flex;
        justify-content: flex-end;
    }
    .a {
        font-size: 15px;
    }
    .bill-footer {
        padding-left: 8px;
        padding-right: 8px;
    }
    .yd-btn {
        border-radius: 20px
    }
    .btn .l {
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
    }
    .btn .r {
        width: 80px;
        height: 30px;
        color: #fff;
        text-align: center;
        border-radius: 20px;
        line-height: 30px;
        background-color: #2a81df
    }
</style>

