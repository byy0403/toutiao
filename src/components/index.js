import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    // 安装函数  当Vue.use(使用插件) install被调用
    // Vue 全局的vue对象
    Vue.component(MyBread.name, MyBread)
  }
}
