<template>
  <div class="share-contant">
    <!-- 图片区域 -->
    <div class="center">
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll" style="height:400px">
            <a class="mui-control-item" href="#/share/sao">
              <img class="img1" v-lazy="'../../lib/public/images/share1.png'" @click="share">
            </a>
            <a class="mui-control-item" href="#/share/sao1">
              <img class="img1" v-lazy="'../../lib/public/images/share2.png'" @click="share1">
            </a>
            <a class="mui-control-item" href="#/share/sao2">
              <img class="img1" v-lazy="'../../lib/public/images/share3.png'" @click="share2">
            </a>
          </div>
        </div>
      </div>
      <!-- 按钮区域   -->
      <div class="btn3">
          <mt-button type="primary" size="large" @click="func">下一步</mt-button>
      </div>
      <!-- 下面就是表格区域 -->
      <div class="share-body">
        <div class="share-l" @click="registeSrhare">
          <img v-lazy="'../../lib/public/images/zhuceLianJie.png'" alt="加载中">
          <div class="mui-media-body">注册链接</div>
          <p class="bin">填写资料&nbsp;立即注册</p>
        </div>
        <router-link class="share-s" to="/share/face" tag="div">
          <img v-lazy="'../../lib/public/images/faceToFace.png'" alt="加载中">
          <div class="mui-media-body">面对面开通</div>
          <p class="bin">一键开通&nbsp;轻松使用</p>
        </router-link>
        <router-link class="share-r" to="/share/face2" tag="div">
          <img v-lazy="'../../lib/public/images/fenxiangWenAn.png'" alt="加载中">
          <div class="mui-media-body">分享文案库</div>
          <p class="bin">不用担心没有文案</p>
        </router-link>
      </div>
      <yd-popup v-model="show2" position="bottom" height="20%">
        <div class="share-q">
          <img v-lazy="'../../lib/public/images/w3.png'" alt="">
          <img v-lazy="'../../lib/public/images/w.png'" alt="">
          <img v-lazy="'../../lib/public/images/w1.png'" alt="">
          <img v-lazy="'../../lib/public/images/w2.png'" alt="">
        </div>
        <div class="btn">
          <input class="btn1" type="button" value="关闭" @click="show2 = false">
        </div>
      </yd-popup>
    </div>
  </div>
</template>
<script>
  import mui from '../../lib/mui/js/mui.js'
   import wx from 'weixin-js-sdk';
  import {
      USERINFO
  } from '../../store/types'
  import Aes from '../../util/Aes';
  export default {
    data() {
      return {
        show2: false
      }
    },
       beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu = true;
            })
        },
      mounted() {
          let gallery = mui(".mui-slider");
          gallery.slider({
              interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
          });
          mui('.mui-scroll-wrapper').scroll({
              scrollY: false,
              scrollX: true,
              startX: 0,
              startY: 0,
              deceleration: 0.0005,
              bounce: true
          })
      },
     async created(){

          let params = {
              url:location.href.split('#')[0]
          };
          let res = await this.$axios.get("/wx/getJsapiticketConfig",params);
          if(res.code==0){
              let data = res.data;
              wx.config({
                  // debug :true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId : 'wx7851029a77b2f1ed', // 必填，公众号的唯一标识
                  timestamp : data.timestamp, // 必填，生成签名的时间戳
                  nonceStr : data.noncestr  , // 必填，生成签名的随机串
                  signature : data.signature,// 必填，签名，见附录1
                  jsApiList: [
                      'onMenuShareAppMessage','onMenuShareTimeline',
                      'onMenuShareQQ','onMenuShareQZone','updateAppMessageShareData'
                  ]
                  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });

          }
      },
    methods: {
        registeSrhare(){
            let user = JSON.parse(this.$store.state[USERINFO]);
            let customer = user.customer;
            let a = Aes.encrypt(customer.phonenumber);
            let link = window.location.href.split('#')[0]+"/#/share/face1/" + a;
            // let link = "http://webapp.zhejiangyouhe.com/#/share/face1/" + a;
            console.log(link);
            wx.ready(function () {
                //              alert(window.location.href.split('#')[0]);

                //分享给朋友
                wx.updateAppMessageShareData({
                    title: "分享给朋友", // 分享标题
                    desc: "分享描述", // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: window.location.href.split('#')[0]+'/lib/public/images/jixianglogo.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                        alert("请点击右上角进行分享");
                    },
                    cancel: function (res) {
                        // 用户取消分享后执行的回调函数
                        alert("你取消了分享");
                    }
                });


            });
        },
        share() {
            this.$router.push({
                name: "sao"
            })
        },
        share1() {
            this.$router.push({
                name: "sao1"
            })
        },
        share2() {
            this.$router.push({
                name: "sao2"
            })
        },
      func() {
        this.$router.push({
          name: "sao"
        })
      }
    }
  }
</script>

<style scoped>
  .share-contant {
    background-color: #fff;
  }
  .center {
    padding-top: 40px;
    padding-bottom: 68px;
  }
  #slider {
    margin: 0 auto;
    height: 400px;
    width: 100%;
  }
  .mui-scroll {
    width: auto;
    height: 400px;
    white-space: nowrap;
  }
  .mui-control-item {
     padding: 0; 
}
  .share-s {
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
  }
  .btn3{
    padding-left: 16px;
    padding-right: 16px;
  }
  .btn {
    width: 100%;
    padding-top: 12px;
  }
  .btn1 {
    width: 100%;
    height: 40px;
  }
  .bin {
    padding-top: 6px;
    font-size: 12px;
  }
  .share-body {
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .share-l,
  .share-s,
  .share-r {
    border-top: 1px solid #cccccc;
    padding-top: 15px;
    width: 40%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column
  }
  .mui-media-body {
    padding-top: 5px;
  }
  .mui-segmented-control.mui-segmented-control-inverted {
    width: 100%;
    height: 400px;
    border: 0;
    border-radius: 0;
  }
  * {
    touch-action: pan-y;
  }
  .mui-slider {
    background-color: #fff;
  }
  .mui-control-item{
    padding: 0 2px;
  }
</style>
