<template>
    <div class="order-content">
        <div class="center">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">收货人:&nbsp;&nbsp;张三 </span>
                    <span slot="right">18888888</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">收货地址:</span>
                    <span slot="right">安徽省合肥市蜀山区天一家园12栋2345室</span>
                </yd-cell-item>
                <p>(请仔细检查你的收货地址)</p>
            </yd-cell-group>
            <br>
            <!-- 主体部分 -->
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left" class="order-a">
                                 <img v-lazy="'../../lib/public/images/pos.png'" alt="33">
                                  <h1 class="order-h">乐刷M60</h1>
                            </span>
                    <span slot="right">X &nbsp;1</span>
                </yd-cell-item>
            </yd-cell-group>
            <br>
            <div class="order-footer">
                <yd-button type="primary" size="large" @click.native="show1 = true" color="#fff" bgcolor="#1D75D6">立即领取</yd-button>
                <yd-keyboard v-model="show1" :callback="done1" ref="keyboardDemo1" title="即享安全键盘"></yd-keyboard>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show1: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu = true;
            })
        },
        methods: {
            done1(val) {
                console.log('输入的密码是：' + val);
                this.$dialog.loading.open('验证支付密码');
                /* 模拟异步验证密码 */
                setTimeout(() => {
                    this.$refs.keyboardDemo1.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
                    this.$dialog.loading.close();
                }, 2000);
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            next()
        },
    }
</script>
<style scoped>
    .order-content {
       background-color: #fff
    }
    .center{
         padding-top: 50px;
        padding-right: 8px;
        padding-left: 8px;
    }
    p {
        color: #ccc;
        padding-left: 5px;
    }
    .order-a {
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .order-bill {
        padding-left: 15px;
    }
    .order-h {
        padding-left: 15px;
    }
    .order-r {
        padding-right: 15px;
    }
    .order-footer {
        padding-left: 8px;
        padding-right: 8px;
    }
</style>


