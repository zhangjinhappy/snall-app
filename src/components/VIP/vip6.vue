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
                     <h2>你已是优合会员</h2>
                  </div>
               </div>
            </div>
            <img class="img1" v-lazy="'../../lib/public/images/vbg.png'" alt="12">
         </div>
         <h1 class="member"><img src="../../lib/public/images/huang2.png" alt="12">会员特权<img src="../../lib/public/images/huang1.png" alt="23"></h1>
         <yd-grids-group :rows="4" class="img">
            <yd-grids-item>
               <span slot="text">
                      <img v-lazy="'../../lib/public/images/v2.png'" alt="22">
                           <h1>自刷返还分润</h1>
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
         <br>
         <h2 class="sp">卡神（间推卡农<span>200</span>人</h2>
         <h2 class="sp1">+(直推卡王<span>3</span>个即可升级)</h2>
         <br>
         <div class="vip-footer">
            <h2>权益一：直推78元/人，间推38元/人</h2>
            <img v-lazy="'../../lib/public/images/vip2-1.png'" alt="11">
            <h2>权益二：自刷额外返0.07%，同级额外返0.05(不与其他优惠同享)</h2>
            <img v-lazy="'../../lib/public/images/vip2-2.png'" alt="22">
            <h2>权益三：分享任意用户申请信用卡、办理贷款、在商城消费、均可获得直属伙伴业务佣金的70%，间推伙伴业务佣金的20%</h2>
            <img v-lazy="'../../lib/public/images/vip2-3.png'" alt="33">
            <h2>权益四：在该机器上每刷1万元额外可获得300积分</h2>
            <img v-lazy="'../../lib/public/images/vip2-4.png'" alt="44">
         </div>
         <!-- 弹框 -->
         <yd-popup v-model="show1" position="center" width="70%" height="200px">
            <div class="user-header">
               <h1>恭喜成为</h1>
               <h1>一&nbsp;&nbsp;卡神&nbsp;&nbsp;一</h1>
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
         vip() {
            this.$router.push({
               name: "member"
            })
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
      background-image: url(../../lib/public/images/bg2.png);
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
      text-align: left;
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
      font-size: 13px;
   }
   .img img {
      width: 60px;
      height: 60px;
   }
   .sp {
      margin-top: 20px;
      text-align: center;
      background-color: #CDE8FF;
      text-indent: 10px;
      font-size: 18px;
      letter-spacing: 0.3px;
   }
   .sp1 {
      margin-top: 10px;
      padding-top: 4px;
      text-align: center;
      background-color: #CDE8FF;
      text-indent: 10px;
      font-size: 18px;
      letter-spacing: 0.3px;
   }
   .sp1 span,
   .sp span {
      font-size: 28px;
      color: #FFC817;
      text-shadow: -3px -1px 1px #007FFF;
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

