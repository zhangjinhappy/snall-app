<template>
    <div class="bill-content">
       <navname :navname="chang"></navname>
      
        <div class="center">
            <div class="bill-header">
                <div class="header-l">
                    <h1>订单号:&nbsp;&nbsp;<span>Y37484536216</span></h1>
                    <h1>国内承运人:&nbsp;&nbsp;<span>中国邮政</span></h1>
                </div>
                <div class="header-r">
                    <yd-icon name="phone2" color="#1D75D6" size="15px"></yd-icon>&nbsp;&nbsp;联系客服
                </div>
            </div>
        </div>
        <hr>
        <!-- 中间跟踪部分 -->
        <div class="center1">
            <div class="bill-body">
                <yd-timeline>
                    <yd-timeline-item>
                        <p>已签收，匿名签收</p>
                        <p style="margin-top: 10px;">2017-08-18 08:24:18</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>【合肥市】经开区莲花路派件员&nbsp;张三15209847041正在派件</p>
                        <p style="margin-top: 10px;">2017-08-17 07:25:08</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>【合肥市】您的订单在乐享【合肥市分拨中心】发货完成，准备送往京东【合肥经开莲花路公司】</p>
                        <p style="margin-top: 10px;">2017-08-16 22:44:08</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>【南京市】您的订单在乐享【南京分拨中心】发货完成，准备送往【合肥市】</p>
                        <p style="margin-top: 10px;">2017-08-16 21:44:08</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>【南京市】您的订单在乐享【南京分拨中心】发货完成，准备送往乐享【南京安吉站】</p>
                        <p style="margin-top: 10px;">2017-08-16 20:44:08</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>【南京市】您的订单在乐享【南京分拨中心】发货完成，准备送往乐享【南京安吉站】</p>
                        <p style="margin-top: 10px;">2017-08-16 19:44:08</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>【南京市】您的订单在乐享【南京分拨中心】发货完成，准备送往乐享【南京安吉站】</p>
                        <p style="margin-top: 10px;">2017-08-16 18:44:08</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>已揽件</p>
                        <p style="margin-top: 10px;">2017-08-16 17:44:08</p>
                    </yd-timeline-item>
                    <yd-timeline-item>
                        <p>已发货</p>
                        <p style="margin-top: 10px;">2017-08-16 14:44:08</p>
                    </yd-timeline-item>
                </yd-timeline>
            </div>
        </div>
    </div>
</template>
<script>
import navname from '../subcomponents/nav.vue'
    export default {
        data() {
            return {
                chang: "订单跟踪"
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
        methods: {},
        components: {
            navname
        }
    }
</script>
<style scoped>
    .bill-header,
    .bill-body {
        padding-left: 8px;
        padding-right: 8px
    }
    .center {
        background-color: #fff;
        height: 100px;
    }
    .center1{
       background-color: #fff;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .bill-header {
        padding-top: 54px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .header-l,
    .header-r {
        height: 50px;
    }
    .header-l h1 {
        height: 25px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
    }
    .header-r {
        font-size: 14px;
        padding-top: 10px;
    }
    .bill-body {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>

