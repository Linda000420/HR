import request from '@/utils/request'

// 获取部门列表
export function depGetDepartment() {
  return request.get('/company/department')
}
