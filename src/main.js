import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

// 2. Define route components
const Home = () => import('./components/Home.vue')
const Users = () => import('./components/Users.vue')
const Settings = () => import('./components/Admin.vue')

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home},
    { path: '/users', component: Users},
    { path: '/settings', component: Settings}
  ]
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
