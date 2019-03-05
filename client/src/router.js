import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          redirect: '/chats'
        },
        {
          path: '/chats',
          name: 'chats',
          component: () => import('./views/chats')
        },
        {
          path: '/contacts',
          name: 'contacts',
          component: () => import('./views/contacts')
        },
        {
          path: '/discover',
          name: 'discover',
          component: () => import('./views/discover')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/me')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register')
    },
    {
      path: '/moments',
      name: 'moments',
      component: () => import('./views/moments.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('./views/publish.vue')
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('./views/information.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/chat.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = window.localStorage.getItem('zychatToken')

  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
export default router
