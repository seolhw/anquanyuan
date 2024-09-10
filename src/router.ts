import { createWebHistory, createRouter } from 'vue-router'


import HomeView from '@/views/Home.vue'
import SearchView from '@/views/Search.vue'
import AboutView from '@/views/About.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


// @ts-ignore
router.afterEach((to: any, from: any) => {

})


export default router