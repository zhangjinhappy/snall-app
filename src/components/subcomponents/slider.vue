<template>
    <div>
     <!-- 轮播图 -->
     <yd-slider>
        <yd-slider-item>
            <router-link to="/vip">
                <img v-lazy="'../../lib/public/images/banner.png'">
            </router-link>
        </yd-slider-item>   
    </yd-slider>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
  img{
      height: 200px;
  }
</style>


