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
      avatar: '',
      nickname: '',
      uid: ''
    },
    wishlists: [],
    wishlistSelected: {
      id: '',
      name: '',
      owner: ''
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
      const {id, name, owner} = payload
      state.wishlistSelected = {
        id,
        name,
        owner
      }
    },
    setUserData: function (state, payload) {
      state.user = {
        avatar: payload.avatar,
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
    changeWishlistPrivacy: function (context, payload) {
      const {list, isPrivate} = payload
      const database = firebase.database()
      const ref = database.ref(`wishlists/${list}`)
      ref.update({
        private: !isPrivate
      }).then(
        () => console.log('privacidad cambiada'),
        err => console.log('Ha habido un error en la operación', err)
      )
    },
    createWishlist: function (context, payload) {
      const {
        wishlistName,
        isPrivate
      } = payload
      const database = firebase.database()
      const child = database.ref().child('wishlists').push()
      child.set({
        name: wishlistName,
        owner: context.state.user.uid,
        private: isPrivate
      }).then(() => {}, err => console.log('ERROR CREATING WISHLIST', err))
    },
    fetchUserData: function (context, uid) {
      const database = firebase.database()
      database.ref(`users/${uid}`).once('value').then(
        snapshot => {
          context.commit('setUserData', {
            avatar: snapshot.val().avatar,
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
          owner: data.val().owner,
          private: data.val().private
        }
        context.commit('saveWishlists', wishlist)
      })
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
    },
    removeWishlist: function (context, payload) {
      const database = firebase.database()
      const ref = database.ref(`wishlists/${payload.wishlistId}`)
      ref.remove().then(
        () => {
          console.log('Wishlist removed')
          context.dispatch('fetchWishlists')
        },
        err => console.log('Error al borrar wishlist', err))
    },
    saveUserData: function (context, payload) {
      const database = firebase.database()
      const {
        avatar,
        email,
        nickname,
        uid
      } = payload
      database.ref(`users/${uid}`).set({
        avatar,
        email,
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
    updateUserData: function (context, payload) {
      const {
        avatar,
        nickname,
        uid
      } = payload
      const database = firebase.database()
      const ref = database.ref(`users/${uid}`)
      ref.update({
        avatar,
        nickname
      }).then(() => console.log('OKISSSSS'),
        err => console.log('ERROR', err))
    }
  }
})
