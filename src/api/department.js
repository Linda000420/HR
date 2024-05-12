import request from '@/utils/request'

// 获取部门列表
export function depGetDepartment() {
  return request.get('/company/department')
}

// 获取部门负责人列表
export function depGetManagerList() {
  return request.get('/sys/user/simple')
}

// 增加部门
export function depAddDepartment(data) {
  return request.post('/company/department', data)
}
