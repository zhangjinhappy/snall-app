<template>
  <div class="shou-content">
    <yd-navbar :title="chang">
      <router-link to="/login1" slot="left">
        <yd-navbar-back-icon>其他登录</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <!-- 头部 -->
    <div class="center">
      <div class="login-img">
        <img src="../../lib/public/images/jixianglogo.png" alt="222">
      </div>
      <!-- 手机号 -->
      <input type="text" slot="right" ref="input1" v-model="params.phonenumber" placeholder="请输入手机号码" style="background-color:#eeeeee">
      <!-- 获取验证码 -->
      <div class="regisrer-login">
        <input type="text" class="regisrer-a" slot="right" ref="params.phoneCode" v-model="params.phoneCode" placeholder="请输入验证码" style="background-color:#EEEEEE">
        <!-- ↓↓关键代码是这里↓↓ -->
        <yd-sendcode class="a-a" slot="right" ref="start1" v-model="start1" @click.native="sendCode1" type="primary"></yd-sendcode>
        <!-- ↑↑关键代码是这里↑↑ -->
      </div>
      <yd-button size="large" type="primary" @click.native="userlogin" bgcolor="#1D75D6" color="#fff">登录</yd-button>
      <div class="user">
        <!-- <a href="#/regisrer">没有账号？注册</a> -->
        <span></span>
        <div @click.stop="tologin">使用密码登录</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    yzm
  } from '../../api/indexapi.js'
  import {R_parse_PhoneNumber} from "../../util/Regular";
  export default {
    data() {
      return {
        start1: false,
        chang: "手机登录",
          params:{
              phonenumber:"",
              phoneCode:""
          }
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
        tologin(){
            this.$router.push({
                name: "login"
            })
        },
      async userlogin() {
        console.log("userlogin start");
          if(!R_parse_PhoneNumber.test(this.params.phonenumber)){
              this.$dialog.toast({
                  mes: '登录手机号填写的不正确',
                  timeout: 1500
              });
              return;
          }
          if(this.params.phoneCode.length!=6){
              this.$dialog.toast({
                  mes: '验证码不正确',
                  timeout: 1500
              });
              return;
          }
        let res = await this.$axios.post("/customer/login",this.params);
        if(res.state == "00"){
            this.$router.push({
                name: "home"
            })
        }else{
            this.$dialog.toast({
                mes: res.msg,
                timeout: 1500
            });
        }

        console.log("end start");
      },
      async sendCode1() {
          console.log("sendCode1 sendCode1 start");
          if(!R_parse_PhoneNumber.test(this.params.phonenumber)){
              this.$dialog.toast({
                  mes: '登录手机号填写的不正确',
                  timeout: 1500
              });
              return;
          }
        this.$dialog.loading.open('发送中...');

        let res = await this.$axios.get("/customer/getCode/"+this.params.phonenumber);
        if(res.state == "00"){

            this.start1 = true;
            this.$dialog.loading.close();
            this.$dialog.toast({
                mes: '已发送',
                icon: 'success',
                timeout: 1500
            });
        }
        console.log("sendtoCode1 sendCode1 send");
      }
    }
  }
</script>
<style scoped>
  .shou-content {
    height: 720px;
    background-color: #fff
  }
  .center {
    padding-left: 10px;
    padding-right: 10px
  }
  .user {
    margin-top: 18px;
    padding-right: 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between
  }
  .a-a {
    height: 37px;
    width: 25%;
    background-color: #fff;
    color: black;
    margin-bottom: 15px;
    border: 1px solid
  }
  .yd-navbar {
    border-bottom: 1px solid
  }
  .regisrer-login {
    display: flex;
    align-items: center;
    justify-content: space-between
  }
  .regisrer-a {
    width: 65%;
  }
  .user a {
    padding-right: 5px
  }
  .login-img {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .yd-btn-block {
    margin-top: 0rem;
  }
</style>


