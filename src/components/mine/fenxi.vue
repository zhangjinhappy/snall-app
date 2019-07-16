<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <div class="center">
            <p class="code">{{map}}</p>
            <h1 class="bill-f"><span>￥</span>{{countProfit}}</h1>
            <div class="bill-header">
                <div class="sp-left">
                    <span>{{ formatDate(params.startTime) }}</span>
                     --
                    <span>{{formatDate(params.endTime) }}</span>
                </div>
                <div class="sp" @click="show2=!show2">
                    <img v-lazy="'../../lib/public/images/shaixuan.png'" alt="1111">
                    <span class="an">筛选</span>
                </div>
            </div>
            <yd-popup v-model="show2" position="bottom" height="60%">
                <div class="tan">
                    <h1 class="time">时间</h1>
                    <div class="start-time">
                        <p>开始时间:</p>
                        <yd-cell-item>
                            <yd-datetime type="datetime"  v-model="params.startTime" slot="right"></yd-datetime>
                        </yd-cell-item>
                    </div>
                    <div class="start-time">
                        <p> 结束时间:</p>
                        <yd-cell-item>
                            <yd-datetime type="datetime" v-model="params.endTime" slot="right"></yd-datetime>
                        </yd-cell-item>
                    </div>
                    <yd-button type="warning" bgcolor="#1D75D6" color="#fff" size="large" @click.native="searchfor(1,10)">确定搜索</yd-button>
                </div>
            </yd-popup>
            <div ref="mescroll" class="mescroll">
                <div>
                    <div class="fenxi-body" v-if="datedifference(params.startTime,params.endTime)==0">
                        <yd-tab active-color="#1D75D6" height="60px" bg-color="#D8D8D8" color="#333"  :callback="upgradeType">
                            <yd-tab-panel label="交易分润" tabkey="0">
                                <div class="number" v-for="(obj,key) in dataList" :key="key">
                                    <img v-lazy="'../../lib/public/images/fen1.png'" alt="ff">
                                    <div class="number-right">
                                        <h2>你产生了一笔<span>￥{{obj.profit}}元</span>已到账</h2>
                                        <p>{{formatDateTime(obj.addtime)}}</p>
                                    </div>
                                </div>
                                <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel label="升级分润" tabkey="1">
                                <div class="number" v-for="(obj,key) in dataList" :key="key">
                                    <img v-lazy="'../../lib/public/images/fen2.png'" alt="ff">
                                    <div class="number-right">
                                        <h2>你产生了一笔<span>￥{{obj.profit}}元</span>已到账</h2>
                                        <p>{{formatDateTime(obj.addtime)}}</p>
                                    </div>
                                </div>
                                <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel label="刷卡金" >
                                <div class="number" >
                                    <img v-lazy="'../../lib/public/images/fen3.png'" alt="ff">
                                    <div class="number-right">
                                        <h2>你产生了一笔<span>￥1000元</span>已到账</h2>
                                        <p>2000-10-10</p>
                                    </div>
                                </div>
                                <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel label="积分" >
                                <div class="number" >
                                    <img v-lazy="'../../lib/public/images/fen4.png'" alt="ff">
                                    <div class="number-right">
                                        <h2>你产生了一笔<span>￥100元</span>已到账</h2>
                                        <p>2019-06-07</p>
                                    </div>
                                </div>
                                <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                        </yd-tab>
                    </div>
                    <div class="fenxi-body" v-else>
                        <yd-tab  active-color="#1D75D6" height="60px" bg-color="#D8D8D8" color="#333" :callback="upgradeType">
                            <yd-tab-panel label="交易分润" tabkey="0">
                                <div class="number" @click="func(obj)" v-for="(obj,key) in dataList" :key="key">
                                    <p>{{obj.addtime}} </p>
                                    <p>当日累计分润￥{{obj.profit}}元 </p>
                                </div>
                                <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel label="升级分润" tabkey="1">
                                <div class="number" @click="func(obj)" v-for="(obj,key) in dataList" :key="key">
                                    <p>{{obj.addtime}} </p>
                                    <p>当日累计分润￥{{obj.profit}}元 </p>
                                </div>
                                <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel label="刷卡金" >
                                <div class="number" >
                                    <img v-lazy="'../../lib/public/images/fen3.png'" alt="ff">
                                    <div class="number-right">
                                        <h2>你产生了一笔<span>￥1000元</span>已到账</h2>
                                        <p>2000-10-10</p>
                                    </div>
                                </div>
                                <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel label="积分" >
                                <div class="number" >
                                    <img v-lazy="'../../lib/public/images/fen4.png'" alt="ff">
                                    <div class="number-right">
                                        <h2>你产生了一笔<span>￥100元</span>已到账</h2>
                                        <p>2019-06-07</p>
                                    </div>
                                </div>
                                <!-- <div class="number" v-if="dataList.length==0">
                                    暂无数据...
                                </div> -->
                            </yd-tab-panel>
                        </yd-tab>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import {formatDate,formatDateTime,thisFormatDateTime,datedifference,thisFormatDate} from '../../util/TimeUtils' ;
    import 'vue-ydui/dist/ydui.base.css';
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    export default {
        data() {
            return {
                chang: "分润明细",
                map:"",
                show2: false,
                params: {
                    "currPage": 1,
                    "limit": 20,
                    "types": [1, 2, 3],
                    "startTime": "2018-04-04 00:00",
                    "endTime": "2019-4-15 00:00"
                },
                dataList:[],
                countProfit:"0.00"
            }
        },
        beforeCreate(){
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
        watch:{
            'params.endTime':function(val){
                console.log("fenxi watch params handler start");
                console.log(val);
                console.log("fenxi watch params handler end");
            }
        },
        methods: {
            search() {
                this.show2 = false;
                this.$router.push({
                    name: "fenxi1"
                })
            },
            init() {
                console.log("fenxi init start");
                {
                    this.params.endTime = moment().format('YYYY-MM-DD HH:mm');
                    console.log(moment().format('YYYY-MM-DD HH:mm'));
                }
                console.log("fenxi init end");
            },
            async searchfor(currPage,limit){//获取推荐人信息
                console.log("searchfor start");
                if(currPage==1){//如果当前是第一页，把数据置空
                    this.dataList = [];
                }
                let params = {};
                Object.assign(params, this.params);
                params.currPage = currPage;
                params.limit = limit;
                params.startTime = params.startTime + ":00";
                params.endTime = params.endTime + ":59";
                params.types = this.params.types.toString();
                {//获取分润
                    let res = await this.$axios.get("/custprofitdetail/getCountProfit",params);
                    if(res.state=='00' && res.data!=null){
                        this.countProfit = res.data;
                    }
                }
                //获取列表数据数据
                let res = await this.$axios.get("/custprofitdetail/getprofitdetail", params);
                if(!res){
                    return [];
                }
                let data = res.dataList;
                console.log(data);
                this.dataList = [...this.dataList,...data];
                return data;
            },
            datedifference,
            func(obj){
                obj.types = this.params.types;
                console.log(obj);
                localStorage.setItem("fenxi",JSON.stringify(obj));
                this.$router.push({name:"fenxi2"})
            },
            formatDate,formatDateTime,thisFormatDateTime,
            upgradeType(label,tabkey){
                if(tabkey==1){
                    this.map=label;
                    this.params.types = [4];
                }else{
                    this.map=label;
                    this.params.types = [1,2,3];
                }
                this.searchfor(1,10);
            },
            async upCallback(page, mescroll){
                let data = await this.searchfor(page.num,page.size);
                console.log("upCallback");
                console.log(data);
                mescroll.endSuccess(data.length);
            },
            downCallback(){
                this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            }
        },
        components: {
        },
        mounted: function () {
            //创建MeScroll对象
            this.mescroll = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down:{callback: this.downCallback }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
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
        beforeDestroy(){
            this.mescroll.destroy();//销毁MeScroll对象
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff;
    }
    .center {
        padding-left: 8px;
        padding-right: 8px
    }
    .code{
           font-size: 14px;
    padding-left: 14px;
    height: 30px;
    padding-top: 10px;
    }
    .fenxi-body{
        padding-top: 10px;
    }
    .bill-header {
        padding-left: 14px;
        padding-right: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tan h1 {
        height: 40px;
        text-align: left;
        font-size: 16px;
        line-height: 40px;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .bill-f {
            width: 100%;
    padding-left: 10px;
    height: 60px;
    text-align: left;
    line-height: 60px;
    font-size: 20px;
    }
    .tan {
        padding-left: 20px;
        padding-right: 20px;
    }
    .sp img {
        vertical-align: middle;
    }
    .an {
        padding-left: 5px;
        color: #333333;
    }
    .tan input {
        margin-left: 10px;
        margin-top: 10px;
    }
    .sp-left {
        display: flex;
        align-items: center;
    }
    .number-right span {
        color: red
    }
    h2 {
            height: 20px;
    line-height: 20px;
    color: #333333;
    font-weight: 400;
    font-size: 15px;
    }
    .number {
        padding: 20px;
        display: flex;
        align-items: center;
        color: #c3c3c3;
    }
    .number img {
        width: 40px;
        height: 40px;
    }
    .number-right {
        padding-left: 10px
    }
    .time {
        height: 42px;
        width: 100%;
        font-size: 14px;
        color: #333333;
    }
    .start-time {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>

