import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Setting from '@/views/setting'
import Article from '@/views/article'
import NotFound from '@/views/404'
import store from '@/store'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/setting',
          name: 'Setting',
          component: Setting
        },
        {
          path: '/article',
          name: 'Article',
          component: Article
        },
        {
          path: '/image',
          name: 'Image',
          component: Image
        },
        {
          path: '/publish',
          name: 'Publish',
          component: Publish
        },
        {
          path: '/comment',
          name: 'Comment',
          component: Comment
        },
        {
          path: '/fans',
          name: 'Fans',
          component: Fans
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound

    }
  ]
})
router.beforeEach((to, form, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  return next()
})
export default router
