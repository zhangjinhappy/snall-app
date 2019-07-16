<template>
    <div class="bill-content">
        <navname :navname="chang"></navname>
        <div class="center">
            <div class="img"></div>
        </div>
    </div>
</template>
<script>
import navname from '../subcomponents/nav.vue'
export default {
    data(){
        return{
       chang:"智能匹配商户养卡系统.."
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
      navname
    }
 
}
</script>
<style scoped>
.bill-content{
 background-color: #fff
}
.center{
  padding-top: 10px
}
.img {
        background-image: url(../../lib/public/images/h4.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        position: fixed;
        left: 5%;
        width: 90%;
        height: 85%;
    }
 
</style>

