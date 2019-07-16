<template>
    <div class="bill-content">
         <navname :navname="chang"></navname>
         
        <div class="center">
        <!-- 头部部分 -->
        <br>
        <div class="header-body">
            <img src="../../lib/public/images/pos.png" alt="0090">
            <div class="r">
                <h1>评分</h1>
                <yd-rate slot="left" v-model="rate1"></yd-rate>
            </div>
        </div>
        <br>
         <!-- 评论框部分 -->
         <div class="bill-body">
              <textarea placeholder="发表评论(最多吐槽120字)" maxlength="120" v-model="text"></textarea> 
             
              <div class="pic">
                 <a href="#">
                   <h1>+</h1><p>添加图片</p>
                 </a>
                 <a href="#">
                   <h1>+</h1><p>添加图片</p>
                 </a>
                 <a href="#">
                   <h1>+</h1><p>添加图片</p>
                 </a>
              </div>
         </div>
          <br>
          <br>
          <div class="btn3">
             <mt-button size='large' type="primary" @click="submit">提交</mt-button>
          </div>
    </div>
    </div>
</template>
<script>
import navname from '../subcomponents/nav.vue'
    export default {
        data() {
            return {
                chang: "订单评价",
                rate1:2,
                text:""
            }
        },
        created() {
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
            submit(){
               alert("评论成功")
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
    .center{
        padding-left: 8px;
        padding-right: 8px
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .header-body{
        margin-top: 10px;
        padding-left: 8px;
        padding-right: 8px;
        display: flex;
        align-items: center;
    }
    .r{
        height: 80px;
        padding-left: 14px;
    }
    .r h1{
        height: 30px;
        text-align: left;
        line-height: 30px;
        margin-bottom: 10px;
        font-size: 18px;
    }
    textarea{
     font-size: 13px;
     height: 85px;
     margin: 0;
     margin-bottom: 20px;
    }
    
    .bill-body{
        padding-left: 8px;
        padding-right: 8px;
    }
   .pic{
       width: 100%;
       height: 60px;
       display: flex;
   }
   .pic a{
       display: block;
       width:60px;
       height:60px;
       color: #ccc;
       border: 1px solid #000;
       margin-left: 10px;
   }
   a h1{
       font-size: 30px;
       font-weight: 700;
       text-align: center;
   }
   a p{
       text-align: center;
   }
</style>

