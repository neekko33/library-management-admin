import api from '../utils/api'
import { transformData } from '../utils/utils'

// 获取读者信息
export const getReaderData = data => {
	return api({
		url: '/readers?' + transformData(data),
		method: 'GET',
	})
}

// 根据ID获取读者信息
export const getReaderDataById = readerId => {
	return api({
		url: '/readers/' + readerId,
		method: 'GET',
	})
}

// 搜索读者
export const searchReader = data => {
	return api({
		url: '/readers/search?' + transformData(data),
		method: 'GET',
	})
}

// 新增读者
export const addReader = data => {
	return api({
		url: '/readers',
		method: 'POST',
		data,
	})
}

// 编辑读者
export const editReader = (readerId, data) => {
	return api({
		url: '/readers/' + readerId,
		method: 'PUT',
		data,
	})
}

// 删除读者
export const deleteReader = readerId => {
	return api({
		url: '/readers/' + readerId,
		method: 'DELETE',
	})
}
