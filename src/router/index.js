import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/access/Login'
import SignUp from '@/components/access/SignUp'
import User from '@/components/user/User'
import WishlistUsers from '@/components/wishlist/WishlistUsers'
import Wishlist from '@/components/wishlist/Wishlist'
import WishDetail from '@/components/wishlist/WishDetail'

import firebase from 'firebase'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '*',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  }, {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      isAuthRequired: true
    }
  }, {
    path: '/wishlist/:wishlistId/',
    name: 'Wishlist',
    component: Wishlist,
    meta: {
      isAuthRequired: true
    },
    props: true
  }, {
    path: '/wishlist/:wishlistId/wish/:wishId',
    name: 'WishDetail',
    component: WishDetail,
    meta: {
      isAuthRequired: true
    },
    props: true
  }, {
    path: '/',
    name: 'WishlistUsers',
    component: WishlistUsers,
    meta: {
      isAuthRequired: true
    }
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
