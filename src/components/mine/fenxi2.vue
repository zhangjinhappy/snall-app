<template>
    <div class="bill-content">
        <yd-navbar :title="chang"> </yd-navbar>
        <div class="center">
            <div class="fenxi3-body">
                <ul>
                    <li v-for="(obj,key) in dataList" :key="key"><img v-lazy="'../../lib/public/images/frn.png'" alt="qqq">
                        <div class="time">
                            <p>你产生了一笔<span>￥{{obj.profit}}</span>的分润已到账</p>
                            <p>{{formatDateTime(obj.addtime)}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {isNull} from "../../util/Is";
    import {formatDateTime} from '../../util/TimeUtils'
    export default {
        data() {
            return {
                chang: "分润明细",
                params: {
                    "currPage": 1,
                    "limit": 20,
                    "types": [1, 2, 3],
                    "startTime": "2019-03-03",
                    "endTime": "2019-04-04"
                },
                dataList:[]
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
                let d = localStorage.getItem("fenxi");
                if(isNull(d)){
                    this.$router.back(-1);
                }
                let data = JSON.parse(d);
                console.log("fenxi2 init");
                console.log(data);
                this.params.startTime = data.addtime;
                this.params.endTime = data.addtime;
                this.params.types = data.types;
                this.getList()
            },
            async getList(){
                let params = this.params;
                params.startTime = this.params.startTime + " 00:00:00";
                params.endTime = this.params.endTime + " 23:59:59";
                params.types = this.params.types.toString();
                let res = await this.$axios.get("/custprofitdetail/getprofitdetail", params);
                this.dataList = [...this.dataList,...res.dataList];
            },
            formatDateTime
        },
        components: {
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff
    }
    .center {
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    ul {
        list-style: none
    }
    li {
        padding-left: 10px;
        margin-top: 10px;
        display: flex;
        align-items: center
    }
    .time>p>span {
        color: #f00;
    }
</style>

