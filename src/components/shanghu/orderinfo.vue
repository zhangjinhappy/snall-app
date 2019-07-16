<template>
    <div class="bill-content">
        <yd-navbar :title="chang">
        </yd-navbar>
        <div class="center">
        <div class="login-img">
            <div class="login-body">
                <yd-countup :endnum="countMoney" duration="3" decimals="2" separator="," class="countMoney"  :start="countMoney!=0" prefix="￥" suffix="元"></yd-countup>
                <h3>本月账单</h3>
            </div>
        </div>
        <h2>个人账单</h2>
        <div class="header-body">
            <div class="left"><!-- @click="show1=true" --><!--这个事件是这个div的，现在不用-->
                <!--<span>筛选</span>
                <img v-lazy="'../../lib/public/images/o.png'" alt="1234">-->
            </div>
            <div class="right">
                <!-- <input type="month" name="" id="btn1"  v-model="datetime3"> -->
                <yd-datetime type="month" v-model="datetime3"></yd-datetime>
                <img class="im" v-lazy="'../../lib/public/images/o.png'" alt="1234">
            </div>
        </div>
        <yd-popup v-model="show1" position="bottom" height="60%">
            <div style="background-color:#fff;" class="bill">
                <h1 class="sa">筛选</h1>
                <hr><br>
                <span>快捷筛选</span><br><br>
                <yd-button type="primary">全部</yd-button>
                <yd-button type="hollow">pos交易</yd-button>
                <yd-button type="hollow">快捷交易</yd-button>
                <yd-button type="hollow">微信支付</yd-button>
                <yd-button type="hollow">支付宝交易</yd-button>
            </div>
        </yd-popup>
            <div ref="mescroll" class="mescroll">
                <div>
                    <div class="orderinfo-footer" v-for="order,key in orderList">
                        <div class="one">
                            <img v-lazy="'../../lib/public/images/yl.png'" alt="1223">
                            <div class="center">
                                <h1>{{order.businessname}}</h1>
                                <p> {{order.mcccode}}</p>
                                <p>
                                    {{moment(order.addtime).format('YYYY-MM-DD HH:mm:ss')}}
                                </p>
                            </div>
                            <span>
                                    <yd-countup :endnum="order.transmoney" duration="3" decimals="2" separator="," prefix="￥" suffix="元"></yd-countup>
                            </span>
                        </div>
                        <hr>
                    </div>
                    <div class="number" v-if="orderList.length==0">
                        暂无数据...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import '../../lib/mui/js/mui.js'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import {isNull} from "../../util/Is";
    export default {
        data() {
            return {
                chang: "账单",
                datetime3: "",
                show1: false,
                orderList:[],
                countMoney:0.00
            }
        },
        watch:{
            'datetime3':function(val){
                console.log("orderinfo watch start");
                console.log(val);
                this.orderList = [];
                if(val=="2009-01"){
                    return
                }
                this.upCallback({num:1,size:10},this.mescroll);
                console.log("orderinfo watch end");
            }
        },
        created() {
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
            moment,
            func() {
            },
            async findOrderList(num,size){
                let params = {
                    "currPage": num,
                    "limit": size,
                    "startTime": this.datetime3
                };
                let res = await this.$axios.get("/transrecords",params);
                if(res.state == "00"){
                    console.log(res);
                    this.orderList = [...this.orderList,...res.dataList];
                    if(!isNull(res.countMoney)){
                        this.countMoney = res.countMoney;
                    }
                    return res.dataList;
                }else{
                    return [];
                }
            },
            async upCallback(page, mescroll){
                if(isNull(this.datetime3) || this.datetime3 == "2009-01"){
                    this.datetime3 = moment().format('YYYY-MM');
                    console.log(this.datetime3);
                    return;
                }
                console.log("orderinfo upCallback start");
                let data = await this.findOrderList(page.num,page.size);
                console.log("upCallback");
                mescroll.endSuccess(data.length);
                console.log("orderinfo upCallback end");
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
    .center{
         padding-left: 8px;
        padding-right: 8px
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .login-img {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-bottom: 1px solid #ccc
    }
    h1 {
        font-size: 32px;
    }
    .one span {
        font-size: 18px;
        font-weight: 700
    }
    .left:hover {
        color: #1D75D6
    }
    h3 {
        padding-top: 13px;
        font-size: 15px;
        font-weight: 400;
        text-align: center;
    }
    h2 {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-weight: 400;
        text-align: center;
        font-size: 15px;
    }
    .header-body {
        padding-left: 8px;
        padding-right: 8px;
        width: 100%;
        height: 40px;
        background-color: #eee;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .right {
        width: 100px;
        height: 30px;
        border-radius: 13px;
        background-color: #fff;
        text-align: center;
        position: relative;
        line-height: 30px;
    }
    .im {
        position: absolute;
        top: 34%;
        right: 10%;
    }
    .sa {
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .bill {
        padding-left: 10px;
        padding-right: 10px;
    }
    .one {
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .center h1 {
        font-size: 16px;
        margin-top: 10px;
    }
    .center p {
        font-size: 12px;
        margin-top: 8px;
    }
    #btn1 {
        border-radius: 20px;
        width: 130px;
        height: 35px;
        text-align: left;
    }
    .number{
        padding-left: 8px;
        margin: 20px;
        display: flex;
        align-items: center;
        color: #c3c3c3;
    }
    .countMoney{
        font-size: 20px;
    }
</style>

