import axios from 'axios'
import { Message } from 'element-ui'
import exceptionMessage from './exception-message'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data.code
    }
    _showErrorMessage(response.data.code, response.data.msg)
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 错误消息提示
const _showErrorMessage = (code, msg) => {
  const message = exceptionMessage[code] || msg || '未知错误'
  Message({ message, type: 'error' })
}

// 统一传参处理
const request = (option) => {
  if (option.method.toLowerCase() === 'get') {
    option.params = option.data || {}
  }
  return service(option)
}

export default request
