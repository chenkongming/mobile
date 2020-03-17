import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "lib-flexible"
import '@babel/polyfill'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")