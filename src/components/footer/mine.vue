<template>
    <div class="mine_content">
        <div class="center">
            <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
                <!-- 顶部区域 -->
                <mt-header :title="change" fixed>
                    <span slot="left" @click="goBack()">
                        <mt-button icon="back" >返回</mt-button>
                    </span>
                </mt-header>
                <!-- 头部区域 -->
                <div class="mine-header">
                    <input type="file" accept="image/*" id="headimg" @change="uploadFile($event)" />
                    <!-- capture="camera" 添加这个属性可以直接打开相机 -->
                    <img class="user-logo" @click="openActionsheet('headimg')" :src="headimg" alt="">
                    <div class="mine-name">
                        <p>{{userInfo.customer.realname}}</p>
                        <p>{{userInfo.customer.phonenumber}}</p>
                    </div>
                </div>
                <hr color="#ccc">
                <div class="mine-money">
                    <div class="l">
                        <h2>我的收入</h2>
                        <br>
                        <h1>{{balance}}<span>元</span></h1>
                    </div>
                    <div class="c">
                        <h2>我的积分</h2>
                        <br>
                        <h1>{{pointbalance}}</h1>
                    </div>
                    <div class="r">
                        <h2>我的刷卡金</h2>
                        <br>
                        <h1>{{cardmoney}}<span>元</span></h1>
                    </div>
                </div>
                <hr color="#ccc">
                <div class="mine-a">
                    <div class="mine-b" :style="{backgroundImage: 'url(' +Img[0] + ')'}">
                             <div class="mui-table-view-cell">
                                    <router-link class="mui-navigate-right" :to="userInfo.customer.levelvalue==0?'/vip':''">
                                        <p class="pick"></p>

                                        <h1 class="bg" v-if="userInfo.customer.levelvalue==0">普通会员</h1>
                                        <span class="mui-badge coupn" v-if="userInfo.customer.levelvalue==0">可升级成会员</span>

                                        <h1 class="bg"  v-if="userInfo.customer.levelvalue==1">卡小白</h1>
                                        <span class="mui-badge coupn"  v-if="userInfo.customer.levelvalue==1">可升级成卡小主</span>

                                        <h1 class="bg"  v-if="userInfo.customer.levelvalue==2">卡小主</h1>
                                        <span class="mui-badge coupn"  v-if="userInfo.customer.levelvalue==2">可升级成卡小王</span>

                                        <h1 class="bg" v-if="userInfo.customer.levelvalue==3">卡小王</h1>
                                        <span class="mui-badge coupn" v-if="userInfo.customer.levelvalue==3">终极会员</span>

                                    </router-link>
                            </div>
                    </div>
                </div>
                <!-- <div class="mine_show">
                           <li class="mui-table-view-cell">
                               <router-link class="mui-navigate-right" style="font-weight:70;" to="/mine/profit">
                		           <span class="mui-badge"></span>
                		           我的收益
                               </router-link>
                            </li>
                        </div> -->
                <div class="dao">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            <span class="mui-badge">{{phonenumber}} {{realname}}</span>
                            <img v-lazy="'../../lib/public/images/bp.png'" alt="">
                            <h1>推荐人</h1>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/mine/fenxi">
                            <img v-lazy="'../../lib/public/images/mx.png'" alt="">
                            <h1>分润明细</h1>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/home/team">
                            <img v-lazy="'../../lib/public/images/hy.png'" alt="">
                            <h1>会员管理</h1>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/mine/certification">
                            <img v-lazy="'../../lib/public/images/sm.png'" alt="">
                            <h1>实名认证</h1>
                            <span class="mui-badge mui-badge-danger" v-if="getRealnamestate==0">未认证</span>
                            <span class="mui-badge mui-badge-warning" v-if="getRealnamestate==1">审核中</span>
                            <span class="mui-badge mui-badge-success" v-if="getRealnamestate==2">审核通过</span>
                            <span class="mui-badge mui-badge-danger" v-if="getRealnamestate==3">审核不通过</span>
                            <span class="mui-badge mui-badge-danger" v-if="getRealnamestate==4">四要素不正确</span>
                            <span class="mui-badge mui-badge-danger" v-if="getRealnamestate==4">人脸识别不通过</span>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/mine/coupon">
                            <img v-lazy="'../../lib/public/images/youhuiquan.png'" alt="">
                            <h1>我的优惠卷</h1>
                        </router-link>
                    </li>
                    <!--<li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/mine/rate">
                            <img v-lazy="'../../lib/public/images/flv.png'" alt="">
                            <h1>我的费率</h1>
                        </router-link>
                    </li>-->
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/mine/mycard">
                            <img v-lazy="'../../lib/public/images/js.png'" alt="1">
                            <h1>我的结算卡</h1>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell show">
                        <a class="mui-navigate-right">
                            <img v-lazy="'../../lib/public/images/flv.png'" alt="1">
                            <h1>更换结算卡</h1>
                        </a>
                        <h4 class="show1">备注:&nbsp;&nbsp;此功能仅限于交易不到账由客服引导时使用</h4>
                    </li>
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/addcontrol">
                            <img v-lazy="'../../lib/public/images/localtion.png'" alt="1">
                            <h1>地址管理</h1>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/wpsw2">
                            <img v-lazy="'../../lib/public/images/ma.png'" alt="1">
                            <h1>修改密码</h1>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right" @click="server">
                            <img v-lazy="'../../lib/public/images/kf.png'" alt="1">
                            <h1>客服</h1>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <router-link class="mui-navigate-right" to="/setting">
                            <img v-lazy="'../../lib/public/images/shezhi.png'" alt="1">
                            <h1>设置</h1>
                        </router-link>
                    </li>
                </div>
            </yd-pullrefresh>
        </div>
        <!-- 客服弹框 -->
        <yd-popup v-model="show3" position="center" width="45%">
            <div class="ser-person">
                <h1 class="phone">400&nbsp;&nbsp;666&nbsp;&nbsp;3958</h1>
                <div class="ser-footer">
                    <div class="ser-l" @click="noser">取消</div>
                    <a href="tel:4006663958" class="ser-r">呼叫</a>
                </div>
            </div>
        </yd-popup>
    </div>
