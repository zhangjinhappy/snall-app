<template>
    <div class="order-content">
        <div class="center">
            <yd-cell-group>
                <yd-cell-item v-if="!isShowAdd">
                    <span slot="left" class="order-a">
                                 <router-link  to="/addcontrol"><img v-lazy="'../../lib/public/images/address.png'" alt="44"></router-link>
                                 <h1 class="order-bill">请先添加默认地址</h1>
                            </span>
                </yd-cell-item>
                <yd-cell-group v-else="isShowAdd">
                    <div>
                        <yd-cell-item>
                            <span slot="left">收货人:{{bank.name}} </span>
                            <span slot="right">{{bank.phonenumber}}</span>
                        </yd-cell-item>
                        <yd-cell-item>
                            <span slot="left">收货地址:</span>
                            <span slot="right">{{bank.detailaddress}}</span>
                        </yd-cell-item>
                        <p class="p1">(请仔细检查你的收货地址)</p><p class="p2" @click="$router.push({name:'addcontrol'})">修改收获地址</p>
                    </div>
                </yd-cell-group>
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
            <div class="order-footer" @click="receive()">
                <yd-button type="primary" color="#fff" size="large" bgcolor="#1D75D6">立即领取</yd-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {isNull} from "../../util/Is";

    export default {
        data() {
            return {
                isShowAdd: false,
                bank: {}
            }
        },
        created() {
            this.init();
        },
           beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu = true;
            })
        },
        methods: {
            async init() {
                let address = localStorage.getItem("addcontrol");
                if(!isNull(address)){
                    localStorage.removeItem("addcontrol");
                    this.isShowAdd = true;
                    this.bank = JSON.parse(address);
                    return;
                }
                let data = await this.$axios.get("/custaddress/select");
                let dataList = data.data;
                for (let i = 0; i < dataList.length; i++) {
                    if (dataList[i].isdefault) {
                        this.isShowAdd = true;
                        this.bank = dataList[i];
                    }
                }
            },
            async receive() {
                console.log(this.bank);
                let data = await this.$axios.get("/posreceive/getPos/" + this.bank.id);
                if (data.state == "00") {
                    this.$dialog.toast({
                        mes: "领取成功",
                        icon: 'success',
                        timeout: 1500
                    });
                    this.$router.back(-1);
                }
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
        background-color: #fff;
    }
    .center {
        padding-top: 60px;
        padding-right: 8px;
        padding-left: 8px;
    }
    /* img {
            width: 30px;
            height: 30px;
        } */
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
    .p1{
        float: right;
    }
    .p2{
        padding-left: 10px;
        float: left;
    }
</style>
