import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'

import router from '@/router'
import axios from 'axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
