<template>
  <div>
    <ul>
      <li v-for="wishlist in wishlists" :key="wishlist.id" v-if="user.uid === wishlist.owner || (user.uid !== wishlist.owner && !wishlist.private)">
        <a>
          <router-link :to="{name:'Wishlist', params: {wishlistId: wishlist.id}}">{{wishlist.name}}</router-link>
        </a>
        <span v-if="user.uid === wishlist.owner">Private: <input type="checkbox" v-model="wishlist.private"></span>
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
