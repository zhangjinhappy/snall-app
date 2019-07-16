<template>
    <div class="bill-content">
        <navbar :navname="chang"></navbar>
        <div class="center">
            <div class="card">普通养卡</div>
            <div class="card2" @click="go">精养卡</div>
            <i class="ce">测试版本</i>
        </div>
    </div>
</template>
<script>
    import navbar from '../subcomponents/nav.vue'
    export default {
        data() {
            return {
                chang: "提额系统"
            }
        },
        created() {},
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
            go(){
                this.$router.push({name:"cardsystem"})
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff
    }
    .center {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        position: relative;
    }
    .card {
        width: 100%;
        height: 140px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
        background: url(../../lib/public/images/main.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 140px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #FFFFFF;
    }
    .ce{
        position: absolute;
        right: 30px;
        font-size: 14px;
        color: #fff;
        top: 25px;
    }
    .card2 {
        width: 100%;
        margin-top: 20px;
        height: 140px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
        background: url(../../lib/public/images/main1.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 140px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #FFFFFF;
    }
</style>

