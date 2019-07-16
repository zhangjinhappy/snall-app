<template>
    <div class="bill-content">
        <yd-navbar :title="chang"></yd-navbar>
        <div class="center">
            <div class="word">
                <p>
                    文案顶顶顶顶下阿胶地方喝茶 web四大皆空为v 欸啊送鲜花哎哦好滴哦撒谎 啊是多撒后啊送货呢奥受i爱哦的一送啊四皇弟哦啊是
                </p>
            </div>
            <div class="mui-slider-item">
                <ul class="mui-table-view mui-grid-view">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                            <!-- <div class="mui-media-body">幸福就是可以一起睡觉</div> -->
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                            <!-- <div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div> -->
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                            <!-- <div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div> -->
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                            <!-- <div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div> -->
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                            <!-- <div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div> -->
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                            <!-- <div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div> -->
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn">
            <mt-button type="primary" class="mybtn"  onclick="copy('wordDiv1')">复制文字</mt-button>
			<mt-button type="primary" class="mybtn">保存图片</mt-button>
        </div>
         <div class="center">
            <div class="word">
                <p>
                    文案顶顶顶顶下阿胶地方喝茶 web四大皆空为v 欸啊送鲜花哎哦好滴哦撒谎 啊是多撒后啊送货呢奥受i爱哦的一送啊四皇弟哦啊是
                </p>
            </div>
            <div class="mui-slider-item">
                <ul class="mui-table-view mui-grid-view">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                           
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                            
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                          
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                           
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                          
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4">
                        <a href="#"><img class="mui-media-object" src="../../lib/public/images/me7.png">
                           
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn">
            <mt-button type="primary" class="mybtn"  onclick="copy('wordDiv1')">复制文字</mt-button>
			<mt-button type="primary" class="mybtn">保存图片</mt-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "分享文案库"
            }
        },
        created() {},
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
        methods: {},
        components: {}
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff;
    }
    .center {
        padding-left: 8px;
        padding-right: 8px
    }
    .word {
        padding: 10px 0;
        width: 100%;
    }
    .word p{
        color: #333333;
        font-size: 15px;
        line-height: 25px;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .btn{
        margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.mybtn{
    margin-right: 10px;
}
</style>

