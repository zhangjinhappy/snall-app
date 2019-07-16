<template>
    <div class="bill-content">
        <yd-navbar :title="chang"> </yd-navbar>
        <div class="recode-body">
            <div ref="mescroll" class="mescroll">
                <div>
                    <yd-tab bg-color="#fff" active-color="#1D75D6" height="60px" :callback="upgradeType">
                        <yd-tab-panel label="提现中" tabkey="0">
                            <div class="center" v-for="(obj,key) in dataList" :key="key">
                                <div class="number">
                                    <div class="header">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian.png" alt="11"> <span class="bill">提现</span>
                                        </div>
                                        <h1 class="money">+￥32</h1>
                                    </div>
                                </div>
                                <div class="number">
                                    <div class="header1">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian1.png" alt="11"> <span style="font-size: 13px;color: #666666;">到账卡号</span>
                                        </div>
                                        <p style="font-size:13px;color:#999999">********{{obj.cardno}}</p>
                                    </div>
                                </div>
                                <div class="number">
                                    <div class="header1">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian2.png" alt="11"> <span style="font-size: 13px;color: #666666;">申请时间</span>
                                        </div>
                                        <p style="font-size:13px;color:#999999">{{formatDateTime(obj.addtime)}}</p>
                                    </div>
                                </div>
                                <div class="number">
                                    <div class="header1">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian3.png" alt="11"> <span style="font-size: 13px;color: #666666;">状态</span>
                                        </div>
                                        <p style="font-size:13px;color:#999999">提现中</p>
                                    </div>
                                </div>
                            </div>
                            <div class="number" v-if="dataList.length==0">
                                暂无数据...
                            </div>
                        </yd-tab-panel>
                        <yd-tab-panel label="已提现" tabkey="1">
                            <div class="center" v-for="(obj,key) in dataList" :key="key">
                                <div class="number">
                                    <div class="header">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian.png" alt="11"> <span class="bill">提现</span>
                                        </div>
                                        <h1 class="money">+¥{{obj.postmoney}}</h1>
                                    </div>
                                </div>
                                <div class="number">
                                    <div class="header1">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian1.png" alt="11"> <span style="font-size: 13px;color: #666666;">到账卡号</span>
                                        </div>
                                        <p style="font-size:13px;color:#999999">********{{obj.cardno}}</p>
                                    </div>
                                </div>
                                <div class="number">
                                    <div class="header1">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian2.png" alt="11"> <span style="font-size: 13px;color: #666666;">申请时间</span>
                                        </div>
                                        <p style="font-size:13px;color:#999999">{{formatDateTime(obj.addtime)}}</p>
                                    </div>
                                </div>
                                <div class="number">
                                    <div class="header1">
                                        <div class="header-top">
                                            <img class="image1" src="../../lib/public/images/txian3.png" alt="11"> <span style="font-size: 13px;color: #666666;">状态</span>
                                        </div>
                                        <p style="font-size:13px;color:#999999">已提现</p>
                                    </div>
                                </div>
                            </div>
                            <div class="number" v-if="dataList.length==0">
                                暂无数据...
                            </div>
                        </yd-tab-panel>
                    </yd-tab>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        formatDateTime
    } from '../../util/TimeUtils'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    export default {
        data() {
            return {
                chang: "提现记录",
                params: {
                    "orderstate": 1,
                    "currPage": 1,
                    "limit": 10
                },
                dataList: [{
                    postmoney: "1000",
                    cardno: "3422043433433",
                    taxrate: "30",
                    addtime: new Date()
                }, {
                    postmoney: "1000",
                    cardno: "3422043433433",
                    taxrate: "30",
                    addtime: new Date()
                }, {
                    postmoney: "1000",
                    cardno: "3422043433433",
                    taxrate: "30",
                    addtime: new Date()
                }, {
                    postmoney: "1000",
                    cardno: "3422043433433",
                    taxrate: "30",
                    addtime: new Date()
                }]
            }
        },
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
            init() {},
            async load(currPage, limit) {
                this.params.currPage = currPage;
                this.params.limit = limit;
                let res = await this.$axios.get("/custpostcash/getpostcashList", this.params);
                console.log(res);
                this.dataList = [...this.dataList, ...res.dataList];
                return res.dataList;
                npm
            },
            formatDateTime,
            async upCallback(page, mescroll) {
                let data = await this.load(page.num, page.size);
                console.log("upCallback");
                console.log(data);
                mescroll.endSuccess(data.length);
            },
            downCallback() {
                this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            },
            upgradeType(label, tabkey) {
                this.params.orderstate = tabkey + 1;
                this.load(1, 10);
            }
        },
        components: {},
        mounted: function() {
            //创建MeScroll对象
            this.mescroll = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down: {
                    callback: this.downCallback
                }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
                up: {
                    callback: this.upCallback,
                    toTop: {
                        //回到顶部按钮
                        src: "../../lib/public/images/top.png", //图片路径,默认null,支持网络图
                        offset: 100 //列表滚动1000px才显示回到顶部按钮
                    }
                }
            });
        },
        beforeDestroy() {
            this.mescroll.destroy(); //销毁MeScroll对象
        }
    }
</script>
<style scoped>
    .center {
        margin-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
    .header {
        width: 90%;
        height: 50px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
    }
    .header1 {
        width: 90%;
        height: 50px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .image1 {
        vertical-align: middle;
        width: 30px;
        height: 30px;
    }
    .bill {
        font-size: 15px;
        color: #333333
    }
    .money {
        font-size: 15px;
        color: #1D75D6;
    }
    .number {
        background-color: #fff;
    }
</style>

