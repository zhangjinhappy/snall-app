<template>
    <div class="bill-content">
        <header class="mui-bar mui-bar-nav">
                <h1 class="mui-title">{{chang}}</h1>
        </header>
        <div class="center">
        <div class="login-img">
            <img src="../../lib/public/images/Vipd.png" alt="11"><br>
            <p>开通优合会员，可享受超多会员权益</p><br>
            <h1 class="member-q">会员权益</h1>
            <hr style="width:60%">
        </div>
        <br>
        <div class="member-body">
            <div class="member-l">
                <div class="l-header">
                    卡小白
                </div>
                <div class="l-h1">
                    <h1>398元=</h1>
                    <p style="height:117px">398元=六大权益+价值998元终身养卡系统+价值298元腾讯乐刷M60养卡机器1台</p> 
                    <p>400元刷卡金（每刷1万可抵5元，有效期365天）</p>
                    <p style="height:93px">自刷额外返0.01%（不与其他优惠同享）</p>
                    <p>分享1人即可体验“卡神”级别，享受最低0.53%的刷卡费率（每分享1人，体验为有效期10天，上不封顶）</p>
                    <p>直接邀请1人可获得58元,间接邀请1人可获得28元</p>
                    <p>分享任意用户申请信用卡、办理贷款、商城消费，均可获得直属伙伴业务佣金的50%，间接伙伴业务佣金的10%</p>
                    <p>在该机器上每刷1万元额外可获得100积分</p>
                </div>
                
            </div>
            <div class="member-c">
                 <div class="c-header">
                    卡小主
                </div>
                <div class="l-h1">
                    <h1>卡小主</h1>
                    <p style="height:117px">(直推会员20人即可升级)</p>
                    <p style="height:74px; text-align: center; font-size: 18px;line-height: 64px;">∅</p>
                    <p style="height:93px">自刷额外返0.06%，同级额外返0.05%(不与其他优惠同享)</p>
                    <!-- <p style="height:95px; text-align: center; font-size: 18px;line-height:80px;">∅</p> -->
                    <p>分享1人即可体验“卡小王”级别，享受最低0.53%的刷卡费率（每分享1人，体验为有效期10天，上不封顶）</p>
                    <p>直接邀请1人可获得78元，间接邀请1人可获得38元</p>
                    <p>分享任意用户申请信用卡、 办理贷款、商城消费、均可获得直属伙伴业务佣金的60% , 间推伙伴业务佣金的15%</p>
                    <p>在该机器上每刷1万元额外可获得200积分</p>
                </div>
                 <hr>
            </div>
            <div class="member-r">
                 <div class="r-header">
                    卡小王
                </div>
                <div class="l-h1">
                    <h1>卡小王</h1>
                    <p style="height:117px">(间推会员200人+直推第二级别3个即可升级)</p>
                    <p  style="height:74px; text-align: center; font-size: 18px;line-height: 64px;">∅</p>
                    <p style="height:93px">自刷额外返0.07%，同级额外返0.05%(不与其他优惠同享)</p>
                    <p  style="height: 137px; text-align: center; font-size: 18px; line-height: 134px;">∅</p>
                    <p>直接邀请1人可获得98元，间接邀请1人可获得48元</p>
                    <p>分享任意用户申请信用卡、办理贷款、在商城消费、均可获得直属伙伴业务佣金的70%，间推伙伴业务佣金的20%</p>
                    <p>在该机器上每刷1万元额外可获得300积分</p>
                </div>
                <hr>
            </div>
        </div>
       
         <div class="footer-btn">
            <div class="l">
               <img src="../../lib/public/images/VIP.png" alt="">
               <h1 class="z">加入优合会员，享有更多特权</h1>
            </div>
            <div class="r" @click="vip">
               立即开通
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           chang:"会员权益"
        }
    },
    created(){

    },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
           vm.$parent.$data.showfooter=false
           vm.$parent.$data.showmenu=false
        })
    },
    beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true
            this.$parent.$data.showmenu=true
           next()
    },
    methods:{
     vip(){
         this.$router.push({name:"member"})
      }
    },
    components:{

    }

    
}
</script>
<style scoped>
.bill-content{
 background-color: #fff;
}
.center{
    padding-top: 44px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 85px; 
}
.mui-bar{
    background-color: #fff;
}
 .login-img{
        height: 220px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .member-q{
        width: 120px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        background-color: #fff;
        position: absolute;
        bottom: 12px;
        font-size: 18px;
        color: #333333;
    }
    .member-body{
        width: 100%;
        height: 744px;
        display: flex;
        justify-content:space-around;
    }
    .member-l,.member-c,.member-r{
       width: 33%;
       border-radius: 4px;
       height: 729px;
    }
     .l-header{
      width: 100%;
      text-align: center;
     font-family: PingFangSC-Regular;
     font-size: 16px;
     color: #FFFFFF;
      height: 45px;
      line-height: 45px;
      background-image: linear-gradient(-90deg, #F5D064 3%, #DF9A1E 100%);
     }
     .c-header{
        width: 100%;
      text-align: center;
     font-family: PingFangSC-Regular;
     font-size: 16px;
     color: #FFFFFF;
      height: 45px;
      line-height: 45px;
     background-image: linear-gradient(-90deg, #C5C5C5 3%, #A4A4A4 97%);
     }
    
     .r-header{
       width: 100%;
      text-align: center;
     font-family: PingFangSC-Regular;
     font-size: 16px;
     color: #FFFFFF;
      height: 45px;
      line-height: 45px;
      background-image: linear-gradient(-90deg, #87C9FB 3%, #688DE2 97%);
     }
     .l-h1{
         background-color: #F3F3F3;
     }
     .l-h1 h1{
         text-align: center;
         height: 30px;
         line-height: 40px;
         font-family: PingFangSC-Medium;
         font-size: 14px;
         color: #333333;
     }
     .l-h1 p{
         text-align: left;
         font-size: 12px;
         padding-left: 8px;
          border-bottom: 1px solid #ccc;
           width: 90%;
          margin: 0px auto;
          color: #333333;
         padding-bottom: 5px;
        padding-top: 5px;
     }
      .j{
         height: 60px;
         line-height: 50px;
         font-size: 18px;
         text-align: center;
     }
.footer-btn{
   position: fixed;
   bottom: 1px;
   width: 100%;
   height: 50px;
   background-color: #ccc;
   display: flex;
}
.l{
   width: 70%;
   height: 50px;
   display: flex;
   padding-left: 5px;
   align-items: center;
   background-color: #fff;
}
.r{
   background-color: #1F76D7 ;
   height: 50px;
   line-height: 50px;
   font-size: 15px;
   color: #fff;
   text-align: center;
   width: 30%;
}
.l .z{
   padding-left: 10px;
   font-size: 15px;
   color: #333333;
   text-align: center;
}
</style>

