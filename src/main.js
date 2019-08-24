import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import routes from '@/routes'
import store from '@/store'

import EventBus from '@/plugins/event-bus'
import msToMm from '@/filters/ms-to-mm'
import blur from '@/directives/blur'

Vue.use(VueRouter)
Vue.use(EventBus)
Vue.use(msToMm)
Vue.use(blur)

const router = new VueRouter({ 
  routes: routes, 
  mode: 'history' 
})
// El history se agrega para quitar el simbolo de # en la url
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
