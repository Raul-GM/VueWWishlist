<template>
  <div>
    <ul>
      <li v-for="wishlist in wishlists" :key="wishlist.id">
        <a>
          <router-link :to="{name:'Wishlist', params: {id: wishlist.id}}">{{wishlist.name}}</router-link>
        </a>
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
    ...mapState(['wishlists'])
  },
  created: function () {
    store.dispatch('fetchWishlists')
  }
}
</script>

<style>
</style>
