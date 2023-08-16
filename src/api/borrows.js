import api from '../utils/api'
import { transformData } from '../utils/utils'

// 获取借阅记录
export const getBorrowData = data => {
  return api({
    url: '/borrows?' + transformData(data),
    method: 'GET',
  })
}

// 搜索借阅记录
export const searchBorrow = data => {
  return api({
    url: '/borrows/search?' + transformData(data),
    method: 'GET',
  })
}

// 新增借阅记录
export const addBorrow = data => {
  return api({
    url: '/borrows',
    method: 'POST',
    data,
  })
}

// 续借图书
export const renewBrrow = borrowId => {
  return api({
    url: '/borrows/' + borrowId,
    method: 'PUT',
  })
}

// 归还图书
export const deleteBorrow = borrowId => {
  return api({
    url: '/borrows/' + borrowId,
    method: 'DELETE',
  })
}
