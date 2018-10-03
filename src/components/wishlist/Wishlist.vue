<template>
  <div class="wishlist-wrapper">
    <h3>{{wishlist.title}}´s Wishlist</h3>
    <input type="text" v-model="wishName">
    <button @click="addNewWish" :disabled="wishName === ''">Add new wish</button>
    <ul>
      <WishlistItem v-for="(wish, index, key) in wishlist.list" :wish="wish" :id="index" :key="key"></WishlistItem>
    </ul>
  </div>
</template>

<script>
import WishlistItem from './WishlistItem.vue'
import store from '@/store'

export default {
  name: 'Wishlist',
  data () {
    return {
      wishlist: {
        id: '',
        list: [],
        title: ''
      },
      wishName: ''
    }
  },
  props: ['wishlistId'],
  components: {
    WishlistItem
  },
  methods: {
    addNewWish: function () {
      const data = {
        id: this.wishlist.id,
        wishName: this.wishName
      }
      store.dispatch('addWish', data)
      this.wishName = ''
    },
    updateWishlist: function () {
      const wishlist = this.$store.getters.getWishlist(this.wishlistId)
      this.wishlist.title = wishlist.name
      this.wishlist.list = wishlist.list || []
      this.wishlist.id = wishlist.id
    }
  },
  created: function () {
    store.commit('selectWishlist', this.wishlistId)
    this.updateWishlist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
