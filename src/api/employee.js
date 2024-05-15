import request from '@/utils/request'

// 获取员工列表
export function empGetEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 导出员工 execl
export function empExportEmployee() {
  return request({
    url: '/sys/user/export',
    // 使用 blob 接收二进制文件流
    responseType: 'blob'
  })
}

// 下载导入员工模板
export function empGetTemplate() {
  return request({
    url: '/sys/user/import/template',
    // 使用 blob 接收二进制文件流
    responseType: 'blob'
  })
}

// 上传文件
export function empUploadExcel(data) {
  return request.post('/sys/user/import', data)
}

// 删除员工
export function empDelEmployee(id) {
  return request.delete(`/sys/user/${id}`)
}

// 新增员工
export function empAddEmployee(data) {
  return request.post('/sys/user', data)
}

// 获取员工基本信息
export function empGetEmployeeInfo(id) {
  return request.get(`/sys/user/${id}`)
}

// 修改员工信息
export function empUpdateEmployee(data) {
  return request.put(`/sys/user/${data.id}`, data)
}
