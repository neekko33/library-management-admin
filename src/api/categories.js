import api from '../utils/api'
import { transformData } from '../utils/utils'

// 获取分类信息
export const getCategoryData = data => {
  return api({
    url: '/categories?' + transformData(data),
    method: 'GET',
  })
}

// 获取全部分类
export const getAllCategoryData = () => {
  return api({
    url: '/categories/all',
    method: 'GET',
  })
}

// 根据ID获取分类
export const getCategoryDataById = categoryId => {
  return api({
    url: '/categories/' + categoryId,
    method: 'GET',
  })
}

// 新增分类
export const addCategory = data => {
  return api({
    url: '/categories',
    method: 'POST',
    data,
  })
}

// 编辑分类
export const editCategory = (categoryId, data) => {
  return api({
    url: '/categories/' + categoryId,
    method: 'PUT',
    data,
  })
}

// 删除分类
export const deleteCategory = categoryId => {
  return api({
    url: '/categories/' + categoryId,
    method: 'DELETE',
  })
}
