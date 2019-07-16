<template>
    <div class="bill-content">
     <yd-navbar :title="chang">
     </yd-navbar>
       <div class="login-img">
           <img src="../../lib/public/images/r3.png" alt="11">
           <p class="p">申请提现成功</p>
      </div>
      <div class="bill-body">
           <yd-preview-item>
            <div slot="left">商户名称</div>
            <div slot="right">李**</div>
        </yd-preview-item>
        <yd-preview-item>
            <div slot="left">手机号</div>
            <div slot="right">1888888888</div>
        </yd-preview-item>
        <yd-preview-item>
            <div slot="left">提现金额</div>
            <div slot="right">￥500</div>
        </yd-preview-item>
         <yd-preview-item>
            <div slot="left">手续费</div>
            <div slot="right">6%+2</div>
        </yd-preview-item>
         <yd-preview-item>
            <div slot="left">实际到账</div>
            <div slot="right">￥19878</div>
        </yd-preview-item>
         <yd-preview-item>
            <div slot="left">到账卡号</div>
            <div slot="right">***********888888</div>
        </yd-preview-item>
         <yd-preview-item>
            <div slot="left">提现时间</div>
            <div slot="right">2017-11-10 05:25:16</div>
        </yd-preview-item>
          </div> 
       
        <br>
        <div class="btn8">
            <mt-button size="large" type="primary">完成</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
       chang:"提现"
        }
    },
    created(){

    },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
           vm.$parent.$data.showfooter=false
           vm.$parent.$data.showmenu=false
        })
    },
    beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true
            this.$parent.$data.showmenu=true
           next()
    },
    methods:{

    },
    components:{

    }

    
}
</script>
<style scoped>
.bill-content{
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

