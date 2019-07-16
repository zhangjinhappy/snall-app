<template>
    <div class="card">
        <navbar :navname="chang"></navbar>
        <div class="center">
            <span class="center-money">￥</span><input type="text" v-model="params.repaymentmoney" class="btn8" placeholder="请输入金额">
        </div>
        <div class="time" @click="open">
            <h2>账单开始日期</h2>
            <div class="open">
                <yd-datetime type="date" :startDate="startdate"  v-model="params.starttime" slot="right"></yd-datetime>
                <yd-navbar-next-icon></yd-navbar-next-icon>
            </div>
        </div>
        <div class="time" @click="open">
            <h2>账单截止日期</h2>
            <div class="open">
                <yd-datetime type="date" :startDate="params.starttime" :endDate="enddate" v-model="params.endtime" slot="right"></yd-datetime>
                <yd-navbar-next-icon></yd-navbar-next-icon>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="btn0" @click="gomap">
            <input type="button" class="input" value="确认">
        </div>
        <br>
        <br>
        <div class="content">
            <span class="clice">!</span>
            <div style="font-size: 15px;color: #666666;padding-left:10px;">提示:</div>
        </div>
        <p class="footer">
            输入需要还款的金额以后，系统会自动生成精养卡的账单规划， 随后只要根据账单规划的商户到制定的乐刷M70机器上消费即可
        </p>
        <div class="btn4" @click="plan">
            计划查看
        </div>
    </div>
</template>
<script>
    import navbar from '../subcomponents/nav.vue'
    import {thisFormatDateTime,nextNDate} from '../../util/TimeUtils';

    export default {
        data() {
            return {
                chang: '精养卡',
                params:{
                    repaymentmoney : "",
                    starttime:"2019-05-06",
                    endtime:"2019-05-15"
                },
                startdate:"2019-05-06",//限制开始时间
                enddate:"2019-05-06"//限制结束时间
            }
        },
        methods: {
            open() {
                this.$refs.datetime.open();
            },
            async gomap(){
                if(this.params.repaymentmoney<1000){
                    this.$dialog.toast({
                        mes: "金额太小啦",
                        timeout: 1500
                    });
                    return;
                }
                let res = await this.$axios.get("/repaymentDetailed",this.params);
                if(res.state=="00"){
                    res.data.repaymentmoney = this.params.repaymentmoney;
                    res.data.starttime = this.params.starttime;
                    res.data.endtime = this.params.endtime;
                    localStorage.setItem("cardsystem",JSON.stringify(res.data));
                    this.$router.push({name:"mapsystem"})
                }else{
                    this.$dialog.toast({
                        mes: res.msg,
                        timeout: 1500
                    });
                }
            },
            plan() {
               this.$router.push({name:"plansystem"})
            }
        },
        created(){
            this.params.starttime = moment(thisFormatDateTime()).format('YYYY-MM-DD');
            this.startdate = moment(thisFormatDateTime()).format('YYYY-MM-DD');
            this.enddate = moment(nextNDate(30)).format('YYYY-MM-DD');
            this.params.endtime = moment(nextNDate(30)).format('YYYY-MM-DD');
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
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .clice {
        width: 17px;
        height: 17px;
        border: 1px solid #FA9E22;
        border-radius: 50%;
        text-align: center;
        line-height: 17px;
        color: #FA9E22
    }
    .center-money {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        font-weight: 700;
        height: 60px;
        line-height: 46px;
        color: #333333;
    }
    input::-webkit-input-placeholder {
        color: #cccccc
    }
    .btn8 {
        border: 0;
        font-size: 18px;
    }
    h2 {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #333333;
    }
    .center {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 20px;
        padding-top: 35px;
    }
    .time {
        width: 100%;
        height: 44px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        align-items: center;
        background-color: #fff;
        justify-content: space-between;
        border-top: 1px solid #ccc;
    }
    .open {
        width: 30%;
        height: 44px;
        display: flex;
        align-items: center;
    }
    .btn0 {
        padding: 0 20px;
    }
    .input {
        width: 100%;
        height: 44px;
        border-radius: 5px;
        background: #1D75D6;
        font-size: 15px;
        color: #FFFFFF;
    }
    .content {
        padding-left: 10px;
        display: flex;
        align-items: center;
    }
    .footer {
        padding-left: 37px;
        padding-right: 37px;
    }
    .btn4 {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 44px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        line-height: 44px;
        color: #FFFFFF;
        background: #1D75D6;
    }
</style>


