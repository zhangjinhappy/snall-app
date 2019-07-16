<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <br>
        <div class="center">
        <div class="btn">
            <div class="btn1">
                <label><i>支行名称:</i>
                    <input type="search" class="input1" placeholder="请填写支行名称" v-model="params.bankname"></label>
            </div>
            <input class="btn2" type="button" value="查找支行" @click="search">
        </div>
        <hr>
        <br>
        <ul class="content" v-if="banklist.length!=0">
            <div ref="mescroll" class="mescroll">
                <div>
                    <li v-for="(bank,key) in banklist" :key="key" @click="selectBank(bank)">{{bank.bankname}}</li>
                </div>
            </div>
        </ul>
    </div>
    </div>
</template>
<script>
    import QS from 'qs'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import {isNull} from '../../util/Is';
    export default {
        data() {
            return {
                chang: "支行查询",
                banklist: [],
                params: {
                    city: "",
                    bankcode: "",
                    currPage: 0,
                    limit: 20,
                    bankname:""
                }

            }
        },
        watch: {
            'params.bankname' :function(val,oldVal) {
                this.search();
            }
        },
        created() {
            console.log("banklist created start");
            let a = localStorage.getItem("params");
            if(isNull(a)){//如果为空返回上一个路由
                this.$router.back(-1);
            }
            let params = JSON.parse(a);
            if(isNull(params.bankcode) || isNull(params.bankInfocitycode)){
                this.$router.back(-1);
            }
            this.params.bankcode = params.bankcode;
            this.params.city = params.bankInfocitycode.substring(0, 4);
            this.initMeScroll();
            console.log("banklist created end ");

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
        beforeDestroy(){
            this.mescroll.destroy();
        },
        methods: {
            selectBank(bank){
                console.log("banklist init start");
                let params = JSON.parse(localStorage.getItem("params"));
                console.log(params);
                params.bankname = bank.bankname;
                params.branchbankcode = bank.branchbankcode;
                console.log(params);
                localStorage.setItem("params",JSON.stringify(params));
                this.banklist = [];
                this.mescroll.destroy();
                console.log("banklist init end");
                this.$router.back(-1);
            },
            async upCallback(page, mescroll){
                console.log(page);
                let data = await this.onload(page.num,page.size);
                console.log(data);
                this.banklist = [...this.banklist, ...data.dataList];
                console.log(data.dataList.length);
                mescroll.endSuccess(data.dataList.length);
            },
            async search(){
                // let data = await this.onload(1,10);
                // this.banklist = [...data.dataList];
                this.banklist = [];//搜索要把数据置空
                //创建MeScroll对象
                this.initMeScroll();
            },
            onload(currPage,limit){
                this.params.currPage = currPage;
                this.params.limit = limit;
                let params = QS.stringify(this.params);
                return this.$axios.get("/branchbank/getBranBankByPage?" + params);
            },
            initMeScroll(){
                //创建MeScroll对象
                this.mescroll = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                    // down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
                    up: {
                        callback: this.upCallback,
                        toTop: {
                            //回到顶部按钮
                            src: "../../lib/public/images/top.png", //图片路径,默认null,支持网络图
                            offset: 100 //列表滚动1000px才显示回到顶部按钮
                        }
                    }
                });

            }
        },
        components: {},
        mounted: function () {
            console.log("这里现在不做事");
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
    .btn {
        display: flex;
        align-items: center;
    }

    .btn1 {
        display: flex;
        align-items: center;
    }

    .btn1 i {
        font-size: 18px;
        font-weight: 700;
    }

    .input1 {
        border: 1px solid #ccc;
        width: 3.4rem;
    }

    .content {
        width: 95%;
        margin: 0px auto;
        list-style: none;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .content li {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: left;
        border: 1px solid #ccc;
        color: #555555;
        font-size: 14px;
        padding-left: 10px;
    }

    .yd-navbar {
        border-bottom: 1px solid
    }

    input[type='button'] {
        margin-bottom: 15px;
        background-color: rgb(231, 61, 9);
        color: #fff;
    }

    .btn1 {
        margin-right: 2px;
    }
</style>

