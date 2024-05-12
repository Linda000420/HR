import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建新的 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //  基础地址
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 注入 token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行 promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({
      type: 'error',
      message: message
    })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    Message({
      type: 'warning',
      message: 'token 超时了'
    })
    // token 超时，退出登录
    await store.dispatch('user/logout')
    // 跳转登录页
    router.push('/login')
    return Promise.reject(error)
  }
  Message({
    type: 'error',
    message: error.message
  })
  return Promise.reject(error)
})

export default service
