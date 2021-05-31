import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import firebaseConfig from '../firebase'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import {BootstrapVue, IconsPlugin, AlertPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AlertPlugin);
Vue.use(Element);

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
