import api from '../utils/api'
import { transformData } from '../utils/utils'

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

// 获取用户信息
export const getUserData = data => {
	return api({
		url: '/users?' + transformData(data),
		method: 'GET',
	})
}

// 根据ID获取用户信息
export const getUserDataById = userId => {
	return api({
		url: '/users/' + userId,
		method: 'GET',
	})
}

// 搜索用户
export const searchUser = data => {
	return api({
		url: '/users/search?' + transformData(data),
		method: 'GET',
	})
}

// 新增用户
export const addUser = data => {
	return api({
		url: '/users',
		method: 'POST',
		data,
	})
}

// 编辑用户
export const editUser = (userId, data) => {
	return api({
		url: '/users/' + userId,
		method: 'PUT',
		data,
	})
}

// 删除用户
export const deleteUser = userId => {
	return api({
		url: '/users/' + userId,
		method: 'DELETE',
	})
}
