import request from '@/utils/request'

// 获取角色列表
export function roleGetRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 新增角色
export function roleAddRole(data) {
  return request.post('/sys/role', data)
}
