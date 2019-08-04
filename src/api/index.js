// 配置一个axios，导出配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 设置请求拦截器,在每次请求之前，获取token信息，追加在headers中
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
