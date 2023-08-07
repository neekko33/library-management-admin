import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		userType: 'user',
		username: '',
		userId: 0,
	}),
	actions: {
		setUserType(type) {
			this.userType = type
		},
		setUsername(name) {
			this.username = name
		},
		setUserId(id) {
			this.userId = id
		},
	},
})
