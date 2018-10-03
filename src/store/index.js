import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modals: {
      newWishlistOpened: false
    },
    user: {
      nickname: ''
    },
    wishlists: [],
    wishlistSelected: ''
  },
  getters: {
    getWishlist: (state) => (uid) => state.wishlists.find(wishlist => wishlist.id === uid)
  },
  mutations: {
    cleanWishlists: function (state) {
      state.wishlists = []
    },
    initWishlists: function (state, payload) {
      state.wishlists = payload
    },
    removeWish: function (state, payload) {
      console.log('REMOVE WISH MUTATION')
      const wishlist = state.wishlists.find(wishlist => wishlist.id === state.wishlistSelected)

      Vue.delete(wishlist.list, payload)
    },
    saveWishlists: function (state, payload) {
      state.wishlists.push(payload)
    },
    selectWishlist: function (state, payload) {
      state.wishlistSelected = payload
    },
    setUserData: function (state, payload) {
      state.user.nickname = payload.nickname
    },
    toggleNewWishlistOpened: function (state) {
      state.modals.newWishlistOpened = !state.modals.newWishlistOpened
    },
    updateWishlist: function (state, payload) {
      const wishlist = state.wishlists.find(wishlist => wishlist.id === payload.id)
      if (!wishlist.list) {
        Vue.set(wishlist, 'list', {})
      }
      Vue.set(wishlist.list, payload.wishlist, payload.wishName)
    }
  },
  actions: {
    addWish: function (context, payload) {
      const {
        id,
        wishName
      } = payload
      const database = firebase.database()
      const ref = database.ref(`wishlists/${id}`)
      ref.child('list').push(wishName).then(
        snapshot => {
          context.commit('updateWishlist', {
            id,
            wishlist: snapshot.getRef().getKey(),
            wishName
          })
        },
        err => console.log('ERR=>', err)
      )
      console.log(wishName)
    },
    fetchUserData: function (context, uid) {
      const database = firebase.database()
      database.ref(`users/${uid}`).once('value').then(
        snapshot => {
          context.commit('setUserData', {
            nickname: snapshot.val().nickname
          })
        },
        err => console.log('ERRRRRRR', err)
      )
    },
    fetchWishlists: function (context) {
      const database = firebase.database()
      context.commit('cleanWishlists')
      database.ref('wishlists').on('child_added', data => {
        const wishlist = {
          id: data.getRef().getKey(),
          name: data.val().name,
          list: data.val().list
        }
        context.commit('saveWishlists', wishlist)
      })
    },
    saveUserData: function (context, payload) {
      const database = firebase.database()
      const {
        uid,
        nickname
      } = payload
      database.ref(`users/${uid}`).set({
        nickname
      })
    },
    createWishlist: function (context, payload) {
      const {
        wishlistName
      } = payload
      const database = firebase.database()
      const child = database.ref().child('wishlists').push()
      child.set({
        name: wishlistName
      }).then(() => {}, err => console.log('ERROR CREATING WISHLIST', err))
    },
    removeWish: function (context, payload) {
      console.log('REMOVE!!! ', payload)
      const wishlistId = context.state.wishlistSelected
      const database = firebase.database()
      const ref = database.ref(`wishlists/${wishlistId}/list`)
      ref.child(payload).remove().then(() => {
        context.commit('removeWish', payload)
      }, err => {
        console.log('ERRRRR', err)
      })
    }
  }
})
