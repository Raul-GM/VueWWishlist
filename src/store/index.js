import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isModifying: false,
    modals: {
      newWishlistOpened: false
    },
    user: {
      nickname: '',
      uid: ''
    },
    wishlists: [],
    wishlistSelected: {
      id: '',
      name: ''
    },
    wishSelected: {}
  },
  getters: {
    isModifying: (state) => () => state.isModifying,
    getWishlist: (state) => (uid) => state.wishlists.find(wishlist => wishlist.id === uid),
    getWishlistSelected: (state) => () => state.wishlistSelected,
    getWishSelected: (state) => () => state.wishSelected,
    getUserData: (state) => () => state.user
  },
  mutations: {
    cleanWishlists: function (state) {
      state.wishlists = []
    },
    initWishlists: function (state, payload) {
      state.wishlists = payload
    },
    modifyWish: function (state, payload) {
      state.isModifying = payload
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
      state.user = {
        nickname: payload.nickname,
        uid: payload.uid
      }
    },
    toggleNewWishlistOpened: function (state) {
      state.modals.newWishlistOpened = !state.modals.newWishlistOpened
    },
    updateWish: function (state, payload) {
      const {
        wish,
        wishlistId,
        wishId
      } = payload
      state.wishSelected = wish
      const wishlist = state.wishlists.find(wishlist => wishlist.id === wishlistId)
      console.log('???? ', wishlist.list[wishId])
      wishlist.list[wishId] = wish
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
        image,
        isPrivate,
        name,
        price,
        priority,
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
              image,
              isPrivate,
              name,
              price,
              priority,
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
            nickname: snapshot.val().nickname,
            uid
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
          list: data.val().list || {},
          name: data.val().name,
          owner: data.val().owner
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
    saveWish: function (context, payload) {
      const {
        wishlistId,
        wishId,
        wish
      } = payload
      const database = firebase.database()
      const ref = database.ref(`wishlists/${wishlistId}/list/${wishId}`)
      ref.update(wish).then(res => {
        context.commit('updateWish', payload)
      }, err => {
        console.log('ERR', err)
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
