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
    wishlistSelected: {
      id: '',
      name: ''
    },
    wishSelected: {}
  },
  getters: {
    getWishlist: (state) => (uid) => state.wishlists.find(wishlist => wishlist.id === uid),
    getWishlistSelected: (state) => () => state.wishlistSelected,
    getWishSelected: (state) => () => state.wishSelected
  },
  mutations: {
    cleanWishlists: function (state) {
      state.wishlists = []
    },
    initWishlists: function (state, payload) {
      state.wishlists = payload
    },
    removeWish: function (state, payload) {
      const wishlist = state.wishlists.find(wishlist => wishlist.id === state.wishlistSelected.id)
      Vue.delete(wishlist.list, payload)
    },
    saveWishlists: function (state, payload) {
      state.wishlists.push(payload)
    },
    selectWish: function (state, payload) {
      state.wishSelected = payload
    },
    selectWishlist: function (state, payload) {
      state.wishlistSelected.id = payload.id
      state.wishlistSelected.name = payload.name
    },
    setUserData: function (state, payload) {
      state.user.nickname = payload.nickname
    },
    toggleNewWishlistOpened: function (state) {
      state.modals.newWishlistOpened = !state.modals.newWishlistOpened
    },
    updateWishlist: function (state, payload) {
      const wishlist = state.wishlists.find(wishlist => wishlist.id === payload.id)
      Vue.set(wishlist.list, payload.wishlist, payload.wish)
    }
  },
  actions: {
    addWish: function (context, payload) {
      const {
        id,
        wish
      } = payload
      const {
        description,
        name,
        URL
      } = wish
      const database = firebase.database()
      const ref = database.ref(`wishlists/${id}`)
      ref.child('list').push(wish).then(
        snapshot => {
          context.commit('updateWishlist', {
            id,
            wishlist: snapshot.getRef().getKey(),
            wish: {
              description,
              name,
              URL
            }
          })
        },
        err => console.log('ERR=>', err)
      )
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
          list: data.val().list || {}
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
      const wishlistId = context.state.wishlistSelected.id
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
