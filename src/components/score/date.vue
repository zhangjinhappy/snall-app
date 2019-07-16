<template>
    <div class="bill-content">
        <yd-navbar :title="chang"> </yd-navbar>
        <div class="center">
            <!--<div class="date-header">
                <div class="date-l">
                    <h1 @click="change1" ref="h1">推荐</h1>
                </div>
                <div class="date-r" @click="change2" >
                    <h1 ref="h2">积分排序</h1>
                     <div class="pic" @click="chang2">
                         <img class="t4" ref="img1" :src="urlList[3]" alt=""><img class="t1" ref="img2" :src="urlList[0]" alt="">
                     </div>
                </div>
            </div>-->
            <!-- 主体部分 -->
            <div class="date-body" v-for="exchange,key in exchangeList" :key="key">
                <router-link class="body_img" tag="div" to=""><!--/home/score/date/dateinfo-->
                    <img v-lazy="'../../lib/public/images/me6.png'" />
                    <div class="body_date">
                        <h4>使用{{exchange.costpoint}}积分兑换{{exchange.money}}元</h4>
                        <span>{{exchange.costpoint}}积分  <!--{{exchange.money}}元--></span>
                    </div>
                </router-link>
                <div class="exchange" @click="exchangefn(exchange)">兑换</div>
            </div>
            <div class="numberNoDate" v-if="exchangeList.length==0">
                暂无数据...
            </div>
        </div>
    </div>
</template>
<script>
    import {isNull} from "../../util/Is";

    export default {
        data() {
            return {
                chang: "优惠票券",
                flag:true,
                urlList:['../../lib/public/images/t1.png','../../lib/public/images/t2.png','../../lib/public/images/t3.png','../../lib/public/images/t4.png'],
                exchangeList:[]
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
                let res = await this.$axios.get("/pointexchange");
                if(res.state=="00" && !isNull(res.data)){
                    this.exchangeList = [...this.exchangeList,...res.data];
                }
                console.log(res);
            },
            async exchangefn(obj){
                let params = {
                    id:obj.id
                };
                let res = await this.$axios.put("/cardmoney",params);
                if(res.state=="00"){
                    this.$dialog.toast({
                        mes: "兑换成功",
                        icon: 'success',
                        timeout: 1500
                    });
                }else{
                    this.$dialog.toast({
                        mes: res.msg,
                        timeout: 1500
                    });
                }
            }
        },
        components: {
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff;
    }
    .center {
        padding-left: 8px;
        padding-right: 8px
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .date-header {
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 50px;
        border-bottom: 1px solid #ccc;
    }
    .date-l {
        border-right: 1px solid #ccc;
    }
    .date-l,
    .date-r {
        width: 50%;
        height: 50px;
        position: relative;
    }
    .t4{
         position: absolute;
    top: 30%;
    right: 18%;
    }
    .t1{
          position: absolute;
    top: 60%;
    right: 18%;
    }
    /* .pic{
        width: 20px;
        height: 40px;
        border: 1px solid #f00;
        position: absolute;
        top:0;
        right: 0;
    } */
    .date-l h1,
    .date-r h1 {
        height: 50px;
        font-weight: 400;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
    }
    .date-body {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #ccc;
    }
    .body_date {
        padding-left: 10px;
    }
    .body_date {
        height: 40px;
    }
    .body_date span {
        font-size: 15px;
        color: #333333;
        color: #1D75D6;
    }
    .body_date h4 {
        font-size: 15px;
        font-weight: 400;
        color: #333333;
        height: 20px;
    }
    .body_img {
        display: flex;
        align-items: center;
    }
    .body_img img {
        width: 60px;
        height: 60px;
    }
    .exchange {
        display: block;
        width: 60px;
        height: 30px;
        border: 1px solid #1D75D6;
        color: #1D75D6;
        font-size: 14px;
        border-radius: 2%;
        text-align: center;
        line-height: 28px;
    }
    .numberNoDate{
        padding-left: 8px;
        margin: 20px;
        display: flex;
        align-items: center;
        color: #c3c3c3;
    }
</style>

<!--chang2(){
if(this.flag){
// 下序
this.$refs.img1.src=this.urlList[2];
this.$refs.img2.src=this.urlList[1];
console.log("下序")
this.flag=false;
}else{
// 上序
this.$refs.img1.src=this.urlList[3];
this.$refs.img2.src=this.urlList[0];
console.log("上序")
this.flag=true;
}
},
change1() {
if (this.$refs.h1.style.color == "#1D75D6") {
this.$refs.h1.style.color = "#000"
} else {
this.$refs.h1.style.color = "#1D75D6"
this.$refs.h2.style.color = "#000"
}
},
change2() {
if (this.$refs.h2.style.color == "#1D75D6") {
this.$refs.h2.style.color = "#000"
} else {
this.$refs.h2.style.color = "#1D75D6"
this.$refs.h1.style.color = "#000"
}
}-->
