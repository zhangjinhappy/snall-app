<template>
    <div class="bill-content">
        <yd-navbar :title="chang"> </yd-navbar>
        <div class="sao-header">
            <img v-lazy="'../../lib/public/images/txian4.png'" alt="">
            <div class="btn9">
                <input type="button" value="保存">&nbsp;&nbsp;
                <input type="button" value="分享" @click="share">
            </div>
        </div>
        <div class="center">
            <div class="img">
                <img v-lazy="'../../lib/public/images/share1.png'">
            </div>
        </div>
        <!-- 弹框分享 -->
        <yd-popup v-model="show2" position="bottom" height="20%">
            <div class="share-q">
                <img v-lazy="'../../lib/public/images/w3.png'" alt="">
                <img v-lazy="'../../lib/public/images/w.png'" alt="">
                <img v-lazy="'../../lib/public/images/w1.png'" alt="">
                <img v-lazy="'../../lib/public/images/w2.png'" alt="">
            </div>
            <div class="btn">
                <input class="btn1" type="button" value="关闭" @click="show2 = false">
            </div>
        </yd-popup>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "扫二维码",
                show2: false
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
            share() {
                this.show2 = true
            }
        },
        components: {}
    }
</script>
<style scoped>
    .center {
        padding-left: 8px;
        padding-right: 8px
    }
    .bill-content {
        background-color: #fff
    }
    .center>.img>img {
        width: 100%;
    }
    .sao-header {
        padding-left: 16px;
        padding-right: 26px;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    h6 {
        height: 40px;
        line-height: 40px;
        text-align: center
    }
    .btn9 {
        display: flex;
        align-items: center;
        justify-content: flex-end
    }
    .share-q {
        padding-top: 8px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .btn {
        width: 100%;
        padding-top: 12px;
    }
    .btn1 {
        width: 100%;
        height: 40px;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
</style>