</template>
<script>
    import {
        R_parse_url
    } from '../../util/Regular';
    import {
        USERINFO
    } from '../../store/types'
    export default {
        data() {
            return {
                nlist: [],
                change: "我的",
                show3: false,
                headimg: "https://m.mi.com/static/img/avatar.76a75b8f17.png",
                userInfo: {},
                balance:0.00,
                pointbalance:0.00,
                cardmoney:0.00,
                phonenumber:"",
                realname:"",
                Img:['../../lib/public/images/card.png','../../lib/public/images/card1.png','../../lib/public/images/card2.png','../../lib/public/images/card3.png']
            }
        },
        computed:{
            getRealnamestate:function(){
                return this.userInfo.customer.realnamestate;
            }
        },
        created() {
            this.init();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showmenu = true;
            next()
        },
        mounted(){
    
        },
        methods: {
            server() {
                this.show3 = true
            },
            noser(){
                this.show3=false
            },
            loadList() {
                this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad')
            },
            goBack() {
                this.$router.go(-1)
            },
            openActionsheet(inputid) {
                document.getElementById(inputid).click();
            },
            // 上传文件
            async uploadFile(e) {
                // this.avatarFile = e.target.value
                let id = event.target.id; //获取input文件id
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.avatarFile = files[0];
                let param = new FormData(); //创建form对象
                param.append('file', this.avatarFile); //通过append向form对象添加数据
                let data = await this.$axios.postFile("/customer/customerUploadImg", param, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if ("00" == data.state) {
                    this.userInfo.headimage = data.data.imgUrl;
                    this.$store.commit(USERINFO, JSON.stringify(this.userInfo)); //图片存入缓存
                    this.$axios.post("/customer/headimage", {
                        headimage: data.data.imgUrl
                    });
                    let imageurl = data.data.imgUrl;

                    this[id] = data.data.imgUrl;
                    this.userInfo.customer.headimage = imageurl;
                    this.$store.commit(USERINFO, JSON.stringify(this.userInfo));
                }
            },
            init() {
                console.log("mine init start");
                this.userInfo = JSON.parse(this.$store.state[USERINFO]); //获取用户信息
                console.log(this.userInfo);
                //判断用户信息里面头像是否存在
                if (R_parse_url.test(this.userInfo.customer.headimage)) {
                    this.headimg = this.userInfo.customer.headimage;
                }
                this.balance = this.userInfo.balance;
                this.pointbalance = this.userInfo.pointbalance;
                this.cardmoney = this.userInfo.cardmoney;
                this.realname = this.userInfo.realname;//推荐人姓名
                this.phonenumber = this.userInfo.phonenumber;//推荐人手机号
                console.log("mine init end");
            }
        },
        components: {}
    }
</script>
<style scoped>
    .center {
        padding-top: 40px;
        padding-left: 5px;
        padding-bottom: 50px;
    }
    .mine_content {
        background-color: #fff;
    }
    .mine-header {
        display: flex;
        align-items: center;
        height: 70px;
    }
    .mint-header {
        background-color: #fff;
        color: #000;
        border-bottom: 1px solid #ccc;
    }
    .bg,
    .coupn {
        color: #9c5205;
        background-color: rgba(0, 0, 0, 0)
    }
    .mine-a {
        width: 100%;
        height: 70px;
        padding-left: 10px;
        padding-right: 20px;
        position: relative;
    }
    .mine-b {
        /* background-image: url(../../lib/public/images/card.png); */
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        margin-top: 10px;
        padding-top: 10px;
        margin-bottom: 10px;
        line-height: 30px;
        height: 70px;
    }
    .pick{
        width: 30px;
        display: inline-block;
    }
   .mui-table-view-cell > a:not(.mui-btn).mui-active {
     background-color: rgba(0, 0, 0, 0 ); 
   }
    .mine-money {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .l,
    .c,
    .r {
        width: 30%;
    }
    .c {
        border-left: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
    }
    .mine-money h1 {
        font-size: 16px;
        text-align: center;
    }
    .mine-money h1 span {
        font-size: 12px;
    }
    .mine-money h2 {
        height: 10px;
        line-height: 10px;
        text-align: center;
        font-size: 12px;
    }
    .mine-name {
        padding-left: 10px;
    }
    p {
        margin-top: 2px;
        padding-left: 3px;
        color: #000
    }
    .user-logo {
        width: 60px;
        height: 60px;
        border-radius: 50%
    }
    h1 {
        font-size: 18px;
    }
    .mine-word {
        font-size: 30px;
        height: 50%;
        line-height: 47px;
    }
    .mine_show {
        height: 35px;
    }
    li {
        list-style: none
    }
    .mui-navigate-right {
        display: flex;
        align-items: center;
    }
    .mui-navigate-right>h1 {
        font-size: 13px;
        display: inline;
        margin-left: 5px;
        vertical-align: middle;
    }
    .mui-navigate-right>img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }
    .mui-table-view-cell>a:not(.mui-btn) {
        font-size: 15px;
    }
    .dao {
        margin-top: 10px;
    }
    input[type=file] {
        display: none;
    }
    .ser-person {
        width: 100%;
        height: 112px;
        background-color: #fff;
        border-radius: 10px;
    }
    .phone {
        width: 100%;
        height: 70px;
        font-size: 18px;
        color: #333333;
        text-align: center;
        line-height: 70px;
    }
    .ser-footer {
        display: flex
    }
    .ser-l,
    .ser-r {
        display: block;
        height: 40px;
        width: 50%;
        line-height: 40px;
        font-size: 15px;
        color: #333333;
        text-align: center;
    }
    .ser-r {
         border-top: 1px solid #979797;
        color: #1D75D6;
         border-radius: 0 0 10px 0;
    }
    .ser-l{
        border-top: 1px solid #979797;
        border-right: 1px solid #979797;
       border-radius: 0 0 0 10px;  
    }
    #test{
      width: 100%;
    }
    .big{
        width: 100%;
        position: absolute;
        left: 50%;
        top: 68%;
        transform: translate(-50%,-50%)
    }
    .show{
     position: relative;
    }
    .show1{
     position: absolute;
     left: 15%;
     bottom: 0px;
     color: #f00;
    }
</style>

