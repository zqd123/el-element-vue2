import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutComponent.vue')
  },
  {
    path: '/bigTable',
    name: 'bigTable',
    component: () => import('../views/tablePerformance/TableIndex.vue')
  },
  {
    path: '/upDirectory',
    name: 'upDirectory',
    component: () => import('../views/UpDirectory.vue')
  },
  {
    path: '/zipFile',
    name: 'zipFile',
    component: () => import('../views/ZipFile.vue')
  },
  {
    path: '/multiRequest',
    name: 'multiRequest',
    component: () => import('../views/concurrenceRequest/MultiRequest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
