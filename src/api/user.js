import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本资料
export function userGetUserService() {
  return request.get('/sys/profile')
}

// 修改密码
export function userUpdatePasswordService(data) {
  return request.put('/sys/user/updatePass', data)
}
