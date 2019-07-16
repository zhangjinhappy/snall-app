<template>
   <div class="bill-content">
      <navname :navname="chang"></navname>
      <div class="center">
         <div class="vip-header">
            <h1>会员专区</h1>
            <div class="tu">
               <div class="tu-r">
                  <img v-lazy="'../../lib/public/images/tittle.png'" alt="45">
                  <div class="en">
                     <h2>张三</h2>
                     <h2>你已是卡农</h2>
                  </div>
               </div>
               <div class="btn0">
                  升级成为卡王
               </div>
            </div>
            <img class="img1" v-lazy="'../../lib/public/images/vbg.png'" alt="12" @click="btn0">
         </div>
          <h1 class="member"><img src="../../lib/public/images/huang2.png" alt="12">会员特权<img src="../../lib/public/images/huang1.png" alt="23"></h1>
         <yd-grids-group :rows="3" class="img">
            <yd-grids-item>
               <span slot="text">
                     <img v-lazy="'../../lib/public/images/v1.png'" alt="11">
                     <h1>400元刷卡金</h1>
                  </span>
            </yd-grids-item>
            <yd-grids-item>
               <span slot="text">
                     <img v-lazy="'../../lib/public/images/v2.png'" alt="22">
                     <h1>自刷返还分润</h1>
                  </span>
            </yd-grids-item>
            <yd-grids-item>
               <span slot="text">
                     <img v-lazy="'../../lib/public/images/v3.png'" alt="33">
                     <h1>分享体验顶级</h1>
                  </span>
            </yd-grids-item>
            <yd-grids-item>
               <span slot="text">
                     <img v-lazy="'../../lib/public/images/v4.png'" alt="444">
                     <h1>邀请可获得佣金</h1>
                  </span>
            </yd-grids-item>
            <yd-grids-item>
               <span slot="text">
                     <img v-lazy="'../../lib/public/images/v5.png'" alt="33">
                     <h1>无限赚取分润</h1>
                  </span>
            </yd-grids-item>
            <yd-grids-item>
               <span slot="text">
                     <img v-lazy="'../../lib/public/images/v6.png'" alt="44">
                     <h1>刷卡还得积分</h1>
                  </span>
            </yd-grids-item>
         </yd-grids-group>
         <div class="vip-body">
            <div class="btn4" @click="btn4">
            </div>
         </div><br>
        <h2 class="sp"><span class="sp-word">398</span>元=六大权益+价值<span class="sp-word">998</span>元终</h2>
         <h2 class="sp1">身养卡系统+价值<span class="sp-word">298</span>元腾讯乐刷M60</h2>
         <h2 class="sp2">养卡机器一台</h2>
         <div class="sp-card">
            <div class="hand" @click="page">
               <p style="color: #333333;font-size:16px;">智能匹配商户养卡</p>
               <p style="color: #333333;font-size:16px;">系统一套（终身使用）</p>
            </div>
            <div class="sp-hand" @click="dog">
               <p style="color: #333333;font-size:16px;">元腾讯乐刷M60养卡</p>
               <p style="color: #333333;font-size:16px;">大机器一台(无需冻结</p>
               <p style="color: #333333;font-size:16px;"> ,激活,免费赠送,直</p>
               <p style="color: #333333;font-size:16px;">接使用)</p>
            </div>
         </div>
        <div class="vip-footer">
            <h2>权限一:400元卡片金(每1万可抵5元,有效期365天)</h2>
            <img src="../../lib/public/images/mem1.png" alt="11">
            <h2>权限二:自刷额外返0.01%(不予其他优惠同享)</h2>
            <img src="../../lib/public/images/mem2.png" alt="22">
            <h2>权限三:分享一人即可体验"卡神"级别，享受最低0.53%的刷卡费率(每分享一人,体验有效期10天，上不封顶)</h2>
            <img src="../../lib/public/images/mem3.png" alt="33">
            <h2>权限四:直接邀请1人可获得58元，简接邀请1人可获得28元</h2>
            <img src="../../lib/public/images/mem4.png" alt="44">
            <h2>权限五:分享任意用户分享信用卡，办理贷款，商城消费，均可获得直属伙伴业务佣金的50%，间接伙伴业务佣金的10%</h2>
            <img src="../../lib/public/images/mem5.png" alt="55">
            <h2>权限六:在该机器上每刷1万元额外获取得100积分</h2>
            <img src="../../lib/public/images/mem6.png" alt="66">
         </div>
         <!-- 弹框 -->
         <yd-popup v-model="show1" position="center" width="70%" height="200px">
            <div class="user-header">
               <h1>恭喜成为</h1>
               <h1>--&nbsp;卡农&nbsp;--</h1>
            </div>
            <div class="btn1">
               <div class="img11"></div>
            </div>
         </yd-popup>
      </div>
   </div>
