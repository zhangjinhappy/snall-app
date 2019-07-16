<template>
    <div class="order-content">
      <yd-navbar :title="chang"> </yd-navbar>
       <div class="center">
        <div class="login-img">
            <img v-lazy="'../../lib/public/images/su.png'" alt="111S">
            <p>支付成功</p>
       </div>
       <yd-button size="large" type="primary" @click="mall">回到积分商城</yd-button>
       <yd-button size="large" type="hollow" @click="order">查看订单</yd-button>
    </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
        chang:"支付详情"
      }
    },
    methods:{
      mall(){
        this.$router.push({name:score})
      },
      order(){
        this.$router.push({name:order1})
      }
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
}
</script>
<style scoped>
.order-content{
 background-color: #fff
}
.center{
   padding-left: 10px;
  padding-right: 10px
}
.login-img{
   padding-top: 30px;
    height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
   .yd-navbar {
    border-bottom: 1px solid
}
  p{
    font-size: 14px;
  }
</style>


