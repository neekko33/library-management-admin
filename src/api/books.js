import api from '../utils/api'
import { transformData } from '../utils/utils'

// 获取图书信息
export const getBookData = data => {
  return api({
    url: '/books?' + transformData(data),
    method: 'GET',
  })
}

// 根据ID获取图书信息
export const getBookDataById = bookId => {
  return api({
    url: '/books/' + bookId,
    method: 'GET',
  })
}

// 搜索图书
export const searchBook = data => {
  return api({
    url: '/books/search?' + transformData(data),
    method: 'GET',
  })
}

// 新增图书
export const addBook = data => {
  return api({
    url: '/books',
    method: 'POST',
    data,
  })
}

// 编辑图书
export const editBook = (bookId, data) => {
  return api({
    url: '/books/' + bookId,
    method: 'PUT',
    data,
  })
}

// 删除图书
export const deleteBook = bookId => {
  return api({
    url: '/books/' + bookId,
    method: 'DELETE',
  })
}
