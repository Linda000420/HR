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

// 获取部门信息详情
export function depGetDepartmentInfo(id) {
  return request.get(`/company/department/${id}`)
}

// 修改部门详情
export function depEditDepartmentInfo(data) {
  return request.put(`/company/department/${data.id}`, data)
}

// 删除部门
export function depDelDepartment(id) {
  return request.delete(`/company/department/${id}`)
}
