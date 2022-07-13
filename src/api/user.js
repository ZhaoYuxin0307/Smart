import request from '@/utils/request'

/**
 * 获取验证码接口
 * @returns {AxiosPromise}
 */
// 获取验证码接口
const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'get'
  })
}
/**
 * 登录接口
 * @param data
 * @returns {AxiosPromise}
 */
// 登录接口
const login = (data) => {
  return request({
    url:
      '/login?username=' +
      data.username +
      '&password=' +
      data.password +
      '&code=' +
      data.code +
      '&token=' +
      data.token,
    method: 'POST',
    data
  })
}

// 导出接口
export default {
  getCaptcha,
  login
}
