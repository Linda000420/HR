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
