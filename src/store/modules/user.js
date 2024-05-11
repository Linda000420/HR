import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken() //  从缓存读取
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
  }
}

const actions = {
  async login(context, data) {
    console.log(data)
    // 调用登录接口，返回 token
    context.commit('setToken', data.mobile)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
