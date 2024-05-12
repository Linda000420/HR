const getters = {
  sidebar: state => state.app.sidebar, //  取 app 模块属性
  device: state => state.app.device,
  token: state => state.user.token, //  取 user 模块属性
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo.staffPhoto, //  头像
  name: state => state.user.userInfo.username //  用户名称
}
// getters 便捷访问
export default getters
