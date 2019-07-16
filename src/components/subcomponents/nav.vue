<template>
    <div class="root">
        <yd-navbar :title="navname">
            <a href="#/home" slot="left" @click="goBack()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </a>
        </yd-navbar>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        },
        props: ['navname']
    }
</script>
<style scoped>
    .yd-navbar {
        border-bottom: 1px solid #ccc;
    }
</style>


