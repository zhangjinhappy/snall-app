<template>
    <div class="bill-content">
        <navbar :navname="chang"></navbar>
        <div class="header-top">
            <table>
                <tr class="date">
                    <th class="c">日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th class="c">六</th>
                </tr>
            </table>
            <div class="table-header">
                <ul class="b">
                    <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                    <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                        <span class="choose-year">{{ currentYear }}年</span>
                        <span class="choose-month">{{ currentMonth }}月</span>
                    </li>
                    <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
                </ul>
            </div>
            <div class="table-body">
                <ul class="days">
                    <li v-for="(dayobject,i) in days" :key=i class="daylist">
                        <!-- class="other-month"  有任务的class -->
                        <!--  class="active" 当前选中的class-->
                        <a href="javascript:void(0)" v-for="obj,key in cardsystem.countList" :class="{'active': key==thisDay }" :key="key" v-if="datedifference(dayobject.day,obj.date)==0" @click="setThisDay(key,obj.date)">
                                {{ dayobject.day.getDate()}}
                        </a>
                        <!--<span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                        <span v-else-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                        <span v-else>{{ dayobject.day.getDate() }}</span>-->
                    </li>
                </ul>
            </div>
        </div>
        <!-- 内容区域一 -->
        <div v-for="obj,key in cardsystem.countList" :key="key"  :id="'anchor'+obj.date.replace(/-/g,'')">
            <div class="map-content">
                <div class="map-l">
                    <span>{{obj.date}}</span>&nbsp;&nbsp;&nbsp;<span>{{getWeekDate(obj.date)}}</span>
                </div>
                <div class="map-r">
                    <span>共{{obj.list.length}}/{{cardsystem.repaymentcount}}笔</span>&nbsp;&nbsp;&nbsp;<span> {{obj.dayamount}}/{{cardsystem.repaymentmoney}}</span>
                </div>
            </div>
            <!-- 下一个内容 -->
            <div class="plan" v-for="o,k in obj.list" :key="k">
                <div class="plan-l">
                    <img src="../../lib/public/images/Group3.png" alt="2323" width="32" height="32">
                    <h2 style="font-size: 13px;color: #333333;font-weight:400">{{o.hourtime}}</h2>
                </div>
                <div class="plan-c">
                    <h1 id='peng' @click="open(key,k)">
                        {{o.mcctype}}
                    </h1>
                    <yd-navbar-next-icon></yd-navbar-next-icon>
                </div>
                <div class="plan-r">
                    <h1>￥{{o.amount}}</h1>
                </div>
            </div>
        </div>
        <div class="btnr">
            <yd-button size="large" class="a" bgcolor="#1D75D6" color="#fff" type="primary" @click.native="userheader">确定</yd-button>
        </div>
        <!-- 弹框 -->
    <vue-pickers
      :show="show"
      :columns= 1
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn"></vue-pickers>
    </div>
