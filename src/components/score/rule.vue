<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <br>
        <div class="center">
            <h1>如何获得即享积分？</h1>
            <br>
            <h3>每<span>3000</span>积分抵<span>1</span>元</h3>
            <br>
            <p style="color:#333333">1. 第一次注册即享用户可以获得积分；</p>
            <p style="color:#333333"> 2. 推荐用户注册可获得积分；</p>
            <p style="color:#333333"> 3. 每日签到做任务可获得积分；</p>
            <p style="color:#333333"> 4. 使用pos机消费可获得积分；</p>
            <br>
            <hr>
            <br>
            <h1>如何使用即享积分？</h1>
            <br>
            <h3>在即享积分商城可以<span>兑换</span>优质商品</h3>
            <br>
            <h3 style="color:#ccc"> 更多玩法，敬请期待…</h3>
            <br>
            <hr>
            <br>
            <h1>即享积分会过期吗？</h1>
            <br>
            <p style="color:#333333">1. 2019年12月31日前获得的积分，如果在有效期内没有使用，将于2019年12月31日过期 </p> 
            <p style="color:#ccc"> 例：2019年5月1日获得的积分，在有效期内没有使用，将于2019年12月31日过期</p> 
            <p style="color:#333333"> 2.自2019年1月1日（含2019年1月1日）后获得的积分，自获得之日起一年有效，如果有效期内没有使用，将在次年该月月底失效 </p>
            <p style="color:#ccc"> 例：2019年5月1日获得的积分，在有效期内没有使用，将于2020年5月31日过期</p> 
            <br> 
            <p style="color:#333333">3. 优先使用即将过期的积分</p>  
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "规则"
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

        },
        components: {}
    }
</script>
<style scoped>
    .bill-content {
        background-color: #ffffff
    }
    .center {
        padding-left: 12px;
        padding-right: 12px
    }
    .yd-navbar {
        border-bottom: 1px solid #cccccc
    }
    span {
        color: #3382DA
    }
    h1{
        font-size: 20px;
    }
    h3{
        font-size: 16px;
    }
</style>

