<template>
    <div class="login-content">
        <yd-navbar :title="chang">
            <router-link to="/login1" slot="left">
                <yd-navbar-back-icon>其他登录</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="center">
            <div class="login-img">
                <img v-lazy="'../../lib/public/images/jixianglogo.png'" alt="11">
            </div>
            <input type="text" slot="right" ref="phone" max="11" required v-model="params.phonenumber" placeholder="请输入手机号" style="background-color:#EEEEEE">
            <input type="password" slot="right" ref="pwd" placeholder="请输入密码(6-18)" minlength="6" maxlength="18" v-model="params.password" style="background-color:#EEEEEE">
            <yd-button size="large" type="primary" @click.native="clickname" bgcolor="#1D75D6" color="#fff">登录</yd-button>
            <div class="user">
                <div @click.stop="toname('wpsw')">忘了密码？</div>
                <div @click.stop="toname('phonelogin')">使用短信验证登录</div>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="pop"  v-if="flag">
            <div class="pop-center">
                <h1>提示</h1>
                <p>该账号没有注册，请先去注册</p>
                <div class="pop-footer">
                    <div class="pop-l" @click="kown()">知道了</div>
                    <div class="pop-r" @click="zip()">去注册</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {R_parse_PhoneNumber} from "../../util/Regular.js"
    export default {
        data() {
            return {
                chang: "登录",
                params: {
                    phonenumber: "18056619990",
                    password: "888888"
                },
                flag:false
            }
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
        },
        methods: {
            toname(name){
                this.$router.push({
                    name: name
                })
            },
            zip(){
             this.$router.push({name:"phonelogin1"})
            },
            kown(){
              this.flag=false
            },
            async clickname() {
                if (R_parse_PhoneNumber.test(this.params.phonenumber)) {
                    let data = await this.$axios.post("/customer/login", this.params);
                    if (data.state == "00") {
                        this.$router.push({
                            name: "home"
                        })
                    }else if(data.state == "06"){
                        this.flag=true
                    }else{
                        this.$dialog.toast({
                            mes: data.msg,
                            timeout: 1500
                        })
                    }
                } else {
                    this.$dialog.toast({
                        mes: "请确定手机号",
                        timeout: 1500
                    })
                }
            }
        }
    }
</script>
<style scoped>
   .pop{
       width: 100%;
       height: 100%;
       z-index: 99;
       position: fixed;
       top: 0;
       background-color: rgba(0, 0, 0, 0.3)
   }
   .pop-center{
       width: 60%;
       height: 127px;
       position: absolute;
       top:50%;
       left: 50%;
       border-radius: 15px;
       background-color: #fff;
       transform: translate(-50%,-50%)
   }
   .pop-center>h1{
      width: 100%;
      height: 40px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
   }
    .pop-center>p{
       color: #333333;
       height: 36px;
       font-size: 12px;
       text-align: center;
    }
    .pop-footer{
      width: 100%;
      display: flex;
      align-items: center;
      border-top: 1px solid #ccc;
    }
    .pop-l, .pop-r{
      width: 50%;
      height: 50px;
      text-align: center;
      line-height: 50px
    }
    .pop-l{
      border-right: 1px solid #cccccc;
      border-radius: 0 0 0 15px;
    }
    .pop-r{
      border-radius: 0 0 15px 0;
      color: #1D75D6;
    }
   .login-content{
       background-color: #fff;
       height: 730px;
   }
    .center{
            padding-left: 10px;
            padding-right: 10px
        } 
    .yd-navbar {
        border-bottom: 1px solid
    }
    .yd-btn-block {
        margin-top: 0rem;
    }
    input[type='text'] {
        width: 100%;
    }
    .login-img {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .user {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 18px;
        display: flex;
        justify-content: space-between
    }
    .user a {
        font-size: 14px;
    }
</style>


