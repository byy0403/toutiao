// store/index.js 模块  获取用户  设置用户
// 存储信息的时候：
// 1. 约定信息的KEY是什么  hm-toutiao-77-user
// 2. 存储信息的值是什么   用户信息对象 字符串格式json
const KEY = 'toutiao'
export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    // 现在实现：给什么存什么，完整替换。
    // 预期实现：局部修改某一个属性信息。
    const localUser = this.getUser()
    // 如果是登陆时使用{}空对象{id,name,photo,token,refresh_token} 完整信息
    // 把你想存入的信息 合并覆盖到  当前user对象即可
    // 存储用户信息
    const nowUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(nowUser))
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
