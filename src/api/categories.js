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
