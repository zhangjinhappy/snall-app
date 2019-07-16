<template>
    <div class="judge-content">
         <yd-navbar :title="chang"></yd-navbar>
        <!-- 头部 -->
        <div class="center">
        <div class="judge-body">
                <yd-step current="3">
                        <yd-step-item>
                            <span slot="top">实名认证</span>
                        </yd-step-item>
                        <yd-step-item>
                            <span slot="top">基本信息</span>
                        </yd-step-item>
                        <yd-step-item>
                            <span slot="top">人脸识别</span>
                        </yd-step-item>
                </yd-step>
                <div class="judge-a">
                    <img v-lazy="'../../lib/public/images/j.png'" alt="12233">
                </div>
        </div>
        <hr/>
        <br>
        <div class="judge-footer">
               <h1>1.请确认由本人亲自操作;</h1>
                <br>
                <h1>2.请将脸至于提示框内，并案提示完成动作。</h1>
                <br>
                <div class="judge-img">
                    <img v-lazy="'../../lib/public/images/j1.png'" alt="1">
                    <img v-lazy="'../../lib/public/images/j2.png'" alt="2">
                    <img v-lazy="'../../lib/public/images/j3.png'" alt="3">
                </div>
        </div>
        <!-- 扫描成功  -->
        <yd-button size="large" type="primary" @click.native="show1 = true">认证</yd-button>
         <yd-popup v-model="show1" position="center" width="90%">
            <div style="background-color:#fff; height: 240px;">
                <div class="su">
                    <img v-lazy="'../../lib/public/images/d.png'" alt="222">
                    <br>
                     <h2> 实名认证成功</h2>
                </div>
                <div class="btn5">
                    <yd-button @click.native="show1 = false" size="large" bgcolor="#1D75D6" color="#fff">知道了</yd-button>
                </div>
            </div>
        </yd-popup>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           chang:"实名认证",
           show1:false
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
       sao(){
           //alert("sao ma")
       }
    },
    components:{

    }

    
}
</script>
<style scoped>
.judge-content{
  background-color: #fff;
}
.center{
  padding-left: 8px;
  padding-right: 8px
}
.judge-body{
 padding-top: 20px;
}
.judge-a{ 
    padding-top: 20px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.su{
    height: 152px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;  
}
.su img{
    width: 60px;
    margin-left: 20px;
}
.judge-a img{
    width: 200px;  
}
.judge-img{
 display: flex;
 align-items: center;
 justify-content:space-around
}
.judge-img img{
    width: 70px;
}
h1{
    padding-left: 20px;
    font-size: 14px;
}
h2{
    font-weight: 700
}
.btn5{
    padding-left: 16px;
    padding-right: 16px;
}
</style>

