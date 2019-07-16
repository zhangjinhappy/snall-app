<template>
    <div class="bill-content">
        <div class="center">
            <yd-navbar :title="chang">
                <a href="#/home" slot="left" @click="goBack()">
                    <yd-navbar-back-icon></yd-navbar-back-icon>
                </a>
            </yd-navbar>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chang: "创意小店灯卧室床头..."
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
             goBack() {
                this.$router.go(-1)
            }
        },
        components: {
        }
    }
</script>
<style scoped>
    .bill-content {
        background-color: #fff
    }
    .center {
        padding-top: 10px;
        padding-left: 8px;
        padding-right: 8px
    }
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
</style>

