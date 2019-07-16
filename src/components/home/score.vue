<template>
    <div class="score-content">
        <div class="center">
        <yd-navbar :title="chang">
            <a href="#" slot="left" @click="func">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </a>
        </yd-navbar>
        <br>
        <div class="score-head">
            <div class="header">
                <h1 class="word">优合积分商城</h1>
                <router-link tag="span" to="/crule" style="color:#ccc">规则&nbsp;&nbsp;<i>?</i></router-link>
            </div>
            <div class="header-body">
                <li class="mui-table-view-cell">
                    <router-link class="mui-navigate-right" style="font-weight:70;" to="/exchange">
                        <span class="mui-badge">兑换记录</span>
                        <div class="left">
                            <img v-lazy="'../../lib/public/images/buss.png'" alt="">
                            <h1 class="word">{{pointbalance}}积分</h1>
                        </div>
                    </router-link>
                </li>
            </div>
        </div>
        <div class="score-body">
            <yd-slider autoplay="3000">
                <yd-slider-item>
                    <a href="#">
                        <img src="https://wineshopimage.wine-world.com/82990316-83c5-4554-91e1-b2c069363953.jpg?x-oss-process=image/resize,m_lfit,l_640">
                    </a>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="#">
                        <img src="https://wineshopimage.wine-world.com/03582627-67c7-4b13-a344-a1586653dc73.jpg?x-oss-process=image/resize,m_lfit,l_640">
                    </a>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="#">
                        <img src="https://wineshopimage.wine-world.com/873ba85f-3d5c-4f1f-bc02-eb76f4244abb.jpg?x-oss-process=image/resize,m_lfit,l_640">
                    </a>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="#">
                        <img src="https://gfs9.gomein.net.cn/wireless/T1RqK_B5h_1RCvBVdK_1080_320.jpg">
                    </a>
                </yd-slider-item>
            </yd-slider>
        </div>
        <!-- 图标栏 -->
        <div class="score-a">
            <yd-grids-group :rows="4">
                <yd-grids-item>
                    <router-link slot="text" to="/home/score/date">
                                <img v-lazy="'../../lib/public/images/s9.png'" width="36" height="36" alt="11">
                                <h1>优惠票券</h1>
                    </router-link>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="text" @click="alertfn">
                                <img v-lazy="'../../lib/public/images/s1.png'" alt="22">
                                <h1>厨房用品</h1>
                            </span>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="text" @click="alertfn">
                                <img v-lazy="'../../lib/public/images/s4.png'" alt="33">
                                <h1>数码商品</h1>
                            </span>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="text" @click="alertfn">
                                <img v-lazy="'../../lib/public/images/s6.png'" alt="44">
                                <h1>珠宝饰品</h1>
                            </span>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="text" @click="alertfn">
                                <img v-lazy="'../../lib/public/images/s7.png'" alt="55">
                                <h1>商旅办公</h1>
                            </span>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="text" @click="alertfn">
                                <img v-lazy="'../../lib/public/images/s8.png'" alt="6">
                                <h1>母婴用品</h1>
                            </span>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="text" @click="alertfn">
                                <img v-lazy="'../../lib/public/images/s2.png'" alt="7">
                                <h1>家纺装饰</h1>
                            </span>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="text" @click="alertfn">
                                <img v-lazy="'../../lib/public/images/s3.png'" alt="8">
                                <h1>生活用品</h1>
                            </span>
                </yd-grids-item>
            </yd-grids-group>
            <br>
        </div>
        <!-- 购物车 -->
        <!--<div class="score-car" @click="carlist">
            <span class="number mui-badge mui-badge-danger">0</span><img v-lazy="'../../lib/public/images/gwc.png'" width="30" height="30" alt="1">
        </div>-->
        <!-- 商城的产品图 -->
        <div class="score-footer">
            <!--<yd-list theme="3">
                &lt;!&ndash; 第一个商品 &ndash;&gt;
                <yd-list-item>
                    <img slot="img" src="https://gfs17.gomein.net.cn/T1GkxjBbhv1RCvBVdK_250.jpg">
                    <span slot="title">中国苏绣-雪牙色</span>
                    <yd-list-other slot="other">
                        <div>
                            <img slot="img" class="other-img" v-lazy="'../../lib/public/images/buss.png'"><b>3400 <span>+￥122</span></b>
                        </div>
                        <div></div>
                    </yd-list-other>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price">原价</span>
                            <span class="demo-list-del-price">¥21334</span>
                        </div>
                        <div>
                            <span class="demo-list-price">积分抵用券￥111</span>
                        </div>
                    </yd-list-other>
                </yd-list-item>
                &lt;!&ndash; 第二个商品 &ndash;&gt;
                <yd-list-item>
                    <img slot="img" v-lazy="'https://gfs17.gomein.net.cn/T1ZULjBQAT1RCvBVdK_250.jpg'">
                    <span slot="title">朵迪雅尚围巾女冬季ins韩版(黑灰色 200*40)</span>
                    <yd-list-other slot="other">
                        <div>
                            <img slot="img" class="other-img" v-lazy="'../../lib/public/images/buss.png'"><b>3400 <span>+￥122</span></b>
                        </div>
                        <div></div>
                    </yd-list-other>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price">原价</span>
                            <span class="demo-list-del-price">¥21334</span>
                        </div>
                        <div>
                            <span class="demo-list-price">积分抵用券￥111</span>
                        </div>
                    </yd-list-other>
                </yd-list-item>
                &lt;!&ndash; 第三个商品 &ndash;&gt;
                <yd-list-item>
                    <img slot="img" v-lazy="'https://gfs17.gomein.net.cn/T12LdbBvW_1RCvBVdK_250.jpg'">
                    <span slot="title">长款围巾(紫色)</span>
                    <yd-list-other slot="other">
                        <div>
                            <img slot="img" class="other-img" v-lazy="'../../lib/public/images/buss.png'"><b>3400 <span>+￥122</span></b>
                        </div>
                        <div></div>
                    </yd-list-other>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price">原价</span>
                            <span class="demo-list-del-price">¥21334</span>
                        </div>
                        <div>
                            <span class="demo-list-price">积分抵用券￥111</span>
                        </div>
                    </yd-list-other>
                </yd-list-item>
                &lt;!&ndash; 第四个商品 &ndash;&gt;
                 <yd-list-item>
                    <img slot="img" v-lazy="'https://gfs17.gomein.net.cn/T1DTYbBgCT1RCvBVdK_250.jpg'">
                    <span slot="title">伊丹黎丝</span>
                    <yd-list-other slot="other">
                        <div>
                            <img slot="img" class="other-img" v-lazy="'../../lib/public/images/buss.png'"><b>3400 <span>+￥122</span></b>
                        </div>
                        <div></div>
                    </yd-list-other>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price">原价</span>
                            <span class="demo-list-del-price">¥21334</span>
                        </div>
                        <div>
                            <span class="demo-list-price">积分抵用券￥111</span>
                        </div>
                    </yd-list-other>
                </yd-list-item>
                &lt;!&ndash; 第五个商品 &ndash;&gt;
                 <yd-list-item>
                    <img slot="img" v-lazy= "'http://gfs17.gomein.net.cn/T1kgVTB4xv1RCvBVdK_250.jpg'">
                    <span slot="title">【朵迪雅尚】男士皮手套秋冬季保暖防水防风加绒加厚触屏皮手套男冬骑车摩托车(蝴蝶结女)</span>
                    <yd-list-other slot="other">
                        <div>
                            <img slot="img" class="other-img" v-lazy="'../../lib/public/images/buss.png'"><b>3400 <span>+￥122</span></b>
                        </div>
                        <div></div>
                    </yd-list-other>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price">原价</span>
                            <span class="demo-list-del-price">¥21334</span>
                        </div>
                        <div>
                            <span class="demo-list-price">积分抵用券￥111</span>
                        </div>
                    </yd-list-other>
                </yd-list-item>
            </yd-list>-->
        </div>
        </div>
    </div>
