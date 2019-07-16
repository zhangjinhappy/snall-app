<template>
    <div>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>
        <input type="button" @click="fn" value="微信支付"/>

    </div>
</template>

<script>
    import QS from "qs"
    export default {
        name: "WXPay",
        created(){
          console.log("11111111111111111111111111111");
        },
        methods:{
            async fn(){
                let params ={
                    body:"远远",
                    outTradeNo:"2016",
                    money:"1"
                };
                let data = await this.$axios.get("/wx/pay?"+QS.stringify(params));
                data = data.data;
                this.$dialog.toast({
                    mes:data,
                    timeout:1500
                });


                function onBridgeReady(){
                    // {"msg":"查询成功","data":{"timeStamp":"1553696399","packageValue":"prepay_id=wx27222000133748a6e215ff130442135591","paySign":"A9FFCF9039CC51584864FC03EED89ADD","success":"ok","appid":"wx7851029a77b2f1ed","nonceStr":"312ae457718545edb164b4f7549de9c0"},"state":"00"}
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId":data.appid,     //公众号名称，由商户传入
                            "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr":data.nonceStr, //随机串
                            "package":data.packageValue,
                            "signType":"MD5",         //微信签名方式：
                            "paySign":data.paySign //微信签名
                        },
                        function(res){
                            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                alert("咱们革命胜利了");
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }
                        });
                }
                if (typeof WeixinJSBridge == "undefined"){
                    this.$dialog.toast({
                        mes:"到这里了吗",
                        timeout:1500
                    });
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                }else{
                    onBridgeReady();
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm =>{
                vm.$parent.$data.showfooter=false;
                vm.$parent.$data.showmenu=false
            })
        },
        beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true;
            this.$parent.$data.showmenu=true;
            next()
        },
    }
</script>

<style scoped>

</style>