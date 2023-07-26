import { default as api } from '../utils/api'

// 将参数对象转换为为字符串形式
function transformData(data) {
	let str = ''
	for (let key in data) {
		str += `${key}=${data[key]}&`
	}
	return str.substring(0, str.length - 1)
}

// 登录
export const login = userInfo => {
	return api({
		url: '/users/login',
		method: 'POST',
		data: {
			username: userInfo.account,
			password: userInfo.password,
		},
	})
}

// 获取图书信息
export const getBookData = data => {
	return api({
		url: '/books?' + transformData(data),
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

// 获取分类信息
export const getCategoryData = data => {
	return api({
		url: '/categories?' + transformData(data),
		method: 'GET',
	})
}

// 获取读者信息
export const getReaderData = data => {
	return api({
		url: '/readers?' + transformData(data),
		method: 'GET',
	})
}

// 获取通知信息
export const getNoticeData = data => {
	return api({
		url: '/notices?' + transformData(data),
		method: 'GET',
	})
}

// 获取借阅记录
export const getBorrowData = data => {
	return api({
		url: '/borrows?' + transformData(data),
		method: 'GET',
	})
}

// 获取罚款记录
export const getFineData = data => {
	return api({
		url: '/fines?' + transformData(data),
		method: 'GET',
	})
}

// 获取用户信息
export const getUserData = data => {
	return api({
		url: '/users?' + transformData(data),
		method: 'GET',
	})
}
