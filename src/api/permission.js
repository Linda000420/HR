import request from '@/utils/request'

// 获取权限点列表
export function perGetPermissionList() {
  return request.get('/sys/permission')
}
