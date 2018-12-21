<template>
  <div class="wishlist-wrapper">
    <h3>{{wishlist.title}}´s Wishlist</h3>
    <div>
      <LabeInput :label="'Name'" :id="'name'" :value="newWish.name" @update="(val) => newWish.name = val"></LabeInput>
      <LabeInput :label="'URL'" :id="'url'" :value="newWish.URL" @update="(val) => newWish.URL = val"></LabeInput>
      <label for="description">
        Description:
        <textarea id="description" v-model="newWish.description" />
      </label>
      <LabeInput :id="'image'" :label="'Image'" :value="newWish.image" @update="(val) => newWish.image = val"></LabeInput>
      <LabeInput :id="'price'" :label="'Price'" :value="newWish.price" @update="(val) => newWish.price = val"></LabeInput>
      <label for="priority">
        Priority:
        <input type="range" id="priority" v-model="newWish.priority" min="0" max="10"> {{newWish.priority}}
      </label>
      <label for="private">
        <input type="checkbox" id="private" v-model="newWish.isPrivate"> Private
      </label>
      <button @click="addNewWish" :disabled="newWish.name === ''">Add new wish</button>
    </div>
    <ul>
      <WishlistItem v-if="showItem(wish)" v-for="(wish, index, key) in wishlist.list" :wish="wish" :id="index" :key="key"></WishlistItem>
    </ul>
  </div>
</template>

<script>
import WishlistItem from './WishlistItem.vue'
import LabeInput from './../commons/LabelInput.vue'

import store from '@/store'

export default {
  name: 'Wishlist',
  data () {
    return {
      newWish: {
        description: '',
        image: '',
        name: '',
        price: '',
        priority: 5,
        private: false,
        URL: ''
      },
      wishlist: {
        id: '',
        list: [],
        owner: '',
        title: ''
      },
      uid: ''
    }
  },
  props: ['wishlistId'],
  components: {
    WishlistItem,
    LabeInput
  },
  methods: {
    addNewWish: function () {
      const data = {
        id: this.wishlist.id,
        wish: this.newWish
      }
      store.dispatch('addWish', data)
      this.newWish.description = ''
      this.newWish.image = ''
      this.newWish.name = ''
      this.newWish.price = ''
      this.newWish.priority = ''
      this.newWish.isPrivate = ''
      this.newWish.URL = ''
    },
    getUserId: function () {
      const user = this.$store.getters.getUserData()
      this.uid = user.uid
    },
    saveSelectedWishlist: function () {
      const selectedWishlist = {
        id: this.wishlistId,
        name: this.wishlist.title,
        owner: this.wishlist.owner
      }
      store.commit('selectWishlist', selectedWishlist)
    },
    showItem: function (wish) {
      return !(wish.isPrivate && (this.wishlist.owner !== this.uid))
    },
    updateWishlist: function () {
      const wishlist = this.$store.getters.getWishlist(this.wishlistId)
      if (!wishlist.list) return

      this.wishlist.title = wishlist.name
      this.wishlist.list = wishlist.list || []
      this.wishlist.id = wishlist.id
      this.wishlist.owner = wishlist.owner
      this.saveSelectedWishlist()
    }
  },
  created: function () {
    this.updateWishlist()
    this.getUserId()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
