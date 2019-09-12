import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/an-old-hope.css'
import 'animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueHighlightJS)
Vue.use(iView);
Vue.use(EasyUI);
Vue.directive('focus', {
    inserted: (el) => {
        el.focus()
    }
})
// console.log(Vue.config);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
