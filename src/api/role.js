import request from '@/utils/request'

// 获取角色列表
export function roleGetRoleList(params) {
  return request.get('/sys/role', params)
}
