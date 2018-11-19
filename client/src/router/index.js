import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/autherror/:error', component: Login, props: true },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '*', name: 'Login', component: Login }
  ]
})
