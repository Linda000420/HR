import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { asyncRoutes } from '@/router'

// 白名单列表
const whiteList = ['/login', '404']

// 前置守卫
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  nprogress.start()
  // 判断有无 token
  if (store.getters.token) {
    if (to.path === '/login') {
      // 跳转主页
      next('/')
      // 关闭进度条
      nprogress.done()
    } else {
      // 判断是否获取过资料
      if (!store.getters.userId) {
        // 获取用户权限
        const { roles } = await store.dispatch('user/getUserInfo')
        // 筛选符合权限的路由
        const filterRoutes = asyncRoutes.filter(item => {
          return roles.menus.includes(item.name)
        })
        store.commit('user/setRoutes', filterRoutes)
        // 添加动态路由信息到路由表
        router.addRoutes([
          ...filterRoutes,
          // 404 page must be placed at the end !!!
          { path: '*', redirect: '/404', hidden: true }
        ])
        // 转发，让路由拥有信息
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 跳转登录页
      next('/login')
      nprogress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  nprogress.done()
})
