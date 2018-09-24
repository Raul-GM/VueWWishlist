import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      nickname: ''
    },
    wishlists: [],
    modals: {
      newWishlistOpened: false
    }
  },
  getters: {
    getWishlist: (state) => (uid) => {
      return state.wishlists.find(wishlist => wishlist.uid === uid)
    }
  },
  mutations: {
    cleanWishlists: function (state) {
      state.wishlists = []
    },
    initWishlists: function (state, payload) {
      state.wishlists = payload
    },
    setUserData: function (state, payload) {
      state.user.nickname = payload.nickname
    },
    toggleNewWishlistOpened: function (state) {
      state.modals.newWishlistOpened = !state.modals.newWishlistOpened
    },
    saveWishlists: function (state, payload) {
      state.wishlists.push(payload)
    },
    updateWishlist: function (state, payload) {
      const wishlist = state.wishlists.find(wishlist => wishlist.id === payload.id)
      wishlist.list[wishlist] = payload.wishName

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
          console.log('¿?¿?¿?¿?¿?', snapshot.getRef().getKey())
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
    }
  }
})
