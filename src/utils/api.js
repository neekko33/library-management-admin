import axios from 'axios'
import { getToken } from './auth'
import router from '../router/index'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:7001/api', //本地服务器
})

// request拦截器
// service.interceptors.request.use(
//   config => {
//     if (config.url !== '/login/') {
//       config.headers.Authorization = 'si ' + getToken()
//     }
//     return config
//   },
//   error => {
//     // Do something with request error
//     console.error(error) // for debug
//     Promise.reject(error)
//   }
// )

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    const msg = error.response.data.msg
      ? error.response.data.msg
      : error.response.data.message
    console.error('err:' + msg) // for debug
    ElMessage({
      showClose: true,
      message: msg,
      type: 'error',
    })
    return Promise.reject(error)
  }
)

export default service
