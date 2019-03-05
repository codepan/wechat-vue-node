import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import KiwiVUI from 'kiwi-vui/lib/kiwi-vui.min'
import 'kiwi-vui/lib/style.css'

import http from './http'

Vue.use(KiwiVUI)
Vue.prototype.$http = http

// Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
