<template>
    <div class="posinfo">
       <div class="center">
            <div class="shanghu-header" @click="bus">
                <img v-lazy="'../../lib/public/images/sp.png'" alt="123">
            </div>
            <div class="shanghu-header" @click="pus">
                <img v-lazy="'../../lib/public/images/sp1.png'" alt="123">
            </div>
            <div class="shanghu-header">
                <img v-lazy="'../../lib/public/images/sp2.png'" alt="123">
            </div>
       </div>
    </div>
</template>
<script>
export default {
    data(){
       return{

       }
    },
    methods:{
      bus(){
         this.$router.push({name:"active"})
      },
      pus(){
        this.$router.push({name:"orderinfo"})  
      }
    },
      beforeRouteEnter (to, from, next) {
        next(vm =>{
           // vm.$emit("footerTitle",false)
           vm.$parent.$data.showfooter=false
           vm.$parent.$data.showmenu=false
        })
    },
    beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true
            this.$parent.$data.showmenu=true
            next()
    }
}
</script>
<style scoped>
.center{
    padding-top: 20px;
    padding-right: 8px;
    padding-left: 8px;
}
.posinfo{
    background-color: #fff;
}
.shanghu-header{
    margin-top: 10px;
}
img{
    width: 100%;
}
</style>
