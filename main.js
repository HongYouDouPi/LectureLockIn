import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

// 全局加上tabbar
import TabBar from '@/components/custom-tab-bar/custom-tab-bar.vue';  
Vue.component('tab-bar', TabBar);  

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import TabBar from '@/components/custom-tab-bar/custom-tab-bar.vue';  
Vue.component('tab-bar', TabBar);  
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif