<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <div class="center">
            <div ref="mescroll" class="mescroll">
                <div>
                    <div class="coupon-body">
                        <yd-tab active-color="#1D75D6" height="60px" :callback="upgradeType">
                            <yd-tab-panel label="已领取" tabkey="0" >
                                <div class="number" v-for="(obj,key) in list" :key="key">
                                    <div class="active-l">
                                        <div class="left-l">
                                            8.8 <span>折</span>
                                        </div>
                                        <div class="active-right">
                                            <div class="right-i">
                                                <h1>{{obj.fDestMercahntName}}</h1>
                                                <p>无门槛，最高折扣500元</p>
                                                <p>有效期{{obj.expiredDate}}</p>
                                            </div>
                                            <!--<div class="btn">立即领取</div>-->
                                        </div>
                                    </div>
                                </div>
                                <div class="number" v-if="list.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                            <yd-tab-panel label="使用中" tabkey="1">
                                <div class="number" v-for="(obj,key) in list" :key="key">
                                    <div class="active-l">
                                        <div class="left-l">
                                            8.8 <span>折</span>
                                        </div>
                                        <div class="active-right">
                                            <div class="right-i">
                                                <h1>{{obj.fDestMercahntName}}</h1>
                                                <p>无门槛，最高折扣500元</p>
                                                <p>有效期{{obj.expiredDate}}</p>
                                            </div>
                                            <div class="btn">立即领取</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="number" v-if="list.length==0">
                                    暂无数据...
                                </div>
                            </yd-tab-panel>
                        </yd-tab>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {CUSTOMERNO} from '../../store/types'
    import {isNull} from '../../util/Is'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    export default {
        data() {
            return {
                chang: "我的优惠卷",
                customerNo:"",
                list:[]
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
            init(){
                console.log("coupon init start");
                console.log(this.$store.state[CUSTOMERNO]);
                // this.myVoucherUnused();
                // this.myVoucherUsing();
                console.log("coupon init end");
            },
            async myVoucherUnused(){//已领取
                let params = {
                    customerNo :this.$store.state[CUSTOMERNO]
                };
                let data = await this.$axios.get("lszx/myVoucherUnused",params);
                this.list = [...this.list,...data.data.data];
            },
            async myVoucherUsing(pageNum,pageSize){//使用中
                if(isNull(this.$store.state[CUSTOMERNO])){
                    let res = await this.$axios.get("/custrouting");
                    if(res.state!="00" && res.thirdnumber==null){
                        this.$router.back(-1);
                    }else{
                        this.$store.commit(CUSTOMERNO,res.thirdnumber);
                    }
                }
                let params = {
                    customerNo:this.$store.state[CUSTOMERNO],
                    pageNum:pageNum,
                    pageSize:pageSize
                };
                let data = await this.$axios.get("lszx/myVoucherUsing",params);
                this.list = [...this.list,...data.data.data];
                return data.data.data;
            },
            upgradeType(label,tabkey){
                this.list = [];
                if(tabkey==1){
                    this.myVoucherUnused();
                }else{
                    this.myVoucherUsing(1,10);
                }
            },
            async upCallback(page, mescroll){
                let data = await this.myVoucherUsing(page.num,page.size);
                console.log("upCallback");
                mescroll.endSuccess(data.length);
            },
            downCallback(){
                this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            }
        },
        components: {
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
    /* .bill-content {
        background-color: #fff;
    } */
    /* .center {
        padding-left: 8px;
        padding-right: 8px
    } */
    .coupon-body {
        padding-top: 10px;
    }
    .active-l {
        width: 94%;
        margin: 10px auto;
        height: 91px;
        background-image: url(../../lib/public/images/bs.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .left-l {
        width: 30%;
        height: 91px;
        line-height: 91px;
        text-align: center;
        font-size: 30px;
        color: #1D75D6;
        font-weight: 700
    }
    .active-right {
        width: 62%;
        height: 91px;
        padding-top: 20px;
        padding-right: 10%;
        position: relative;
    }
    .btn {
        width: 75px;
        height: 28px;
        border: 1px solid #1D75D6;
        border-radius: 14px;
        color: #1D75D6;
        text-align: center;
        line-height: 28px;
        position: absolute;
        top: 32%;
        right: 2%;
    }
    .right-i h1 {
        margin-bottom: 5px;
        font-size: 13px;
    }
    .right-i p {
        font-size: 12px;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .number {
        color: #c3c3c3;
    }
</style>

