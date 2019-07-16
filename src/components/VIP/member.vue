<template>
    <div class="bill-content">
        <navname :navname="chang"></navname>
        <!-- <yd-navbar :title="chang"></yd-navbar> -->
        <div class="center">
            <div class="member-header">
                <div class="g">
                    <div class="a" @click="sun1">优合会员特权</div>
                    <div class="a" @click="sun">特权详情 &nbsp;></div>
                </div>
                <div class="tu">
                    <a href="javascript:void(0)">
                        <div class="s"><img src="../../lib/public/images/v1.png" alt="1"></div>
                        <h1>400元</h1>
                        <h1>刷金卡</h1>
                    </a>
                    <a href="javascript:void(0)">
                        <div class="s"><img src="../../lib/public/images/v2.png" alt="1"></div>
                        <h1>自刷</h1>
                        <h1>返还分润</h1>
                    </a>
                    <a href="javascript:void(0)">
                        <div class="s"><img src="../../lib/public/images/v3.png" alt="1"></div>
                        <h1>分享体验</h1>
                        <h1>顶级</h1>
                    </a>
                    <a href="javascript:void(0)">
                        <div class="s"><img src="../../lib/public/images/v4.png" alt="1"></div>
                        <h1>邀请可获</h1>
                        <h1>佣金</h1>
                    </a>
                    <a href="javascript:void(0)">
                        <div class="s"><img src="../../lib/public/images/v5.png" alt="1"></div>
                        <h1>无限赚取</h1>
                        <h1>分润</h1>
                    </a>
                    <a href="javascript:void(0)">
                        <div class="s"><img src="../../lib/public/images/v6.png" alt="1"></div>
                        <h1>刷卡还得</h1>
                        <h1>佣金</h1>
                    </a>
                </div>
            </div>
            <br>
            <div class="member-body">
                <h1>开通服务:&nbsp;&nbsp;&nbsp;卡农</h1>
                <div class="per">
                    <p class="card">卡农</p>
                    <h3 class="k">￥{{params.money}}</h3>
                    <p>六大权益+价值998元终身养卡系统+价值298元腾讯乐刷M60养卡</p>
                </div>
            </div>
        </div>
            <p class="pos">选择支付方式</p>
        <div class="center">
					<div class="mui-input-row mui-checkbox">
						<label id="label">
                            <yd-icon name="weixin" color="#62b900"></yd-icon>
                            <h1 class="order-bill">微信</h1> 
                         </label>
						  <img src="../../lib/public/images/txian5.png" alt="">
					</div>
					<!-- <div class="mui-input-row mui-checkbox">
						<label id="label">
                            <img src="../../lib/public/images/zhifubao.png" alt="1">
                            <h1 class="order-bill">支付宝</h1>  
                        </label>
						<input name="checkbox1" value="Item 4" type="checkbox" >
					</div> -->
             <!-- </div> -->
            <!-- 按钮  -->
            <div class="footer-btn">
                <span class="bg"></span>
                <div class="l">
                    <h1 class="z">合计金额:<span style="color:#f00">￥{{params.money}}</span></h1>
                </div>
                <div class="r" @click="order()">
                    立即开通
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import navname from '../subcomponents/nav.vue'
  import {
      USERINFO
  } from '../../store/types'
    export default {
        data() {
            return {
                checkbox1: true,
                chang: "开通会员",
                checkbox1:'',
                params: {
                    "body": "提高权限",
                    "money": "0.1",
                    "ordertype": "1",
                    "paytype": "wx"
                },
                oncli : 1
            }
        },
        created() {},
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
            sun() {
                this.$router.push({
                    name: "vip1"
                })
            },
            sun1() {
                this.$router.push({
                    name: "vip1"
                })
            },
            async order() {
                if(this.oncli!=1){
                    this.$dialog.toast({
                        mes: "订单确认中，请稍后重试",
                        timeout: 1500
                    });
                    return;
                }
                this.oncli = 2;
                let data = await this.$axios.post("/custaddorder/placeOrder", this.params);
                if(data.state!="00"){
                    this.$dialog.toast({
                        mes: data.msg,
                        timeout: 1500
                    });
                    return;
                }else{
                    setTimeout(()=>{
                        this.oncli = 1;
                    },3000)
                }
                data = data.data;
                onBridgeReady = ()=>{
                    // {"msg":"查询成功","data":{"timeStamp":"1553696399","packageValue":"prepay_id=wx27222000133748a6e215ff130442135591","paySign":"A9FFCF9039CC51584864FC03EED89ADD","success":"ok","appid":"wx7851029a77b2f1ed","nonceStr":"312ae457718545edb164b4f7549de9c0"},"state":"00"}
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": data.appid, //公众号名称，由商户传入
                            "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                            "nonceStr": data.nonceStr, //随机串
                            "package": data.packageValue,
                            "signType": "MD5", //微信签名方式：
                            "paySign": data.paySign //微信签名
                        },(res)=>{
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            this.$dialog.toast({
                                mes: "恭喜升级成功!",
                                icon: 'success',
                                timeout: 1500
                            });
                            setTimeout(()=>{
                                window.location.href = "/";
                            },1500)


                            // this.$store.commit(USERINFO, null);
                            // this.$router.push({name:"/home"})
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        }
                    });
                };
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            }
        },
        components: {
            navname
        }
    }
</script>
<style scoped>
    .center {
        padding-left: 10px;
        padding-right: 10px;
        background-color: #fff;
    }
    .a {
        line-height: 48px;
        height: 40px;
        text-align: center;
    }
    .s {
        padding-left: 5px;
    }
    .g {
        height: 40px;
        font-size: 15px;
        color: #333333;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tu {
        padding-top: 14px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .tu img {
        width: 40px;
        height: 40px;
    }
    .tu h1 {
        padding-top: 5px;
        font-size: 10px;
        color: #333333;
        font-weight: 400;
        text-align: center;
    }
    .per {
        margin: 0 auto;
        padding-left: 16px;
        padding-right: 28px;
        width: 74%;
        height: 132px;
        background-image: url(../../lib/public/images/bg1.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }
    .member-body {
        height: 195px;
    }
    .member-body>h1 {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        color: #333333;
    }
    .per>p{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333
    }
    .k {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 20px;
        text-align: left;
    }
    .mui-checkbox{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .card {
        padding-top: 9px;
        text-align: left;
        color: #333;
    }
    .order-a {
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .order-bill {
        padding-left: 15px;
    }
    .footer-btn {
        position: fixed;
        bottom: 1px;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: flex-end;
    }
    .l {
        width: 40%;
        height: 50px;
        display: flex;
        align-items: center;
        background-color: #fff;
    }
    .r {
        background-color: #1F76D7;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        color: #fff;
        text-align: center;
        width: 30%;
    }
    .bg {
        display: block;
        background-color: #fff;
        width: 30%;
        height: 50px;
    }
    .l .z {
        padding-left: 10px;
        font-size: 15px;
        font-weight: 400;
        color: #333333;
        text-align: center;
    }
    .pos{
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        text-align: left
    }
    #label{
        display: flex;
        align-items: center;
    }
    .mui-checkbox input[type='checkbox'] {
    margin-top: 10px;
    }
</style>

