<template>
    <div class="bill-content">
        <!--<yd-navbar :title="chang"></yd-navbar>-->
        <div class="center">
            <div class="login-img">
                <img v-lazy="'../../lib/public/images/jixianglogo.png'" alt="11">
            </div>
            <div class="content">
                <div class="table">
                    <input type="tel" placeholder="输入你的手机号" v-model="params.phonenumber">
                    <input type="password" placeholder="输入密码" v-model="params.password">
                    <input type="password" placeholder="再输入你的密码" v-model="password">
                    <div class="code">
                        <input type="text" class="btn2" placeholder="输入图形验证码" v-model="imageCode">
                        <div class="btn3" @click="setImageCode">
                            <img :src="imageurl" alt="11">
                        </div>
                    </div>
                    <div class="code">
                        <input type="text" class="btn2" placeholder="输入手机验证码" v-model="params.code">
                        <yd-sendcode class="btn4" slot="right" v-model="start" @click.native="sendCode" type="primary"></yd-sendcode>
                    </div>
                    <input class="btn1" type="button" value="注册" @click="userheader">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {R_parse_PhoneNumber} from '../../util/Regular'
    import config from '../../config/SystemConfig.js';
    import Aes from '../../util/Aes.js'
    export default {
        data() {
            return {
                chang: "注册",
                start: false,
                params:{
                    phonenumber:"",
                    password:"",
                    recommendPhone:"",
                    code:""
                },
                imageCode:"",
                imageurl:config["axios.defaults.baseURL"]+'/code',
                password:""
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
            init(){
                this.params.recommendPhone = Aes.decrypt(this.phonenumber);
                this.setImageCode();
            },
            setImageCode(){
                this.imageurl = config["axios.defaults.baseURL"]+'/code?' + new Date();
            },
            async userheader() {
                if (!R_parse_PhoneNumber.test(this.params.phonenumber)) { //验证注册手机号
                    this.$dialog.toast({
                        mes: "请输入正确的注册手机号码!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.params.password.length < 6 || this.params.password.length > 18) { //验证密码是否是正确的组合
                    this.$dialog.toast({
                        mes: "密码由6到18位数字或字母组成!",
                        timeout: 1500
                    });
                    return;
                }
                if(this.password !==this.params.password){
                    this.$dialog.toast({
                        mes: "两个密码不相同!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.params.code.length != 6) {
                    this.$dialog.toast({
                        mes: "验证码不正确!",
                        timeout: 1500
                    });
                    return;
                }
                let res = await this.$axios.post("/code",{imgCode:this.imageCode});
                console.log(res);
                if(res.state!="00"){
                    this.$dialog.toast({
                        mes: res.msg,
                        timeout: 1500
                    });
                    return;
                }else{

                }



                if (!R_parse_PhoneNumber.test(this.params.recommendPhone)) { //验证推荐人手机号
                    this.$dialog.toast({
                        mes: "推荐人手机号不正确!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.params.recommendPhone !== this.params.phonenumber) {
                    let data = await this.$axios.post("/customer/register", this.params);
                    if (data.state == "00") {
                        this.$dialog.toast({
                            mes: "注册成功",
                            icon: 'success',
                            timeout: 1500
                        });
                        this.$router.push({
                            name: "login1"
                        })
                    } else {
                        this.$dialog.toast({
                            mes: data.msg,
                            icon: 'error',
                            timeout: 1500
                        })
                    }
                } else {
                    this.$dialog.toast({
                        mes: "推荐人手机号不能与用户手机号相同",
                        timeout: 1500,
                    })
                }

            },
            async sendCode() {
                if (this.params.recommendPhone === this.params.phonenumber){
                    this.$dialog.toast({
                        mes: "手机号已注册",
                        timeout: 1500
                    });
                    return;
                }
                if (!R_parse_PhoneNumber.test(this.params.phonenumber)) {
                    this.$dialog.toast({
                        mes: "请输入正确的注册手机号码",
                        timeout: 1500
                    });
                    return;
                }
                this.$dialog.loading.open('发送中...');
                let res = await this.$axios.get('/customer/getCode/' + this.params.phonenumber);
                if (res.state == "00") {
                    this.start1 = true;
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: res.msg,
                        icon: 'success',
                        timeout: 1500
                    })
                }
            }
        },
        computed:{
            phonenumber(){
                return this.$route.params.phonenumber;
            }
        },
        components: {}

    }
</script>
<style scoped>
    .bill-content {
        background-image: url(../../lib/public/images/zhuce.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

    }
    .center {
        padding-left: 8px;
        padding-right: 8px;
        height: 620px;
    }
    .login-img {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .content {
        width: 88%;
        margin: 0px auto;
        height: 380px;
        background-color: rgba(255, 255, 255, .4);
        border-radius: 10px;
    }
    .table {
        width: 90%;
        margin: 0px auto;
        padding-top: 20px;
    }
    .btn1 {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        color: #fff;
        background: -webkit-linear-gradient(#fff, #1D75D6);
        background: -o-linear-gradient(#fff, #1D75D6);
        background: -moz-linear-gradient(#fff, #1D75D6);
        background: linear-gradient(#eee, #1D75D6);
    }
    .btn2 {
        width: 50%;
    }
    .btn3 {
        width: 40%;
        height: 40px;
        margin-bottom: 15px;
        border-radius: 3px;
    }
    .btn3 img{
        height: 40px;
        width:108px;
    }
    .btn4 {
        width: 30%;
        height: 40px;
        margin-bottom: 15px;
        background-color: #D9D9D9;
        border-radius: 20px;
        color: #595959
    }
    .code {
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
</style>

