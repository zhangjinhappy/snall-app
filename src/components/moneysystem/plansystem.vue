<template>
    <div class="bill-content">
     <navbar :navname="chang"></navbar>
     <!-- 每一条的计划 -->
      <div class="plan">
          <div class="plan-l">
              <img src="../../lib/public/images/plan.png" alt="2323" width="32" height="32">
              <h2 style="font-size: 13px;color: #333333;font-weight:400">2019-04—2019-05&nbsp;计划</h2>
          </div>
          <div class="plan-r">
              <yd-navbar-next-icon></yd-navbar-next-icon>
          </div>
      </div>
      <!-- 每一条的计划 -->
       <div class="plan">
          <div class="plan-l">
              <img src="../../lib/public/images/plan.png" alt="2323" width="32" height="32">
              <h2 style="font-size: 13px;color: #333333;font-weight:400">2019-04—2019-05&nbsp;计划</h2>
          </div>
          <div class="plan-r">
              <yd-navbar-next-icon></yd-navbar-next-icon>
          </div>
      </div>
     <!-- 每一条的计划 -->
        <div class="plan">
          <div class="plan-l">
              <img src="../../lib/public/images/plan.png" alt="2323" width="32" height="32">
              <h2 style="font-size: 13px;color: #333333;font-weight:400">2019-04—2019-05&nbsp;计划</h2>
          </div>
          <div class="plan-r">
              <yd-navbar-next-icon></yd-navbar-next-icon>
          </div>
      </div>
    </div>
</template>
<script>
 import navbar from '../subcomponents/nav.vue'
export default {
    data(){
        return{
           chang:"计划查看"
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

    },
    components:{
       navbar
    }

    
}
</script>
<style scoped>
.bill-content{
 background-color: #fff
}
.plan{
    padding: 0 20px;
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.plan-l{
    width: 60%;
    height: 54px; 
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>

