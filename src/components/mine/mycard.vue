<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <div class="center">
            <!-- 第一个卡 -->
            <div class="bigDiv" v-if="Object.keys(bankInfo).length!=0">
                <img class="b" :src="'../../lib/public/images/bankImg/'+bankInfo.bankcode+'.png'" alt="11">
                <div class="word">
                    <span>{{bankInfo.cardno}}</span>&nbsp;
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "我的结算卡",
                bankInfo:{}
            }
        },
        created() {
            this.init();
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
            async init(){
                let res = await this.$axios.get("/bankInfo");
                //{"msg":"查询成功","data":{"citycode":"3415","branchbankcode":"103376014001","phonenumber":"15856861283","bankname":"中国农业银行六安市梅山路支行","cardno":"6228482598667162474","bankcode":"ABC"},"state":"00"}
                if(res.state=="00" && res.data!=null){
                    this.bankInfo = res.data;
                }
            }
        },
        components: {}
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff
    }
    .center {
        padding-left: 10px;
        padding-right: 10px
    }
    .bigDiv {
         padding-top: 10px;
        height: 120.8px;
        width: 100%;
        position: relative;
    }
    img {
        width: 100%;
        height: 110.8px;
    }
    .word {
        width: 30%;
        height: 20px;
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .word span {
        font-size: 18px;
        color: #FFFFFF;
    }
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
</style>

