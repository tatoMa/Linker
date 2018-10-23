import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { transitionName: 'none' },
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      meta: { transitionName: 'none' },
      // route level code-splitting
      // this generates a separate chunk (Login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Login" */ './views/Login.vue')
    },
    {
      path: '/signup',
      name: 'SignUp',
      meta: { transitionName: 'none' },
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "SignUp" */ './views/SignUp.vue')
    },
    {
      path: '/forgotpw',
      name: 'ForgotPw',
      // route level code-splitting
      // this generates a separate chunk (ForgotPw.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "ForgotPw" */ './views/ForgotPw.vue')
    },
    {
      path: '/friends',
      name: 'Friends',
      meta: { transitionName: 'slide', requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (Friends.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Friends" */ './views/Friends.vue')
    },
    {
      path: '/userlist',
      name: 'UserList',
      meta: { transitionName: 'slidereverse', requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (UserList.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "UserList" */ './views/UserList.vue')
    },
    {
      path: '/setting',
      name: 'Setting',
      meta: { transitionName: 'none', requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (Setting.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Setting" */ './views/Setting.vue')
    },
    {
      path: '/match',
      name: 'Match',
      meta: { transitionName: 'none', requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (Match.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Match" */ './views/Match.vue')
    },
    {
      path: '/userlist/:id',
      name: 'UserProfile',
      meta: { transitionName: 'none', requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (UserList.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "UserList" */ './views/UserProfile.vue')
    },
    {
      path: '/chat/:id',
      name: 'Chatting',
      meta: { transitionName: 'slidereverse', requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (Chatting.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Chatting" */ './views/Chatting.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser
  // console.log(currentUser)
  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    // console.log('checked user with firebase')
    next()
  } else {
    next()
  }
})

export default router
