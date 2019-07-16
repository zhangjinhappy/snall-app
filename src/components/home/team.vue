<template>
    <div class="team-content">
        <div class="center">
            <yd-navbar :title="chang"></yd-navbar>
            <div class="team-header">
                <h2 class="web">团队交易量</h2>
                <div class="time">
                    <yd-cell-item>
                        <yd-datetime type="date" v-model="endTime" slot="right"></yd-datetime>
                    </yd-cell-item>
                    <img src="../../lib/public/images/xia.png" alt="111">
                </div>
                <div class="nunber">
                    <yd-countup :endnum="countMoney" duration="3" decimals="2" separator="," :start="countMoney!=0" prefix="￥" suffix="元"></yd-countup>
                </div>
            </div>
            <br>
            <div class="team-body">
                <div ref="mescroll" class="mescroll">
                    <div>
                        <yd-tab bg-color="#1D75D6" active-color="#fff" height="60px" color="#fff" :callback="callbackFn">
                            <yd-tab-panel :label="'直属人数('+countMoneycountMoney.direct+')'" tabkey="0">
                                <div class="number" v-for="(obj,key) in directTeamList" :key="key">
                                    <div class="line">
                                        <img class="img" src="../../lib/public/images/tittle.png" alt="1234">
                                        <div class="number-right">
                                            <h1 class="cat">{{obj.realname}} &nbsp;{{obj.phonenumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}&nbsp;
                                                 <img src="../../lib/public/images/tuan1.png" v-if="obj.realnamestate==2" alt="1234" width="20" height="20">
                                                <img src="../../lib/public/images/tuan2.png" alt="1234" width="20" height="20">
                                                <img src="../../lib/public/images/tuan3.png"  v-if="obj.isPos>0" alt="1234" width="20" height="16">
                                            </h1>
                                            <p class="dog">
                                                直属 &nbsp;&nbsp; {{formatDateTime(obj.addtime)}}
                                            </p>
                                        </div>
                                    </div>
                                    <img src="../../lib/public/images/phone.png" @click="telcall(obj.phonenumber)" class="img2" alt="打电话">
                                </div>
                                <div class="number" v-if="directTeamList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel :label="'间接人数('+countMoneycountMoney.indirec+')'" tabkey="1">
                                <div class="number" v-for="(obj,key) in directTeamList" :key="key">
                                    <div class="line">
                                        <img class="img" src="../../lib/public/images/tittle.png" alt="1234">
                                        <div class="number-right">
                                            <h1 class="cat">{{obj.realname}} &nbsp;{{obj.phonenumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}&nbsp;
                                                <img src="../../lib/public/images/tuan1.png" v-if="obj.realnamestate==2" alt="1234" width="20" height="20">
                                                <img src="../../lib/public/images/tuan2.png" alt="1234" width="20" height="20">
                                                <img src="../../lib/public/images/tuan3.png"  v-if="obj.isPos>0" alt="1234" width="20" height="16">
                                            </h1>
                                            <p class="dog">
                                                间属 &nbsp;&nbsp; {{formatDateTime(obj.addtime)}}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="tel">
                                        <img src="../../lib/public/images/phone.png" @click="telcall(obj.phonenumber)" class="img2" alt="打电话">
                                    </div>
                                </div>
                                <div class="number" v-if="directTeamList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel :label="'总人数('+countMoneycountMoney.countAll+')'" tabkey="2">
                                <div class="number" v-for="(obj,key) in directTeamList" :key="key">
                                    <div class="line">
                                        <img class="img" src="../../lib/public/images/tittle.png" alt="1234">
                                        <div class="number-right">
                                            <h1 class="cat">{{obj.realname}} &nbsp;{{obj.phonenumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}&nbsp;
                                                <img src="../../lib/public/images/tuan1.png" v-if="obj.realnamestate==2" alt="1234" width="20" height="20">
                                                <img src="../../lib/public/images/tuan2.png" alt="1234" width="20" height="20">
                                                <img src="../../lib/public/images/tuan3.png"  v-if="obj.isPos>0" alt="1234" width="20" height="16">
                                            </h1>
                                            <p class="dog">
                                                {{obj.level==1?"直属":"间属"}}&nbsp;&nbsp; {{formatDateTime(obj.addtime)}}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="tel">
                                        <img src="../../lib/public/images/phone.png" @click="telcall(obj.phonenumber)" class="img2" alt="打电话">
                                    </div>
                                </div>
                                <div class="number" v-if="directTeamList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                        </yd-tab>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import {
        formatDateTime,
        thisFormatDate
    } from '../../util/TimeUtils';
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    export default {
        data() {
            return {
                chang: '团队',
                endTime: "2016-06-01",
                countMoney: 0,
                "countMoneycountMoney": {
                    "direct": "0",
                    "indirec": "0",
                    "countAll": "0"
                },
                directTeamList: [],
                params: {
                    "currPage": 1,
                    "limit": 100,
                    "state": 1 //1.直接 2.间接 3.全部
                }
            }
        },
        created() {
            this.getcountCustomer(); //获取统计人数
            this.endTime = moment().format('YYYY-MM-DD');
            let params = {
                startTime: "2019-01-01",
            };
            params.startTime = "2019-01-01";
            params.endTime = moment().format('YYYY-MM-DD');
            this.countMoneyfn(params);
        },
        watch: {
            startTime(newVal, oldVal) {
                let params = {
                    startTime: '2016-06-01'
                };
                params.startTime = newVal;
                params.endTime = this.thisFormatDate();
                this.countMoneyfn(params);
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu = false;
                vm.$parent.$data.showfooter = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next()
        },
        methods: {
            async countMoneyfn(params) { //统计交易量
                console.log("countMoney start");
                params.endTime = thisFormatDate();
                let data = await this.$axios.get("/transrecords/countMoney", params);
                if (data.state == "00") {
                    console.log(data);
                    this.countMoney = data.countMoney;
                }
                console.log("countMoney end");
            },
            async getTeam(currPage, limit) { //获取推荐人信息
                this.params.currPage = currPage;
                this.params.limit = limit;
                let data = await this.$axios.get("/customer/getMyTeam", this.params);
                console.log("getTeam start");
                this.directTeamList = [...this.directTeamList, ...data.dataList];
                console.log("getTeam end");
                return data.dataList;
            },
            async getcountCustomer() { //获取统计人数
                let data = await this.$axios.get("/customer/countCustomer");
                console.log("getcountCustomer start ");
                this.countMoneycountMoney.countAll = data.data.countAll;
                this.countMoneycountMoney.indirec = data.data.indirec;
                this.countMoneycountMoney.direct = data.data.direct;
                console.log("getcountCustomer end")
            },
            callbackFn(label, tabkey) { //修改选项卡
                console.log("callbackFn start");
                this.directTeamList = [];
                this.params.state = tabkey + 1;
                this.getTeam(1, 10);
                console.log("callbackFn end");
            },
            async upCallback(page, mescroll) {
                let data = await this.getTeam(page.num, page.size);
                mescroll.endSuccess(data.length);
            },
            downCallback() {
                this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            },
            formatDateTime,
            thisFormatDate,
            telcall(phone) {
                window.location.href = "tel://"+phone;
            }
        },
        components: {
            //
        },
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
        padding-left: 8px;
        padding-right: 8px
    }
    .web {
        font-size: 13px;
        color: #a3a3a3;
        font-weight: 400;
    }
    .team-content {
        background-color: #fff
    }
    .team-header {
        height: 135px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .team-header h2 {
        height: 42px;
        font-size: 16px;
        width: 100%;
        text-align: center;
        line-height: 42px;
    }
    .yd-tab {
        border-radius: 5px 5px 5px 5px;
    }
    .nunber {
        font-size: 20px;
        font-weight: 900;
    }
    .number {
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #c3c3c3;
    }
    .line {
        display: flex;
        align-items: center;
    }
     img{
         vertical-align: middle;
     }
     .img {
        width: 40px;
        height: 40px;
    }
    .img2{
        width: 30px;
        height: 30px;
    }
    .time {
        display: flex;
        align-items: baseline
    }
    .number-right {
        padding-left: 7px;
    }
    .yd-navbar {
        border-bottom: 1px solid #ccc;
    }
    .cat {
        height: 24px;
        line-height: 24px;
        font-size: 13px;
        font-weight: 400;
        color: #333333
    }
    .dog {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #999999;
    }
</style>

