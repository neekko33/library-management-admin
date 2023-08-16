import api from '../utils/api'
import { transformData } from '../utils/utils'

// 获取罚款记录
export const getFineData = data => {
  return api({
    url: '/fines?' + transformData(data),
    method: 'GET',
  })
}

// 支付罚款
export const payFine = fineId => {
  return api({
    url: '/fines/' + fineId,
    method: 'PUT',
  })
}

// 根据借阅ID获取罚款记录
export const getFineDataByBorrowId = (borrowId, data) => {
  return api({
    url: `/fines/${borrowId}?` + transformData(data),
    method: 'GET',
  })
}
