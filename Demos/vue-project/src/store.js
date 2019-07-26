import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabItems:[]
  },
  mutations: {
    addTab(state,item){
      state.tabItems.push(item)
    }
  },
  actions: {
    addTabFun(context,item){
      context.commit('addTab',item)
    }
  }
});
