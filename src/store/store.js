import Vuex from 'vuex'
import Vue from "../../node_modules/vue/dist/vue.js"
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        //如果想要获取store的数据，只能通过this.$store.state.***来访问其数据。
        //  count:0,
        par:[],//把数据用数组存储起来，是这个样子的{id：商品的ID，count：商品的数量，pirce：商品的价格，selected：false是否被选中}
        token:null,
        userInfo:{},
        name:[],
        thirdnumber:null,
        fromcomponent:{}
    },
    mutations:{
        addcar(state,par){
            state.par.push(par)
        },
        [types.TOKEN](state,data){
            state.token = data;
        },
        [types.USERINFO](state,data){
            state.userInfo = data;
        },
        [types.CUSTOMERNO](state,data){
            state.thirdnumber = data;
        },
        [types.FROMCOMPONENT](state,data){
            state.fromcomponent = data;
        },
        addname(state,con){
            state.name.push(con)
        }
        //想改变数据，只能使用this.$store.commit("方法名")
        //  increment(state){
        //    state.count++
        //  },
        //  subtract(state,c){
        //     state.count-=c
        //  }
    },
    getters:{
        //   getAllCount(state){
        //    var c=0;
        //    state.car.forEach(item=>{
        //         c+=item.count
        //    })
        //    return c
        //   }
    }
})