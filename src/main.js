import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VModal from 'vue-js-modal'
import './plugins/vue-skycons'
import './styles/main.css'

import "./filters/filter";

Vue.use(VModal);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
