import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/Home.vue'
import DemoView from '@/views/Demo.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/demo', component: DemoView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router