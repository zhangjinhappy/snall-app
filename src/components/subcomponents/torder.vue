<template>
  <div class="bill-content">
    <yd-navbar :title="chang"> </yd-navbar>
    <div class="center">
    <!-- 内容头部区域 -->
    <div class="bill-body">
      <div class="bill-l">
        <h2>到账银行卡</h2>
        <h3 v-for="(obj,key) in banklist" :key="key" v-if="obj.bankcode==bankInfo.bankcode">{{obj.bankname}}({{bankInfo.cardno.substr(bankInfo.cardno.length-4)}})</h3>
      </div>
      <h4 class="bill-p">单笔提现最低10元,&nbsp;2小时内到账</h4>
    </div>
    <div class="torder-body">
      <h1>提现金额</h1>
      <div class="money">
        <i>￥</i><input type="number" v-model="params.money" name="" id="">
      </div>
    </div><br>
    <p class="y">当前可提现余额{{thisCountProfit}}元</p>
    <br>
    <br>
    <div class="btn">
      <input type="button" value="提现" class="cbtn" @click="withdraw">
    </div>
  </div>
  </div>
</template>
<script>
  import {isNull} from "../../util/Is";

  export default {
    data() {
      return {
        chang: "提现",
          params:{
              money:""
          },
          bankInfo:{},
          banklist:[],
          thisCountProfit:0//当前可提现余额
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
      func() {

      },
       async withdraw(){
          console.log("withdraw start");
          let data = await this.$axios.post("/custpostcash/insertpostcash",this.params);
          console.log(data);
          if(data.state=="00"){
              let params = {
                  bankInfo: this.bankInfo,
                  money:this.money
              };
              this.bankInfo.money = this.params.money;
              localStorage.setItem("torder",JSON.stringify(this.bankInfo));
              this.$router.push({
                  name: "tixian"
              })
          }
          console.log("withdraw end");
        },
       async init(){
          console.log("init start");
          this.thisCountProfit = localStorage.getItem("thisCountProfit");
           localStorage.removeItem("thisCountProfit");
           if(isNull(this.thisCountProfit)){
              this.$router.back(-1);
           }


          let res = await this.$axios.get("/bankInfo");
          console.log(res);
          if(res.state == "00"){
            this.bankInfo = res.data;
          }
          console.log(this.bankInfo);
          console.log("init end");
          this.getBank()
        },
        async getBank(){
            console.log("getBank start");
            if (this.banklist.length == 0) {
                let data = await this.$axios.get("/bankTotal");
                this.banklist = data.data;
                console.log(this.banklist);
            }
            console.log("getBank end");
        }

    },
    components: {}
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
  .bill-body {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #cccccc;
  }
  .bill-l {
    display: flex;
    align-items: center;
  }
  .bill-l h2 {
    font-size: 18px;
    color: #333333;
    text-align: center;
  }
  .bill-r {
    padding-left: 10px;
  }
  .bill-l h3 {
    padding-left: 30px;
    font-size: 16px;
    color: #1D75D6;
  }
  .bill-p {
    padding-left: 120px;
    padding-top: 10px;
    font-size: 13px;
    color: #999999
  }
  .torder-body h1 {
    height: 50px;
    text-align: left;
    padding-left: 10px;
    line-height: 50px;
    font-size: 18px;
  }
  .torder-body i {
    display: block;
    width: 40px;
    font-size: 40px;
    height: 40px;
  }
  .money {
    padding-left: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  input[type='number'] {
    border: 1px solid rgba(0, 0, 0, 0);
    font-size: 25px;
    font-weight: 600;
  }
  .y {
    padding-left: 10px;
  }
  .btn {
    padding-left: 10px;
    padding-right: 10px;
  }
  .cbtn{
    width: 100%;
    height: 45px;
    background-color: #1D75D6;
    color: #fff;
    border-radius: 8px;
  }
</style>

