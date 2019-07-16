<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
           <div class="header">
                <span @click="action()" ref="success">编辑</span>
            </div>
        <div class="center">
            <div class="goods">
                <yd-checklist v-model="checklist4" :label="false" ref="checklistDemo" color="#4998E8">
                    <yd-checklist-item :val="item.id" v-for="(item,i) in list" :key="item.id">
                        <yd-flexbox style="padding: 15px 0;">
                            <img v-lazy="item.url" class="demo-checklist-img">
                            <yd-flexbox-item align="top">
                                <div class="calculation" v-if="popflag">
                                    <div class="plus" @click="plusShop(i)">-</div>
                                    <div class="number">{{item.number}}</div>
                                    <div class="reduce" @click="reduceShop(i)">+</div>
                                </div>
                                <p class="title">{{item.name}}</p>
                                <div class="price-right">
                                    <div class="footer-price">
                                        <span class="active">{{item.price*item.number}}积分+￥{{49*item.number}}</span>
                                        <span>x&nbsp;{{item.number}}&nbsp;</span>
                                    </div>
                                </div>
                            </yd-flexbox-item>
                        </yd-flexbox>
                    </yd-checklist-item>
                </yd-checklist>
            </div>
            <div class="cart-shop">
                <div class="all">
                    <yd-checkbox v-model="isCheckAll" shape="circle" color="#4998E8" :change="checkAll">全选</yd-checkbox>
                </div>
                <div class="shop-left">
                    <p style="color:#EA0C0C;font-size:16px">{{totalPrice}}积分+￥{{numberPrice}}</p>
                    <p style="color:#ccc;font-size:12px;padding-left:10px">优惠0.00 | 不含运费</p>
                </div>
                <div class="shop-right" ref="add">
                    结算
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "购物车",
                popflag:false,
                checklist4: [],
                isCheckAll: false,
                list: [{
                        id: "0",
                        name: "创意小夜灯充电池卧室床头婴儿喂奶用护眼暖光夜光台灯可调节亮度",
                        url: "https://gfs17.gomein.net.cn/T1GkxjBbhv1RCvBVdK_250.jpg",
                        price: "2999",
                        number: "1"
                    },
                    {
                        id: "1",
                        name: "创意小夜灯充电池卧室床头婴儿喂奶用护眼暖光夜光台灯可调节亮度",
                        url: "https://gfs17.gomein.net.cn/T1ZULjBQAT1RCvBVdK_250.jpg",
                        price: "2344",
                        number: "1"
                    },
                    {
                        id: "2",
                        name: "创意小夜灯充电池卧室床头婴儿喂奶用护眼暖光夜光台灯可调节亮度",
                        url: "https://gfs17.gomein.net.cn/T12LdbBvW_1RCvBVdK_250.jpg",
                        price: "3425",
                        number: "1"
                    },
                    {
                        id: "3",
                        name: "创意小夜灯充电池卧室床头婴儿喂奶用护眼暖光夜光台灯可调节亮度",
                        url: "https://gfs17.gomein.net.cn/T1DTYbBgCT1RCvBVdK_250.jpg",
                        price: "2886",
                        number: "1"
                    }
                ]
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                for (const key in this.list) {
                    total += this.list[key].price * this.list[key].number
                }
                return total
            },
           numberPrice(){
               let all=0;
                for (const key in this.list) {
                    all += 49* this.list[key].number
                }
                return all
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
            change(value, isCheckAll) {
                this.isCheckAll = isCheckAll;
            },
            checkAll(){
               this.isCheckAll = !this.isCheckAll;
               this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
            },
            action(){
                if(this.popflag){
                    this.popflag =false;
                    this.$refs.success.innerText="编辑";  
                    this.$refs.add.innerText="结算"
                    this.$refs.add.style.backgroundColor="#4998E8"
                } 
                 else{
                     this.popflag=true
                     this.$refs.success.innerText="完成"
                     this.$refs.add.style.backgroundColor="#EA0C0C"
                      this.$refs.add.innerText="删除"
                    
                 }  
            },
            plusShop(i) {
                this.list[i].number == 1 ? "" : this.list[i].number--
            },
            reduceShop(i) {
                this.list[i].number++
                    this.flag = !this.flag
            },
            // 删除
            delectshop(i) {
                this.list.splice(i, 1)
            }
        },
        components: {}
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff
    }
    .yd-navbar {
        border-bottom: 1px solid #cccccc
    }
    .center {
        padding-left: 8px;
        padding-right: 8px;
        padding-bottom: 50px;
    }
    .demo-checklist-img {
        width: 40%;
    }
    h3 {
        font-size: 16px;
        color: blueviolet;
        margin: 5px;
    }
    .yd-checklist-item {
        margin: 5px;
    }
    .plus {
        width: 40px;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        border: 1px solid #ccc;
        text-align: center;
        cursor: pointer;
    }
    .calculation {
        margin: 10px;
        display: flex;
        align-items: center
    }
    .title{ 
         color: #333333;
          padding-left: 10px;
    }
    .price-right{
       font-size: 14px;
       padding-left: 10px;
    }
    .reduce {
        width: 40px;
        height: 28px;
        line-height: 28px;
        font-size: 18px;
        border: 1px solid #ccc;
        text-align: center;
        cursor: pointer;
    }
    .number {
        border: 1px solid #ccc;
        height: 28px;
        width: 51px;
        text-align: center;
        line-height: 28px;
    }
    .footer-price {
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .active {
        color: #1D75D6;
        font-size: 14px;
    }
    .cart-shop {
        background-color: #fff;
        height: 65.2px;
        position: fixed;
        z-index: 999;
        font-size: 14px;
        width: 100%;
        left: 0;
        bottom: 1px;
        border-radius: 8.333px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .shop-right {
        width: 30%;
        height: 100%;
        text-align: center;
        line-height: 63.91px;
        background-color: #4998E8;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
    .shop-left {
        width: 40%
    }
    .all {
        width: 30%;
            padding-top: 6%;
    padding-left: 4%;
        height: 100%;
    }
    .header {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #ccc
    }
    .header span {
        display: block;
        height: 40px;
        padding-right: 24px;
        line-height: 40px;
        color: #1D75D6;
        font-size: 16px;
    }
</style>

