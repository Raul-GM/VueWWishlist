<template>
  <div class="wishlist-wrapper">
    <h3>{{wishlist.title}}´s Wishlist</h3>
    <input type="text" v-model="wishName">
    <button @click="addNewWish" :disabled="wishName === ''">Add new wish</button>
    <ul>
      <WishlistItem v-for="wish in wishlist.list" :wish="wish" :key="wish">
        {{wish}}
      </WishlistItem>
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
  props: ['uid'],
  components: {
    WishlistItem
  },
  methods: {
    addNewWish: function () {
      const data = {
        id: this.wishlist.id,
        wishName: this.wishName
      }
      store.dispatch('addWish', data).then(
        () => {
          console.log('BIEN')
          this.updateWishlist()
        }
      )
      this.wishName = ''
    },
    updateWishlist: function () {
      const wishlist = this.$store.getters.getWishlist(this.uid)
      this.wishlist.title = wishlist.name
      this.wishlist.list = wishlist.list || []
      this.wishlist.id = wishlist.id
    }
  },
  created: function () {
    this.updateWishlist()
  },
  updated: function () {
    this.updateWishlist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
