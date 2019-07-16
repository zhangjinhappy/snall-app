<template>
    <div class="active-content">
        <yd-navbar :title="chang">
        </yd-navbar>
        <div class="center">
            <div class="content-header">
                <div class="content-left">
                    <yd-icon name="location" color="#16AA6B" size="26px"></yd-icon>
                    <span>{{resultCityName}}</span>
                </div>
                <input type="search" placeholder="搜索店名" v-model="params.name">
            </div>
            <div class="content-body">
                <select v-model="params.type">
                    <option value="">全部</option>
                    <option>饮餐</option>
                    <option>娱乐</option>
                    <option>住宿</option>
                    <option>生活</option>
                    <option>购物</option>
                    <option>加油站</option>
                </select>
                <select>
                    <option>{{resultCityName}}</option>
                </select>
                <select>
                    <option>附近</option>
                </select>
            </div>
            <div class="active-footer">
                <div ref="mescroll" class="active-l mescroll" v-for="(obj,key) in dataList" :key="key">
                    <div class="left-l">
                        8.8 <span>折</span>
                    </div>
                    <div class="active-right">
                        <div class="right-i">
                            <h1>{{obj.fMerchantName}}</h1>
                            <p>无门槛，最高折扣500元</p>
                            <p>有效期至{{new Date('2019-05-02').getFullYear()}}年{{new Date(obj.expiredDate).getMonth() + 1}}月{{new Date(obj.expiredDate).getDate()}}日</p>
                        </div>
                        <div class="btn" v-if="!obj.isSelected" @click="receiveVoucher(obj,key)">立即领取</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import {CUSTOMERNO} from '../../store/types';
    export default {
        data() {
            return {
                chang: "生活圈",
                resultCityName: "北京市",
                dataList: [],
                mescroll: null, //mescroll实例对象
                params: {
                    pageNum: 0,
                    name: "",
                    type: "",
                    customerNo:""
                }
            }
        },
        watch: {
            'params.name': async function(newQuestion, oldQuestion) {
                console.log(newQuestion);
                let data = await this.search(0);
                if (data.state == "00" && data.data.code == 1) {
                    this.dataList = data.data.data;
                }
                this.mescroll.endSuccess(data.data.data.length);
            },
            'params.type': async function(newQuestion, oldQuestion) {
                console.log(newQuestion);
                let data = await this.search(0);
                if (data.state == "00" && data.data.code == 1) {
                    this.dataList = data.data.data;
                }
                this.mescroll.endSuccess(data.data.data.length);
            }
        },
        created() {
            this.params.customerNo = this.$store.state[CUSTOMERNO];
            this.po();
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
            po() { //定位方法
                AMap.plugin('AMap.CitySearch', () => {
                    let citySearch = new AMap.CitySearch();
                    citySearch.getLocalCity((status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            // 查询成功，result即为当前所在城市信息
                            //{"type":"complete","status":"1","info":"OK","infocode":"10000","province":"安徽省","city":"合肥市","adcode":"340100","rectangle":"117.1607029,31.7792464;117.3938406,31.96293993","swa":"jsonp_606519_","bounds":{"CLASS_NAME":"AMap.Bounds","oc":{"Q":31.7792464,"R":117.16070289999999,"lng":117.160703,"lat":31.779246},"ac":{"Q":31.96293993,"R":117.39384059999998,"lng":117.393841,"lat":31.96294},"southwest":{"Q":31.7792464,"R":117.16070289999999,"lng":117.160703,"lat":31.779246},"northeast":{"Q":31.96293993,"R":117.39384059999998,"lng":117.393841,"lat":31.96294}}}
                            this.resultCityName = result.city;
                            console.log("城市是哪里" + JSON.stringify(result));
                        }
                    })
                })
            },
            async upCallback(page, mescroll) {
                let data = await this.search(page.num);
                //data.data.count//总条数
                if (data.state == "00" && data.data.code == 1) {
                    this.dataList = [...this.dataList, ...data.data.data];
                }
                mescroll.endSuccess(data.data.data.length);
            },
            async search(pageNum) {
                this.params.pageNum = pageNum;
                let data = await this.$axios.get("lszx", this.params);
                return data;
            },
            async receiveVoucher(obj, key) {
                let params = {
                    cupsId: obj.fCupsId,
                    customerNo: this.params.customerNo
                };
                let data = await this.$axios.post("lszx", params);
                if (data.state == "00") {
                    this.dataList[key].isSelected = !this.dataList[key].isSelected;
                }
            }
        },
        mounted: function() {
            //创建MeScroll对象
            this.mescroll = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down: {
                    callback: () => {
                        this.mescroll.endSuccess();
                    }
                }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
                up: {
                    callback: this.upCallback,
                    toTop: {
                        //回到顶部按钮
                        src: "../../lib/public/images/top.png", //图片路径,默认null,支持网络图
                        offset: 100 //列表滚动1000px才显示回到顶部按钮
                    }
                },
                empty: {
                }
            })
        },
        beforeDestroy() {
            this.mescroll.destroy();
        },
        components: {}
    }
</script>
<style scoped>
    .active-content {
        background-color: #fff;
    }
    .center {
        padding-left: 10px;
        padding-right: 10px
    }
    .yd-icon-location:before {
        vertical-align: bottom;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .content-header {
        padding-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .content-left {
        height: 49px;
    }
    .content-left span {
        font-size: 16px;
        padding-left: 13px;
    }
    input {
        width: 60%;
        height: 30px;
        border-radius: 24px 24px 24px 24px;
    }
    .content-body {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 16px;
        text-align: center;
        padding-left: 32px;
    }
    .active-l {
        width: 100%;
        margin-top: 10px;
        height: 91px;
        background-image: url(../../lib/public/images/bs.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        width: 54px;
        height: 25px;
        border: 1px solid #1D75D6;
        border-radius: 14px;
        color: #1D75D6;
        font-size: 11px;
        text-align: center;
        line-height: 25px;
        position: absolute;
        top: 38%;
        right: 2%;
    }
    .right-i h1 {
        margin-bottom: 5px;
        font-size: 13px;
    }
    .right-i p {
        font-size: 12px;
    }
    .active-left {
        width: 30%;
        height: 50px;
        text-align: center;
        font-size: 30px;
        font-weight: 900;
        line-height: 50px
    }
    .active-left span {
        font-size: 16px;
    }
    .active-footer {
        background-color: #eee;
        padding-top: 1px;
        padding-left: 5px;
        padding-right: 5px;
        padding-bottom: 8px;
    }
</style>

