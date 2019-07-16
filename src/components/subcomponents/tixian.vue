<template>
    <div class="bill-content">
     <yd-navbar :title="chang">
     </yd-navbar>
     <div class="center">
       <div class="login-img">
           <img src="../../lib/public/images/r3.png" alt="11">
           <p class="p">申请提现成功</p>
      </div>
      <div class="bill-body">
           <yd-preview-item>
            <div slot="left">商户名称</div>
            <div slot="right">{{userInfo.customer.name}}</div>
        </yd-preview-item>
        <yd-preview-item>
            <div slot="left">手机号</div>
            <div slot="right">{{userInfo.customer.phonenumber}}</div>
        </yd-preview-item>
        <yd-preview-item>
            <div slot="left">提现金额</div>
            <div slot="right">￥{{bankInfo.money}}</div>
        </yd-preview-item>

         <!--<yd-preview-item>
            <div slot="left">手续费</div>
            <div slot="right">6%+2</div>
        </yd-preview-item>
         <yd-preview-item>
            <div slot="left">实际到账</div>
            <div slot="right">￥19878</div>
        </yd-preview-item>-->

         <yd-preview-item>
            <div slot="left">到账卡号</div>
            <div slot="right">***********{{bankInfo.cardno.substr(bankInfo.cardno.length-4)}}</div>
        </yd-preview-item>
         <yd-preview-item>
            <div slot="left">提现时间</div>
            <div slot="right">{{time}}</div>
        </yd-preview-item>
          </div> 
       
        <br>
        <div class="btn8">
            <mt-button size="large" type="primary" @click="back">完成</mt-button>
        </div>
    </div>
    </div>
</template>
<script>
    import {USERINFO} from '../../store/types';
    import {isNull} from "../../util/Is";
    import {thisFormatDateTime} from '../../util/TimeUtils';
export default {
    data(){
        return{
       chang:"提现",
            userInfo:{},
            bankInfo:{},
            time:""
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
        init(){
            console.log("tixian init start");
            this.time = thisFormatDateTime();
            this.userInfo = JSON.parse(this.$store.state[USERINFO]);
            this.bankInfo = JSON.parse(localStorage.getItem("torder"));
            localStorage.removeItem("torder");
            if(isNull(this.bankInfo)){
                this.$router.back(-1);
            }
            console.log("tixian init end");
        },
        back(){
            this.$router.back(-2);
        }

    },
    components:{

    }

    
}
</script>
<style scoped>
.bill-content{
  background-color: #fff;
}
.center{
   padding-left: 10px;
  padding-right: 10px 
}
.login-img{
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .yd-navbar{
  border-bottom: 1px solid
}
 .btn8{
     padding-left: 20px;
     padding-right: 20px;
 }
 .bill-body{
     padding: 0 10px;
 }
 .p{
     padding-top: 16px;
     font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
 }
</style>

