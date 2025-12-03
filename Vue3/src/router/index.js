import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Charts from '@/views/Charts.vue'
import Form from '@/views/Form.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/charts',
      name: 'charts',
      component: Charts
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
