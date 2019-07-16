<template>
    <div class="bill-content">
        <navname :navname="chang"></navname>
        <div class="center">
            <div class="login-img">
                <div class="bill-body">
                    <img src="../../lib/public/images/su.png" alt="222"><span class="bill-name">林记便利店</span>
                </div>
                <p class="a">￥45.5</p>
                <p>交易成功</p>
            </div>
            <div class="bill-cell">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">付款方式</span>
                        <span slot="right">pose机</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">商品说明</span>
                        <span slot="right">林记便利店</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">账单分类</span>
                        <span slot="right">生活分类</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">创建时间</span>
                        <span slot="right">2019-01-03</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">订单号</span>
                        <span slot="right">2345612345675</span>
                    </yd-cell-item>
                </yd-cell-group>
            </div>
        </div>
    </div>
</template>
<script>
    import navname from '../subcomponents/nav.vue'
    export default {
        data() {
            return {
                chang: "交易成功"
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
        },
        components: {
            navname
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff;
    }
    .center {
        padding-left: 8px;
        padding-right: 8px
    }
    .login-img {
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    img {
        width: 30px;
        height: 30px;
        vertical-align: middle
    }
    .bill-name {
        padding-left: 15px;
        font-size: 16px;
    }
    .a {
        font-size: 20px;
        font-weight: 900
    }
    p {
        margin-top: 10px;
    }
</style>

