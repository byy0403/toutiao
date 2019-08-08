import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    // 安装函数  当Vue.use(使用插件) install被调用
    // Vue 全局的vue对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
