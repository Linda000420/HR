import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 注册自定义指令，控制功能权限
Vue.directive('permission', {
  // 在指令作用的元素插入 dom 之后执行
  inserted(el, binding) {
    // el：当前指令作用的 dom 元素对象
    // binding：v-permission="表达式" 表达式的信息
    const points = store.state.user.userInfo?.roles?.points || []
    if (!points.includes(binding.value)) {
      el.remove()
      el.disabled = true
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
