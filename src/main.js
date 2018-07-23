// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.auth = {username: 'admin', password: 'admin'}
// axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.config.productionTip = false
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
