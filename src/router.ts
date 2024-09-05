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


// @ts-ignore
router.afterEach((to: any, from: any) => {

  // wx.config({
  //   debug: false, // 开启调试模式
  //   appId: 'wx2421b1c4370ec43b', // 必填，公众号的唯一标识
  //   timestamp: 1395712654, // 必填，生成签名的时间戳
  //   nonceStr: 'e61463f8efa94090b1f366cccfbbb444', // 必填，生成签名的随机串
  //   signature: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',// 必填，签名
  //   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
  // });


})


export default router