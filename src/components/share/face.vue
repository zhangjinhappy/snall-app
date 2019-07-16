<template>
    <div class="bill-content">
        <yd-navbar :title="chang"> </yd-navbar>
        <br>
        <div class="center">
        <div class="bg">
            <label for=""><img v-lazy="'../../lib/public/images/zhu2.png'" alt="" width="40" height="40"></label>
            <input type="tel" v-model="params.phonenumber" placeholder="请输入手机号">
        </div>
        <div class="bg">
            <label><img v-lazy="'../../lib/public/images/zhu1.png'" alt="" width="40" height="40"></label>
            <input type="password" v-model="params.password" placeholder="请输入密码">
        </div>
        <div class="bg"> 
            <label><img v-lazy="'../../lib/public/images/zhu1.png'" alt="" width="40" height="40"></label>
            <input type="password" v-model="params.pw" placeholder="请再输入密码">
        </div>
        <div class="bg">
            <img v-lazy="'../../lib/public/images/zhu3.png'" alt="" width="40" height="40">
            <input type="text" class="regisrer-a" slot="right" ref="input2" v-model="params.phoneCode" placeholder="请输入验证码">
            <yd-sendcode class="a-a" slot="right" v-model="start1" @click.native="sendCode1" type="primary"></yd-sendcode>
        </div>
        <br>
        <br>
        <yd-button size="large" class="bt" type="primary" @click.native="submit" bgcolor="#1D75D6" color="#fff">注册</yd-button>
    </div>
    </div>
</template>
<script>
    import {R_parse_PhoneNumber} from "../../util/Regular";

    export default {
        data() {
            return {
                chang: "面对面注册",
                start1: false,
                params:{
                    phonenumber:"",
                    password:"",
                    pw:"",
                    phoneCode:""
                }
            }
        },
        created() {
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
           async sendCode1(){
               if(!R_parse_PhoneNumber.test(this.params.phonenumber)){
                   this.$dialog.toast({
                       mes: '手机号格式不正确',
                       timeout: 1500
                   });
                   return ;
               }
               this.$dialog.loading.open('发送中...');
               let res = await this.$axios.get("/customer/getCode/"+this.params.phonenumber);
               this.start1 = true;
               this.$dialog.loading.close();
               if(res.state=="00"){
                   this.$dialog.toast({
                       mes: '已发送',
                       icon: 'success',
                       timeout: 1500
                   });
               }else{
                   this.$dialog.toast({
                       mes: res.msg,
                       timeout: 1500
                   });
               }

           },
           async submit(){

               if(!R_parse_PhoneNumber.test(this.params.phonenumber)){
                   this.$dialog.toast({
                       mes: '手机号格式不正确',
                       timeout: 1500
                   });
                   return ;
               }
               if(this.params.password.length<6||this.params.password.length>18){
                   this.$dialog.toast({
                       mes: '密码要6到18位',
                       timeout: 1500
                   });
                   return ;
               }
               if(this.params.password!=this.params.pw){
                   this.$dialog.toast({
                       mes: '两次输入密码不一样',
                       timeout: 1500
                   });
                   return ;
               }
               if(this.params.phoneCode.length!=6){
                   this.$dialog.toast({
                       mes: '验证码不正确',
                       timeout: 1500
                   });
                   return ;
               }

               this.$dialog.loading.open('注册提交中...');
               let res = await this.$axios.post("/customer/oppRegister",this.params);
               this.$dialog.loading.close();
               if(res.state == "00"){
                   this.$dialog.toast({
                       mes: "注册成功",
                       icon: 'success',
                       timeout: 1500
                   });
                   this.params= {
                       phonenumber:"",
                       password:"",
                       pw:"",
                       phoneCode:""
                   };
               }else{
                   this.$dialog.toast({
                       mes: res.msg,
                       timeout: 1500
                   });
               }
           }
        },
        components: {

        }
    }
</script>
<style scoped>
    .center{
        padding-left: 10px;
        padding-right: 10px
    }
    .bg{
        display: flex;
        align-items: center;
        background-color: #fff;
        margin-top: 6px;
        height: 50px;
    }
    input[type='text'],input[type='tel'],input[type='password']{
        border: 1px solid rgba(0, 0, 0, 0);
         margin-bottom: 0px; 
    }
    .a-a{
        height: 40px;
        background-color: #1D75D6;
        border-radius: 5px 5px 5px 5px;
        color: #C6DCF5
    }
    .yd-navbar{
  border-bottom: 1px solid #ccc;
} 
.bt{
    border-radius: 5px;
}
</style>

