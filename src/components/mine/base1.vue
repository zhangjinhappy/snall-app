<template>
    <div class="base_body">
        <yd-navbar :title="chang">
            <router-link to="/mine/certification" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <!-- 头部 -->
        <div class="base-content">
            <yd-step current="2" current-color="#1D75D6">
                <yd-step-item>
                    <span slot="bottom">实名认证</span>
                </yd-step-item>
                <yd-step-item>
                    <span slot="bottom">基本信息</span>
                </yd-step-item>
            </yd-step>
        </div>
        <br>
        <div class="center">
            <div class="center-content">
                <yd-preview-header>
                    <div slot="left">收款人姓名</div>
                    <div slot="right">张三</div>
                </yd-preview-header>
                <yd-preview-header>
                    <div slot="left">收款人身份证</div>
                    <div slot="right">3423201929292212</div>
                </yd-preview-header>
                <yd-preview-header>
                    <div slot="left">所在地区</div>
                    <div slot="right">安徽省合肥市</div>
                </yd-preview-header>
                <yd-preview-item>
                    <div slot="left">身份证地址</div>
                    <div slot="right">安徽省合肥市蜀山区长江西路托基金做2011室</div>
                </yd-preview-item>
            </div>
        </div>
        <br>
        <div class="center">
            <div class="center-content">
                <yd-preview-header>
                    <div slot="left">银行卡号</div>
                    <div slot="right">62837739235448938</div>
                </yd-preview-header>
                <yd-preview-header>
                    <div slot="left">银行卡预留手机号</div>
                    <div slot="right">13833455560</div>
                </yd-preview-header>
                <yd-preview-header>
                    <div slot="left">所属银行</div>
                    <div slot="right">建设银行</div>
                </yd-preview-header>
                <yd-preview-header>
                    <div slot="left">开户地点</div>
                    <div slot="right">安徽省合肥市</div>
                </yd-preview-header>
                <yd-preview-item>
                    <div slot="left">开户支行</div>
                    <div slot="right">安徽省合肥市长江支路分行</div>
                </yd-preview-item>
            </div>
        </div>
        <yd-button size="large" type="primary" @click.native="clickname" bgcolor="#1D75D6" color="#fff">下一步</yd-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: '基本信息',
            }
        },
        created() {
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true
            this.$parent.$data.showmenu = true
            next()
        },
        methods: {
            clickname() {
                this.$router.push({
                    name: "judge"
                })
            }
        },
        components: {
        }
    }
</script>
<style scoped>
     .center-content {
        padding-left: 10px;
        padding-right: 10px
    }
     .center{
        background-color: #fff;
    }
    .base-content {
        padding-top: 20px;
         background-color: #fff;
    }
    .yd-preview-header {
        padding-right: 8px;
        /* border-bottom: 1px solid #ccc; */
    }
</style>

