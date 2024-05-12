import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, userGetUserService } from '@/api/user'
import { Message } from 'element-ui'

const state = {
  token: getToken(), //  从缓存读取
  userInfo: {} //  用户基本信息
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken() {
    // 删除 Vues 和缓存的 token
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, data) {
    // 调用登录接口
    const token = await login(data)
    if (token) {
      Message({
        type: 'success',
        message: '登录成功'
      })
    }
    // 返回 token
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const res = await userGetUserService()
    context.commit('setUserInfo', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
