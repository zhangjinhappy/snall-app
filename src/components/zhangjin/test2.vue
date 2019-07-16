
<template>
  <div>
    <h1 @click="open">{{defaultData[0].text}}</h1>
    <vue-pickers
      :show="show"
      :columns="columns"
      :defaultData="defaultData"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn">22222</vue-pickers>
  </div>
</template>

<script>
 import vuePickers from 'vue-pickers'
export default {
  components: {
    vuePickers
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
  data() {
    return {
      show: false,
      columns: 1,
      defaultData: [
        {
          text: 1999,
          value: 1999
        }
      ],
      pickData: {
        // 第一列的数据结构
        data1: [
          {
            text: 1999,
            value: 1999
          },
          {
            text: 2001,
            value: 2001
          },
           {
            text: 2002,
            value: 2002
          },
           {
            text: 2003,
            value: 2003
          },
           {
            text: 2004,
            value: 2004
          }
        ]
      }
    }
  },
  methods: {
    close() {
      this.show = false
    },
    open(){
     this.show = true
    },
    confirmFn(val) {
      this.show = false
      this.defaultData = [val.select1]
      console.log()
    },

    toShow() {
      this.show = true
    }
  }
}
</script>