<template>
    <div class="bill-content">
        <navname :navname="chang"></navname>
        <div class="center">
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item" href="#item1mobile" data-wid="tab-top-subpage-4.html">
    								邀请可获佣金
    							</a>
                    <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
    								自刷返还分润
    							</a> 
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-5.html">
    								无限赚取分润
    							</a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-2.html">
    								刷卡还得积分
    							</a>
                </div>
            </div>
        </div>
         <div class="header">
            <h1 >卡王</h1>
            <h3 >(直推<span>20</span>个人即可升级)</h3>
        </div>
        <div class="vip1-body">
            <div class="img-1" id="item1mobile">
                <img v-lazy="'../../lib/public/images/mem2-1.png'" alt="1">
            </div>
            <div class="img-1" id="item2mobile">
                <img v-lazy="'../../lib/public/images/mem2-2.png'" alt="2">
            </div>
            <div class="img-1" id="item3mobile">
                <img v-lazy="'../../lib/public/images/mem2-3.png'" alt="3">
            </div>
            <div class="img-1" id="item4mobile">
                <img v-lazy="'../../lib/public/images/mem2-4.png'" alt="4">
            </div>
            <div class="img-1" id="item4mobile">
                <img v-lazy="'../../lib/public/images/mem2-5.png'" alt="4">
            </div>
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
                chang: "升级成为卡王",
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
       background-color: #fff 
    }
    .center{
        padding-left: 8px;
        padding-right: 8px
    }
    * {
        touch-action: pan-y;
    }
    .mui-slider {
        background-color: #fff;
    }
    .vip1-header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .vip1-header h1 {
        height: 50px;
        text-align: left;
        font-size: 15px;
        font-weight: 400;
        color: #333333;
        line-height: 50px;
    }
    .header {
        width: 100%;
        height: 60px;
        background-color: #fff;
    }
   .header span{
       color: #0C5BE7;
       font-size: 20px;
   }
    .header h1,
    .header h3 {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 18px;
        color:#333333
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .img-1 img {
        width: 100%;
    }
</style>

