<template>
    <div class="bill-content">
        <yd-navbar :title="chang">
            <router-link to="/mine" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="center">
            <div class="rate-header">
                <img v-lazy="'../../lib/public/images/yin.png'" alt="123">
                <span>快捷收款</span>
            </div>
            <hr>
            <table width="100%">
                <tr>
                    <th>通道名称</th>
                    <th>到账方式</th>
                    <th> 费率</th>
                    <th> 交易时间</th>
                    <th> 单笔额度</th>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
                <tr style="text-align:center;color:#ccc;font-size:12px;">
                    <td>积分A</td>
                    <td>D+0</td>
                    <td>54%+2</td>
                    <td>09:00-21:00</td>
                    <td>2000-20000</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "我的费率"
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
        }
    }
</script>
<style scoped>
    .bill-content {
       background-color: #fff;
    }
    .center{
         padding-left: 8px;
        padding-right: 8px
    }
    .rate-header {
        height: 60px;
        padding-left: 10px;
        display: flex;
        align-items: center
    }
    .rate-header span {
        padding-left: 10px;
        font-size: 16px;
    }
    table {
        margin-top: 15px;
    }
</style>

