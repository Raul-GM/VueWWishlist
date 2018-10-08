<template>
  <div class="wishlist-wrapper">
    <h3>{{wishlist.title}}´s Wishlist</h3>
    <div>
      <label for="name">
        Name:
        <input type="text" id="name" v-model="newWish.name">
      </label>
      <label for="url">
        URL:
        <input type="text" id="url" v-model="newWish.URL">
      </label>
      <label for="description">
        Description:
        <textarea id="description" v-model="newWish.description" />
      </label>
      <button @click="addNewWish" :disabled="newWish.name === ''">Add new wish</button>
    </div>
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
      newWish: {
        description: '',
        name: '',
        URL: ''
      }
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
        wish: this.newWish
      }
      store.dispatch('addWish', data)
      this.newWish.description = ''
      this.newWish.name = ''
      this.newWish.URL = ''
    },
    saveSelectedWishlist: function () {
      const selectedWishlist = {
        id: this.wishlistId,
        name: this.wishlist.title
      }
      store.commit('selectWishlist', selectedWishlist)
    },
    updateWishlist: function () {
      const wishlist = this.$store.getters.getWishlist(this.wishlistId)
      this.wishlist.title = wishlist.name
      this.wishlist.list = wishlist.list || []
      this.wishlist.id = wishlist.id
      this.saveSelectedWishlist()
    }
  },
  created: function () {
    this.updateWishlist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
