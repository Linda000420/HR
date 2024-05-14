import request from '@/utils/request'

// 获取员工列表
export function empGetEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
