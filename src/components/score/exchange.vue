<template>
    <div class="bill-content">
        <div ref="mescroll" class="mescroll">
            <div>
                <componentnav :navname="chang"></componentnav>
                <div class="center"  v-for="redeem,key in redeemList">
                     <img class="image1" src="../../lib/public/images/shop1.png" alt="123">
                     <div class="change">
                         <p class="word">使用{{redeem.costpoint}}积分兑换{{redeem.money}}元</p>
                           <div class="number">
                              <span class="number1">{{redeem.costpoint}}积分<!--  ￥{{redeem.money}}--></span>
                              <span>x&nbsp;1</span>
                          </div>
                     </div>
                </div>
                <div class="numberNoDate" v-if="redeemList.length==0">
                    暂无数据...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import componentnav from '../subcomponents/nav.vue'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import {isNull} from "../../util/Is";
    export default {
        data() {
            return {
                chang: "兑换记录",
                redeemList:[]//[{"id":null,"custid":null,"money":1.00,"type":null,"endtime":"2020-04-19T03:18:48.000+0000","addtime":"2019-04-19T03:18:48.000+0000","costpoint":1000,"state":0}]
            }
        },
        created() {
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
            moment,
            async findRedeemList(num,size){
                let params = {
                    "currPage": num,
                    "limit": size
                };
                let res = await this.$axios.get("/cardmoney",params);
                if(res.state == "00" && !isNull(res.dataList)){
                    this.redeemList = [...this.redeemList,...res.dataList];
                    return res.dataList;
                }
                return [];
            },
            async upCallback(page, mescroll){
                console.log("bill upCallback start");
                let data = await this.findRedeemList(page.num,page.size);
                mescroll.endSuccess(data.length);
                console.log("bill upCallback end");
            },
            downCallback(){
                this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            }
        },
        components: {
            componentnav
        },
        mounted: function () {
            //创建MeScroll对象
            this.mescroll = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down:{callback: this.downCallback }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
                up: {
                    callback: this.upCallback,
                    toTop: {
                        //回到顶部按钮
                        src: "../../lib/public/images/top.png", //图片路径,默认null,支持网络图
                        offset: 100 //列表滚动1000px才显示回到顶部按钮
                    }
                }
            });
        },
        beforeDestroy(){
            this.mescroll.destroy();//销毁MeScroll对象
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff
    }
    .center {
        margin-top: 15px;
        padding-left: 8px;
        padding-right: 8px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .image1{
        width: 117px;
        height: 87px;
    }
    .word{
        height: 40px;
        width: 214px;
         font-size: 14px;
         color:#333333
    }
    .change{
        padding-left: 10px;
    }
    .number{
        height: 40px;
        line-height: 40px;
         font-size:16px;
        display: flex;
        align-items: center;
        justify-content: space-between; 
    }
    .number1{
        color: #7CAFE7;
    }
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
    .numberNoDate{
        padding-left: 8px;
        margin: 20px;
        display: flex;
        align-items: center;
        color: #c3c3c3;
    }
</style>

