import axios from 'axios'
import {getToken} from './auth'
import router from '../router/index'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.16.105:8000/api/v2/ty/', //本地服务器
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (config.url !== '/login/') {
      config.headers.Authorization = 'si ' + getToken()
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.error(error) // for debug
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      ElMessage({
        showClose: true,
        message: response.data.msg,
        type: 'error',
      })
      window.setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
    if (response.data.code === 400) {
      ElMessage({
        showClose: true,
        message: '账号或密码错误,请重新输入',
        type: 'error',
      })
    }
    const res = response.data
    return res
  },
  (error) => {
    console.error('err' + error) // for debug
    ElMessage({
      showClose: true,
      message: error,
      type: 'error',
    })
    return Promise.reject(error)
  }
)

export default service
