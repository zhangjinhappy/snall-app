<template>
    <div class="bill-content">
        <yd-navbar :title="chang"> </yd-navbar>
        <div class="center">
            <!--<div class="bigdiv">
                <h1 class="b">语音通知</h1>
                <yd-switch v-model="switch1" color="#1D75D6"></yd-switch>
            </div>-->
            <div class="bigdiv">
                <!--<h1 class="b">检查更新</h1>-->
                <h1 class="b">当前版本:&nbsp;1.0</h1>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="a">
            <mt-button class="btn" size="large" type="primary" @click.native="logout()">安全退出</mt-button>
        </div>
    </div>
</template>
<script>
    import {delCookie} from '../../util/CookieUtils'
    import {TOKEN} from '../../store/types'
    export default {
        data() {
            return {
                chang: "设置",
                switch1: false
            }
        },
        created() {},
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
            logout() {
                delCookie(TOKEN);
                window.location.href = "/"
            }
        },
        components: {}
    }
</script>
<style scoped>
    .center {
        background-color: #fff;
    }
    .bigdiv {
        padding-left: 20px;
        padding-right: 20px;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc
    }
    .b {
        font-size: 15px;
        color: #333333;
        font-weight: 400
    }
    .a {
        padding-left: 20px;
        padding-right: 20px;
    }
    .mint-button--primary {
    color: #fff;
    background-color: #1D75D6;
   
    }
    .mint-button{
      border-radius: 5px;
    }
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
</style>

