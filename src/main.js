import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './styles/main.css'
import './plugins/vue-filter'
import "./filters/filter";
import './plugins/trends'
import './plugins/vee-validate'
import './plugins/toast'








Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
