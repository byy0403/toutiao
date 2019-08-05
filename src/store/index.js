// store/index.js 模块  获取用户  设置用户
// 存储信息的时候：
// 1. 约定信息的KEY是什么  hm-toutiao-77-user
// 2. 存储信息的值是什么   用户信息对象 字符串格式json
const KEY = 'toutiao'
export default {
  setUser (user) {
    // 存储用户信息
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 清除用户信息
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }

}
