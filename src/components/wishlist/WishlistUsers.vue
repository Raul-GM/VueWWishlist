<template>
  <div>
    <ul>
      <li v-for="wishlist in wishlists" :key="wishlist.id" v-if="user.uid === wishlist.owner || (user.uid !== wishlist.owner && !wishlist.private)">
        <a>
          <router-link :to="{name:'Wishlist', params: {wishlistId: wishlist.id}}">{{wishlist.name}}</router-link>
        </a>
        <span v-if="user.uid === wishlist.owner">Private: <input type="checkbox" v-model="wishlist.private" @click="changePrivacy(wishlist)"></span>
        <a v-if="user.uid === wishlist.owner" @click="removeWishlist(wishlist.id)">Remove</a>
      </li>
    </ul>
    <NewWishlistModal></NewWishlistModal>
  </div>
</template>

<script>
import NewWishlistModal from '../modals/NewWishlistModal'
import { mapState } from 'vuex'
import store from '@/store'

export default {
  name: 'WishlistList',
  components: {
    NewWishlistModal
  },
  methods: {
    changePrivacy: function (wishlist) {
      const params = {
        list: wishlist.id,
        isPrivate: wishlist.private
      }
      store.dispatch('changeWishlistPrivacy', params)
    },
    removeWishlist: function (wishlistId) {
      console.log('REMOVE', wishlistId)
      store.dispatch('removeWishlist', {wishlistId})
    }
  },
  computed: {
    ...mapState(['wishlists', 'user'])
  },
  created: function () {
    store.dispatch('fetchWishlists')
  }
}
</script>

<style>
</style>