</template>
<script>
    import {
        USERINFO
    } from '../../store/types'

    export default {
        data() {
            return {
                chang: "积分商城",
                pointbalance:0.00
            }
        },
        created(){
            this.init();
        },
        methods: {
            func() {
                this.$router.go(-1)
            },
            carlist(){
                this.$router.push({name:"goodcar"})
            },
            init(){
                this.userInfo = JSON.parse(this.$store.state[USERINFO]); //获取用户信息
                this.pointbalance = this.userInfo.pointbalance;
            },
            alertfn(){
                this.$dialog.toast({
                    mes: "暂无商品",
                    timeout: 1500
                });
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
        },
    }
</script>
<style scoped>
    .score-content {
        background-color: #fff;
    }
    .center{
       padding-left: 8px;
        padding-right: 8px 
    }
    .word {
        width: 120px;
        height: 30px;
        font-weight: 600;
        text-align: center;
        line-height: 30px;
    }
    i {
        border: 1px solid #ccc;
        display: inline-block;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        color: #ccc;
        border-radius: 50%;
    }
    h1 {
        font-size: 18px;
    }
    .header {
        display: flex;
        align-items: center;
    }
    li {
        list-style: none;
    }
    .header span {
        padding-left: 15px;
    }
    .score-head {
        margin-bottom: 10px;
    }
    .left {
        display: flex;
        align-items: center;
    }
    .left h1 {
        padding-left: 2px;
    }
    .score-body img {
        height: 200px;
    }
    .score-a h1 {
        font-size: 14px;
        font-weight: 400
    }
    .score-car {
        width: 70px;
        height: 70px;
        position: fixed;
        right: 8px;
        bottom: 40px;
        z-index: 99;
    }
    .score-car img {
        width: 70px;
        height: 70px;
    }
    .other-img {
        width: 12px;
        height: 12px;
        vertical-align: baseline;
    }
    .other-footer {
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    b {
        padding-left: 8px;
    }
    .number {
        position: absolute;
        right: 10%;
        top: 10%;
    }
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
    .yd-list-other{
        height: 24px;
    }
</style>
