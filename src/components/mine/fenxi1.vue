<template>
    <div class="bill-content">
     <yd-navbar :title="chang"></yd-navbar>
      <div class="center">
      <h1 class="bill-f">￥1000.00</h1> 
      <div class="bill-header">
         <div class="sp-left">
            <yd-cell-item >
               <yd-datetime type="month" v-model="datetime3" slot="right"></yd-datetime>
            </yd-cell-item>  
         </div>
        <div class="sp" @click="show2=true">
         <img src="../../lib/public/images/shaixuan.png" alt="1111">
         <span>筛选</span>   
        </div>  
      </div> 
     <yd-popup v-model="show2" position="bottom" height="60%">
        <div class="tan">
             <h1>支付方式</h1>
             <input type="button" value="全部">
             <input type="button" value="pos" >
             <input type="button" value="微信" >
             <input type="button" value="支付宝" >
             <input type="button" value="QQ钱包" >
             <input type="button" value="京东钱包" >
            <yd-button type="warning" bgcolor="#1D75D6" color="#fff" size="large" @click.native="show2 = false">确定搜索</yd-button>
        </div>
    </yd-popup>
    <div class="fenxi-body">
        <yd-tab  active-color="#1D75D6" height="60px">
            <yd-tab-panel label="交易分润">
                  <div class="number" @click="func">
                       <p>2018-12-20 </p>
                       <p>当日累计分润￥0.70元 </p>
                   </div>
                    <div class="number" @click="func">
                       <p>2018-12-20 </p>
                       <p>当日累计分润￥0.70元 </p>
                   </div>
                    <div class="number" @click="func">
                       <p>2018-12-20 </p>
                       <p>当日累计分润￥0.70元 </p>
                   </div>
                  
            </yd-tab-panel>

            <yd-tab-panel label="升级分润">
                   <div class="number" @click="func">
                        <p>2018-12-20 </p>
                       <p>当日累计分润￥0.70元 </p>
                    </div>
                    <div class="number" @click="func">
                      <p>2018-12-20 </p>
                       <p>当日累计分润￥0.70元 </p>
                    </div>
            </yd-tab-panel>
        </yd-tab>
        </div>
    </div>
    </div>
</template>
<script type="text/babel">
export default {
    data(){
        return{
       chang:"分润明细",
       show2:false,
       datetime3:"2016-07-05",

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
      func(){
       this.$router.push({name:"fenxi2"})
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
    padding-left: 8px;
  padding-right: 8px
}
.bill-header{
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tan h1{
    height: 40px;
    text-align: left;
    font-size: 16px;
    line-height: 40px;
}
.yd-navbar{
  border-bottom: 1px solid
}
.bill-f{
    width: 100%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-size: 20px;
}
.tan{
    padding-left: 15px;
    padding-right: 15px;
}
.sp img{
    vertical-align: middle;
}
.tan input{
    margin-left: 10px;
    margin-top: 10px;
}
.sp-left{
 display: flex;
 align-items: center;
}
.number{
    padding-left: 30px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.number img{
    width: 40px;
    height: 40px;
}
.number-right{
    padding-left: 20px
}

</style>

