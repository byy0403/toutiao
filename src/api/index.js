// 配置一个axios  导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// import router from '@/router'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 只会执行一次
/* axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
console.log(store.getUser().token) */
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  console.log(config)
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
