import { createWebHistory, createRouter } from 'vue-router'


import HomeView from '@/views/Home.vue'
import SearchView from '@/views/Search.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


// @ts-ignore
router.afterEach((to: any, from: any) => {

})


export default router