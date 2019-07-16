<template>
    <div class="regisrer_content">
        <yd-navbar :title="chang">
            <router-link to="/login1" slot="left">
                <yd-navbar-back-icon>其他登录</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="center">
            <div class="login-img">
                <img v-lazy="'../../lib/public/images/jixianglogo.png'" alt="">
            </div>
            <input type="tel" slot="right" required ref="input1" v-model="param.phonenumber" maxlength="11" placeholder="请输入手机号" style="background-color:#EEEEEE">
            <div class="regisrer-login">
                <input type="text" class="regisrer-a" slot="right" ref="input2" v-model=" param.code" placeholder="请输入验证码" style="background-color:#EEEEEE">
                <!-- ↓↓关键代码是这里↓↓ -->
                <yd-sendcode class="a-a" slot="right" v-model="start1" @click.native="sendCode1" type="primary"></yd-sendcode>
                <!-- ↑↑关键代码是这里↑↑ -->
            </div>
            <input type="password" slot="right" ref="pwd" v-model="param.password" minlength="6" maxlength="18" placeholder="请输入密码（6-18）" style="background-color:#EEEEEE">
            <input type="tel" slot="right" ref="input3" v-model="param.recommendPhone" maxlength="11" placeholder="请输入推荐人的手机号" style="background-color:#EEEEEE">
            <div class="box">
                   <yd-checkbox v-model="dev" shape="circle">&nbsp;&nbsp;我同意《服务条款》</yd-checkbox>
                    <div class="clcik"  @click="fun"> </div>
            </div>
            <yd-button size="large" type="disabled" disabled  v-if="!dev">注册</yd-button>
            <yd-button size="large" bgcolor="#1D75D6" color="#fff" v-if="dev" type="primary" @click.native="userheader">注册</yd-button>
        </div>
    </div>
</template>
<script>
    import {
        R_parse_PhoneNumber
    } from '../../util/Regular';
    export default {
        data() {
            return {
                dev: false,
                chang: "手机一键注册",
                start1: false,
                param: {
                    phonenumber: "",
                    code: "",
                    password: "",
                    recommendPhone: ""
                }
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
        components: {},
        methods: {
            fun() {
                this.$router.push({
                    name: "server"
                })
            },
            async userheader() {
                if (!R_parse_PhoneNumber.test(this.param.phonenumber)) { //验证注册手机号
                    this.$dialog.toast({
                        mes: "请输入正确的注册手机号码!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.param.code.length != 6) {
                    this.$dialog.toast({
                        mes: "验证码不正确!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.param.password.length < 6 || this.param.password.length > 18) { //验证密码是否是正确的组合
                    this.$dialog.toast({
                        mes: "密码由6到18位数字或字母组成!",
                        timeout: 1500
                    });
                    return;
                }
                if (!R_parse_PhoneNumber.test(this.param.recommendPhone)) { //验证推荐人手机号
                    this.$dialog.toast({
                        mes: "推荐人手机号不正确!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.$refs.input1.value !== this.$refs.input3.value) {
                    let data = await this.$axios.post("/customer/register", this.param);
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
            async sendCode1() {
                if (!R_parse_PhoneNumber.test(this.param.phonenumber)) {
                    this.$dialog.toast({
                        mes: "请输入正确的注册手机号码",
                        timeout: 1500
                    });
                    return;
                }
                this.$dialog.loading.open('发送中...');
                let res = await this.$axios.get('/customer/getCode/' + this.param.phonenumber);
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
        }
    }
</script>
<style scoped>
    .center {
        padding-left: 10px;
        padding-right: 10px
    }
    .regisrer_content {
        height: 720px;
        background-color: #fff;
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
    .login-img {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .regisrer-login {
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .regisrer-a {
        width: 65%;
    }
    .yd-checkbox {
        display: flex;
        padding-right: 10px;
        align-items: center;
    }
    .box{
        position: relative;
    }
    .clcik{
       position: absolute;
       height: 20px;
        width: 30%;
       top: 0;
       left:  11%; 
    }

</style>


