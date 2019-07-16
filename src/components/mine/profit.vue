<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <div class="center">
            <div class="login-img">
                <img v-lazy="'../../lib/public/images/shou.png'" alt="11">
                <br>
                <h1 class="b">当前可提现的余额</h1><br>
                <h2 class="money">{{thisCountProfit}}元</h2>
            </div>
            <div class="bill-body">
                <div class="bill-left">
                    <h1>昨日收益</h1>
                    <h2>{{yearDayProfit}}元</h2>
                </div>
                <div class="bill-right">
                    <h1>今日收益</h1>
                    <h2>{{todayProfit}}元</h2>
                </div>
            </div>
            <yd-button size="large" type="primary" @click.native="clickname" bgcolor="#1D75D6" color="#fff" style=" border-radius: 8px;">我要提现</yd-button><br>
            <input type="button" class="btn3" value="提现记录" @click="clickname1">
            <!-- 累计收益 -->
            <div class="profit-footer">
                <h1>累计收益</h1>
                <h2>{{countProfit}}元</h2>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          chang:"我的收益",
            countProfit:0.00,
            thisCountProfit:0.00,
            todayProfit:0.00,
            yearDayProfit:0.00,
        }
    },
    created(){
        this.init();
    },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
           vm.$parent.$data.showfooter=false;
           vm.$parent.$data.showmenu=false
        })
    },
    beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true;
            this.$parent.$data.showmenu=true;
           next()
    },
    methods:{
      clickname(){
          localStorage.setItem("thisCountProfit",this.thisCountProfit);
          this.$router.push({name:"torder"})
      },
      clickname1(){
          this.$router.push({name:"recode"})
      },
        async init(){
          let res = await this.$axios.get("/customer/myProfit");
          console.log(res);
          this.countProfit = res.data.countProfit;
          this.thisCountProfit = res.data.thisCountProfit;
          this.todayProfit = res.data.todayProfit;
          this.yearDayProfit = res.data.yearDayProfit;
            // countProfit:0.00,
            //     thisCountProfit:0.00,
            //     todayProfit:0.00,
            //     yearDayProfit:0.00,
        }
    },
    components:{

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
    .login-img {
        height: 320px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .bill-body {
        display: flex;
        font-size: 14px;
        align-items: center;
        justify-content: space-around
    }
    .money {
        font-size: 26px;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .bill-body h2 {
        padding-top: 10px;
        text-align: center
    }
    .b {
        font-size: 15px;
        color: #333333;
        text-align: center;
    }
    .btn3 {
        border: 1px solid #1D75D6;
        height: 45px;
        width: 100%;
        color: #1D75D6;
        border-radius: 8px;
    }
    .profit-footer {
        padding-top: 24px;
        height: 60px;
        width: 100%;
    }
    .profit-footer h1,
    .profit-footer h2 {
        text-align: center;
        width: 100%;
        height: 20px;
        font-size: 16px;
        line-height: 20px;
    }
</style>

