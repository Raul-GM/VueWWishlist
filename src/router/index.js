import Vue from 'vue'
import Router from 'vue-router'
import WishlistUsers from '@/components/wishlist/WishlistUsers'
import Wishlist from '@/components/wishlist/Wishlist'
import Login from '@/components/access/Login'
import SignUp from '@/components/access/SignUp'
import firebase from 'firebase'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '*',
    redirect: '/login'
  }, {
    path: '/',
    name: 'WishlistUsers',
    component: WishlistUsers,
    meta: {
      isAuthRequired: true
    }
  }, {
    path: '/wishlist/:id/',
    name: 'Wishlist',
    component: Wishlist,
    meta: {
      isAuthRequired: true
    },
    props: true
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  }]
})

router.beforeEach((to, from, next) => {
  const isAuthRequired = to.matched.some(record => record.meta.isAuthRequired)
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    store.dispatch('fetchUserData', currentUser.uid)
  } else {
    store.commit('setUserData', {
      nickname: ''
    })
  }
  if (!isAuthRequired) return next()
  if (!currentUser) return next('login')

  next()
})

export default router
