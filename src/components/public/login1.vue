<template>
  <div class="login1_content">
    <!-- 头部 -->
    <div class="login-img">
      <img v-lazy="'../../lib/public/images/jixianglogo.png'" alt="2222">
    </div>
    <div class="center">
      <!-- 按钮 -->
<!--
      <yd-sendcode v-model="start2" @click.native="sta1" second="10" init-str="微信登录.免登录" run-str="在{%s}秒后你就可以重新登陆啦" reset-str="正在登陆中...." size="large" type="primary"><img v-lazy="'../../lib/public/images/hy.png'" alt=""></yd-sendcode>
-->
      <yd-button size="large" type="hollow" @click.native="sta2">手机号登录</yd-button>
      <yd-button size="large" type="hollow" @click.native="sta3">手机一键注册</yd-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        start2: false,
        start3: false,
        start4: false
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // vm.$emit("footerTitle",false)
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
      sta1() {
        this.start2 = true;
        this.$router.push({
          name: "login"
        })
        //    this.$router.push({name:"classinfo",params:{id:ids}})
      },
      sta2() {
        this.$router.push({
          name: "phonelogin"
        })
      },
      sta3() {
        this.$router.push({
          name: "phonelogin1"
        })
      }
    }
  }
</script>
<style scoped>
  .login1_content {
    height: 730px;
    background-color: #fff;
  }
  .center{
     padding-left: 10px;
    padding-right: 10px;

  }
  .login-img {
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .yd-btn-hollow:not(.yd-btn-loading) {
    background-color: #fff;
    border: 1px solid;
  }
</style>


