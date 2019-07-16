<template>
    <div class="regisrer_content">
          <yd-navbar :title="chang">
                <router-link to="/login1" slot="left">
                   <yd-navbar-back-icon>其他登录</yd-navbar-back-icon>
                </router-link>
           </yd-navbar>
           <div class="center">
        <div class="login-img">
            <img v-lazy="'../../lib/public/images/jixianglogo.png'" alt="">
        </div>
        <input type="text" slot="right" required ref="input1" v-model="input1" placeholder="请输入手机号" style="background-color:#EEEEEE"> 
        <div class="regisrer-login">
            <input type="text" class="regisrer-a" slot="right" placeholder="请输入验证码" style="background-color:#EEEEEE">
                                <!-- ↓↓关键代码是这里↓↓ -->
                <yd-sendcode class="a-a" slot="right" v-model="start1" @click.native="sendCode1" type="primary"></yd-sendcode>
                                <!-- ↑↑关键代码是这里↑↑ -->             
             </div> 
            <input type="password" slot="right" ref="pwd1" v-model="pwd1" placeholder="请输入密码" minlength="6" maxlength="18" style="background-color:#EEEEEE">       
            <input type="password" slot="right" v-model="pwd2" placeholder="请再输入密码" minlength="6" maxlength="18" style="background-color:#EEEEEE">
                <yd-radio-group v-model="radio1">
                    <yd-radio val="1" @click.native="fun">我同意《服务条款》</yd-radio>
                 </yd-radio-group>
            <yd-button size="large" type="primary" bgcolor="#1D75D6" color="#fff" @click.native="userheader">注册</yd-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input1:"",
            input2:"",
            pwd1:"",
            pwd2:"",
            radio1:1,
            chang:"注册",
            start1:false
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
    },
    components:{
        
    },
    methods: {
        fun(){
         this.$router.push({name:"server"})
        },
        userheader(){
       if(this.$refs.phone.valid && this.$refs.nicname.valid && this.$refs.surepwd.valid && this.$refs.pwd.valid){
           if(this.input3==this.input4){
                this.$dialog.toast({
                   mes:"注册成功",
                   timeout:1500,
                   icon: 'success',
                   callback:()=>{
                       this.$router.push({name:"login"})
                   }
               })
            
           }else{
               this.$dialog.toast({
                   mes:"密码不一致",
                   timeout:1500
               })
           }
       }else{} 
        },
        sendCode1() {
                this.$dialog.loading.open('发送中...');
                setTimeout(() => {
                    this.start1 = true;
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
                    });

                }, 1000);
            }
    }
}


</script>
<style scoped>
.regisrer_content{
  background-color: #fff;
  height: 720px;
}
.center{
     padding-left: 10px;
   padding-right: 10px
}
.a-a{
    height: 37px;
    width: 25%;
    background-color: #fff;
    color: black;
    margin-bottom: 15px;
    border: 1px solid
}
.yd-navbar{
  border-bottom: 1px solid
}
.login-img{
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .regisrer-login{
      display: flex;
      align-items: center;
      justify-content: space-between
  }
  .regisrer-a{
      width: 65%;
  }

</style>