</template>
<script>
 import navname from '../subcomponents/nav.vue'
   export default {
      data() {
         return {
            chang: "会员管理",
            show1: false
         }
      },
      created() {
         this.gettan()
      },
      beforeRouteEnter(to, from, next) {
         next(vm => {
            vm.$parent.$data.showfooter = false
            vm.$parent.$data.showmenu = false
         })
      },
      beforeRouteLeave(to, from, next) {
         this.$parent.$data.showfooter = true
         this.$parent.$data.showmenu = true
         next()
      },
      methods: {
          page(){
           this.$router.push({name:"match"})
         },
         dog(){
            this.$router.push({name:"card"})
         },
         vip() {
            this.$router.push({
               name: "member"
            })
         },
          btn0(){
        this.$router.push({name:"vip2"})
      },
         btn4() {
            this.$router.push({
               name: "member1"
            })
         },
         gettan() {
            this.show1 = true
         }
      },
      components: {
         navname
      }
   }
</script>
<style scoped>
   .bill-content {
      background-color: #fff;
   }
   .center {
      padding-left: 10px;
      padding-right: 10px
   }
   .yd-navbar {
      border-bottom: 1px solid
   }
   .vip-header {
      padding-top: 10px;
      height: 204px;
      width: 100%;
      position: relative;
      background-color: #333333;
   }
   .tu {
      width: 80%;
      margin-top: 5px;
      margin: 0 auto;
      height: 150px;
      background-image: url(../../lib/public/images/bg1.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
   }
   .tu-r {
      height: 80px;
      width: 71%;
      margin: 0px auto;
      display: flex;
      align-items: center;
   }
   .tu-r img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
   }
   .tu-r h2 {
      font-weight: 600;
      padding-left: 10px;
      font-size: 15px;
      height: 21px;
   }
   .btn0 {
      width: 50%;
      height: 30px;
      margin: 0 auto;
      color: #fff;
      border-radius: 15px;
      background-color: #1E76D7;
      font-size: 15px;
      text-align: center;
      line-height: 30px;
   }
   .vip-header h1 {
      padding-left: 10px;
      padding-top: 5px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      font-weight: 500
   }
   .vip-body {
      width: 90%;
      margin: 0 auto;
      height: 120px;
      position: relative;
      background-image: url(../../lib/public/images/v7.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
   }
   .member {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
   }
   .img1 {
      width: 102%;
      position: absolute;
      bottom: 0;
      left: 0;
   }
   .img h1 {
      margin-top: 2px;
      font-size: 14px;
   }
   .img img {
      width: 60px;
      height: 60px;
   }
    .sp,
   .sp1,
   .sp2 {
      background-color: #CDE8FF;
      text-indent: 10px;
      font-size: 18px;
      letter-spacing: 0.3px;
      text-align: center
   }
   .sp2 {
      margin-top: 10px;
      padding-top: 4px;
      font-size: 20px;
      padding-bottom: 4px;
   }
   .sp {
      margin-top: 20px;
   }
   .sp1 {
      margin-top: 10px;
      padding-top: 4px;
   }
   .sp-word {
      font-size: 28px;
      color: #FFC817;
      text-shadow: -3px -1px 1px #007FFF;
   }
   .sp-card {
      margin-top: 10px;
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: space-between
   }
   .hand,
   .sp-hand {
      width: 50%;
      height: 140px;
      font-size: 18px;
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
   }
   .hand {
      padding-top: 13%;
      background-image: url(../../lib/public/images/h1.png);
   }
   .sp-hand {
      padding-top: 7%;
      background-image: url(../../lib/public/images/h2.png);
   }
   .vip-footer {
      padding-left: 10px;
      padding-right: 10px;
   }
   .vip-footer img {
      width: 100%;
   }
   .vip-footer h2 {
      font-size: 14px;
      line-height: 21px;
      color: #333333;
      font-weight: 400;
      margin-bottom: 8px;
      margin-top: 8px;
   }
   .btn4 {
      width: 86px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0);
      position: absolute;
      bottom: 13%;
      left: 35%;
      border-radius: 20px;
   }
   .user-header {
      padding-top: 15px;
      height: 120px;
      background-image: url(../../lib/public/images/userbill.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
   }
   .user-header h1 {
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      height: 40px;
      color: #fff;
      line-height: 40px;
   }
   .btn1 {
      width: 100%;
      height: 200px;
      background-color: #fff;
   }
   .img11 {
      height: 200px;
      width: 80%;
      margin: 0px auto;
      background-image: url(../../lib/public/images/vip5-5.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
   }
</style>