</template>
<script>
    import {datedifference,getWeekDate} from '../../util/TimeUtils'
    import navbar from '../subcomponents/nav.vue'
    import {isNull} from "../../util/Is";
    import vuePickers from 'vue-pickers'
    export default {
        data() {
            return {
                chang: "我的方案",
                show2: false,
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                cardsystem:{},//所有计划对象
                thisDay:0,//当前选中的天数坐标
                thisTime:0,//当前天选中的时间坐标
                show: false,
                pickData: {data1:[{text:"餐饮",value:"餐饮"},{text:"娱乐",value:"娱乐"},{text:"住宿",value:"住宿"},{text:"生活",value:"生活"},{text:"购物",value:"购物"},{text:"加油站",value:"加油站"}]}
            }
        },
        created() {
            let cardsystem = localStorage.getItem("cardsystem");
            if(isNull(cardsystem)){
                this.$router.back(-1);
            }
            // localStorage.removeItem("cardsystem")
            this.cardsystem = JSON.parse(cardsystem);
            console.log(1);
            console.log(this.cardsystem);
            this.initData(this.cardsystem.countList[0].date);
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
            async userheader(){

                // this.cardsystem.repaymentplan = {
                //     "starttime": this.cardsystem.starttime,
                //     "endtime": this.cardsystem.endtime,
                //     "repaymentmoney": this.cardsystem.repaymentmoney,
                // }
                // delete this.cardsystem.starttime;
                // delete this.cardsystem.endtime;
                // delete this.cardsystem.repaymentmoney;
                let res = await this.$axios.apost("/repaymentDetailed",this.cardsystem,{"Content-Type": "application/json; charset=UTF-8"});
                console.log(res);

            },
            close(){this.show = false},
            open(daykey,timeKey){
                this.show = true;
                this.thisDay = daykey;
                this.thisTime = timeKey;
            },
            confirmFn(val) {
                this.show = false;
                this.cardsystem.countList[this.thisDay].list[this.thisTime].mcctype = val.select1.text;
            },
            toShow() {
                this.show = true
            },
            // 类似 2019-05-01 格式的字符串
            formatDate(year, month, day) {
                let y = year;
                let m = month;
                if (m < 10) m = "0" + m;
                let d = day;
                if (d < 10) d = "0" + d;
                return y + "-" + m + "-" + d
            },
            setThisDay(key,selector){
                this.thisDay = key;
                let anchor = this.$el.querySelector('#anchor'+selector.replace(/-/g,''));
                document.documentElement.scrollTop = anchor.offsetTop
            },
            initData(cur) {
                let leftcount = 0; //存放剩余数量
                let date;
                let now;
                if (cur) {
                    now = new Date(cur);
                } else {
                    now = new Date();
                }
                let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                d.setDate(35);
                date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));

                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;
                this.currentWeek = date.getDay(); // 1...6,0
                // if (this.currentWeek == 0) {
                //     this.currentWeek = 7;
                // }
                let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (let i = this.currentWeek ; i >= 0; i--) {
                    let d = new Date(str);
                    d.setDate(d.getDate() - i);
                    let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day = d;
                    this.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (let i = 1; i <= 34- this.currentWeek; i++) {
                    let d = new Date(str);
                    d.setDate(d.getDate() + i);
                    let dayobject = {};
                    dayobject.day = d;
                    this.days.push(dayobject);
                }
            },
            pickPre(year, month) {
                //要判断有没有这个月的计划
                let d = new Date(this.formatDate(year, month, 1));
                // setDate(-1); 上月倒数第二天
                // setDate(0); 上月最后一天
                let flag = true;
                for(let i=0;i<this.cardsystem.countList.length;i++){
                    let _d = new Date(this.cardsystem.countList[i].date);
                    if(_d.getFullYear()+""+(_d.getMonth()+1)===d.getFullYear()+""+d.getMonth()){
                        d.setDate(0);
                        flag = false;
                        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                        break;
                    }
                }
                if(flag){

                    this.$dialog.toast({
                        mes: "没有"+d.getMonth()+"月的计划",
                        timeout: 1000
                    });
                }
            },
            pickNext(year, month) {
                //要判断有没有这个月的计划
                let d = new Date(this.formatDate(year, month, 1));
                d.setDate(42);
                let flag = true;
                for(let i=0;i<this.cardsystem.countList.length;i++){
                    let _d = new Date(this.cardsystem.countList[i].date);
                    if(_d.getFullYear()+""+(_d.getMonth()+1)===d.getFullYear()+""+(d.getMonth()+1)){
                        flag = false;
                        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                        break;
                    }
                }
                if(flag){
                    this.$dialog.toast({
                        mes: "没有"+(d.getMonth()+1)+"月的计划",
                        timeout: 1000
                    });
                }

            },
            pickYear(year, month) {
            },
            datedifference,getWeekDate
        },
        components: {
            navbar,
           vuePickers
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff;
        padding-bottom: 50px;
    }
    .header-top {
        width: 100%;
        height: 310px;
    }
    table {
        width: 100%;
    }
    .date {
        font-size: 14px;
        height: 40px;
        background-color: #F5F5F5;
        color: #666666;
    }
    .date1 {
        text-align: center;
        font-size: 14px;
        height: 40px;
    }
    .c {
        color: #E77C19;
    }
    tr td {
        text-align: center;
        height: 40px;
        font-size: 16px;
        color: #333333;
    }
    .map-content {
        /* height: 50px; */
        display: flex;
        background-color: #F5F5F5;
    }
    .map-l {
        width: 40%;
        height: 100%;
        font-family: PingFangSC-Regular;
        text-align: center;
        font-size: 13px;
        color: #333333;
        line-height: 40px
    }
    .map-r {
        width: 60%;
        height: 100%;
        font-family: PingFangSC-Regular;
        text-align: center;
        font-size: 13px;
        color: #333333;
        line-height: 40px
    }
    .plan {
        padding: 0 10px;
        width: 100%;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #ccc;
    }
    .plan-l {
        width: 26%;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .plan-c {
        width: 54%;
        height: 54px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: #333333;
    }
    .plan-r {
        width: 20%;
        display: flex;
        justify-content: space-around;
    }
    .btnr {
        width: 100%;
        height: 60px;
        position: fixed;
        background-color: #fff;
        padding-left: 25px;
        padding-right: 25px;
        bottom: 0;
    }
    .a {
        height: 40px;
        margin-top: 10px
    }
    .table-header {
        height: 40px;
        width: 100%;
    }
    .b {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 60%;
        height: 40px;
        margin: 0 auto;
    }
    .arrow {
        font-size: 18px;
        font-weight: 800;
    }
    .year-month {
        font-size: 16px;
        color: #333333
    }
    .active{
        display: block;
        height: 30px;
        width: 30px;
        margin: 0 auto;
        border-radius: 50%;
        background-color: #D8BC83;
    }
    .other-month{
        display: block;
        height: 30px;
        width: 30px;
        color: #00f;
        margin: 0 auto;
        border-radius: 50%;
        background-color: #cccccc;
    }
    .table-body{
        width: 100%;
        height: 220px;
    }
    .days{
        width: 100%;
        height: 100%;
    }
    #peng{
       font-size: 14px;
       font-weight: 400;
    }
    .daylist{
        width: 14.2%;
        float: left;
        height: 40px;
        text-align: center;
        line-height: 34px;
        line-height: 24px;
        font-size: 15px;
        font-weight: 700;
    }
</style>

