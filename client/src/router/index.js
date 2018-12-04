import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Container from '@/components/Container'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/autherror/:error', component: Login, props: true },
    { path: '/:currentView', component: Container, props: true },
    { path: '*', name: 'Login', component: Login }
  ]
})
