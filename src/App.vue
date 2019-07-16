<template>
  <div class="app-container">
    <!-- 顶部Header区域 -->
    <mt-header :title="change" fixed v-if="showmenu" ref="menu" class="header-a">
      <span slot="left" @click="goBack()" v-show="flag">
              <mt-button icon="back" >返回</mt-button>
            </span>
    </mt-header>
    <!-- 中间body区域-->

    <transition>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab" v-if="showfooter" ref="footer">
      <router-link class="mui-tab-item-ball" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-ball" to="/share">
        <span class="mui-icon mui-icon-paperplane"></span>
        <span class="mui-tab-label" ref="share">分享</span>
      </router-link>
      <router-link class="mui-tab-item-ball" to="/bill">
        <span class="mui-icon mui-icon-compose"></span>
        <span class="mui-tab-label" ref="bill">订单</span>
      </router-link>
      <router-link class="mui-tab-item-ball" to="/mine">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label" ref="mine">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: false,
        change: "首页",
        showfooter: true,
        showmenu: true
      }
    },
    created() {
        // this.vConsole=new VConsole();
      this.flag = this.$route.path === '/home' ? false : true
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },
    watch: {
      // "$route.path": function(newval) {
      //   if (newval === "/home/shanghu") {
      //     this.flag = false
      //   } else {
      //     this.flag = true
      //   }
      // },
      $route(e) {
        switch (e.name) {
          case "share":
            this.change = "分享";
            break;
          case "bill":
            this.change = "订单";
            break;
          case "certification":
            this.change = "实名认证";
            break;
          case "address":
            this.change = "填写地址";
            break;
          case "order":
            this.change = "确认订单";
            break;
          case "order1":
            this.change = "确认订单";
            break;
          default:
            this.change = "欢迎光临";
            break;
        }
      }
    },
    components: {}
  }
</script>

<style scoped>
  .header-a {
    z-index: 99;
  }
  .mint-header {
    background-color: #fff;
    color: #000;
    border-bottom: 1px solid #ccc;
  }
  .app-container {
    overflow-x: hidden;
  }
  .mui-bar .mui-bar-tab {
    font-weight: 400
  }
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-to-active {
    transition: all 1s ease;
  }
  .mui-bar-tab .mui-tab-item-ball.mui-active {
    color: #007aff;
  }
  .mui-bar-tab .mui-tab-item-ball {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  .mui-bar-tab .mui-tab-item-ball .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mui-bar-tab .mui-tab-item-ball .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mui-bar{
    box-shadow: 0 0 0px rgba(0, 0, 0, .85);
    background-color: #fff;
  }
</style>


