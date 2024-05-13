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

// 修改角色
export function roleUpdateRole(data) {
  return request.put(`/sys/role/${data.id}`, data)
}

// 删除角色
export function roleDelRole(id) {
  return request.delete(`/sys/role/${id}`)
}
