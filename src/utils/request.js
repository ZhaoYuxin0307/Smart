// 导入axios
import axios from 'axios'
// 导入message消息提示组件
import { Message } from 'element-ui'
// 导入自定义消息提示
import exceptionMessage from './exception-message'
// 导入store
import store from '@/store'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.data.code === 200) {
      const { data } = response.data
      return data
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
