<template>
    <div class="bill-content">
       <navname :navname="chang"></navname>
        <!-- 顶部区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" href="#item1mobile" >
    								400元刷卡金
    							</a>
                    <a class="mui-control-item" href="#item2mobile">
    								自刷返还分润
    							</a>
                    <a class="mui-control-item" href="#item3mobile">
    								分享体验顶级
    							</a>
                    <a class="mui-control-item" href="#item4mobile">
    								邀请可获佣金
    							</a>
                    <a class="mui-control-item" href="#item5mobile">
    								无限赚取分润
    							</a>
                    <a class="mui-control-item" href="#item6mobile">
    								刷卡还得积分
    							</a>
                </div>
            </div>
        </div>
        <div class="vip1-body">
            <div class="img-1" id="item1mobile">
                <img v-lazy="'../../lib/public/images/vip1-1.png'" alt="1">
            </div>
            <div class="img-1" id="item2mobile">
                <img v-lazy="'../../lib/public/images/vip1-2.png'" alt="2">
            </div>
            <div class="img-1" id="item3mobile">
                <img v-lazy="'../../lib/public/images/vip1-3.png'" alt="3">
            </div>
            <div class="img-1" id="item4mobile">
                <img v-lazy="'../../lib/public/images/vip1-4.png'" alt="4">
            </div>
            <div class="img-1" id="item5mobile">
                <img v-lazy="'../../lib/public/images/vip1-5.png'" alt="5">
            </div>
            <div class="img-1" id="item6mobile">
                <img v-lazy="'../../lib/public/images/vip1-6.png'" alt="6">
            </div>
        </div>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.js'
     import navname from '../subcomponents/nav.vue'
    export default {
        data() {
            return {
                chang: "特权详情",
                // list:[{"id":1,"content":"400元刷卡金"},{"id":2,"content":"自刷返还分润"},{"id":3,"content":"分享体验顶级"},{"id":4,"content":"邀请可获佣金"},{"id":5,"content":"无限赚取分润"},{"id":6,"content":"刷卡还得积分"},]
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
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
            })
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
        padding-left: 4px;
        padding-right: 4px;
    }
    * {
        touch-action: pan-y;
    }
    .mui-slider {
        background-color: #fff;
    }
    .vip1-header h1 {
        height: 50px;
        text-align: left;
        font-size: 15px;
        font-weight: 400;
        color: #333333;
        line-height: 50px;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .img-1 img {
        width: 100%;
    }
</style>

