<template>
  <div class="section-container flex-column-centered">
    <h3 class="text-title">{{wishlist.title}}´s Wishlist</h3>
    <div class="form-container">
      <LabeInput class="text-field" :label="'Name'" :id="'name'" :value="newWish.name" @update="(val) => newWish.name = val"></LabeInput>
      <LabeInput class="text-field" :label="'URL'" :id="'url'" :value="newWish.URL" @update="(val) => newWish.URL = val"></LabeInput>
      <label class="label-whatever-container" for="description">
        <span>Description:</span>
        <textarea class="other-input" id="description" v-model="newWish.description" />
      </label>
      <LabeInput class="text-field" :id="'image'" :label="'Image'" :value="newWish.image" @update="(val) => newWish.image = val"></LabeInput>
      <LabeInput class="text-field" :id="'price'" :label="'Price'" :value="newWish.price" @update="(val) => newWish.price = val"></LabeInput>
      <label class="label-whatever-container" for="priority">
        <span>Priority ({{newWish.priority}}):</span>
        <input class="other-input" type="range" id="priority" v-model="newWish.priority" min="0" max="10">
      </label>
      <label class="label-whatever-container" for="private">
        <span>Private: </span>
        <input type="checkbox" id="private" v-model="newWish.isPrivate">
      </label>
      <button class="form-container--button" @click="addNewWish" :disabled="newWish.name === ''">Add new wish</button>
    </div>
    <ul class="list">
      <WishlistItem v-for="(wish, index, key) in wishlist.list" :wish="wish" :id="index" :key="key"></WishlistItem>
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
        isPrivate: false,
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
<style lang="scss">
@import 'src/assets/styles/variables';
.form-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 10px 0;
  .label-container,
  .label-whatever-container {
    align-items: center;
    display: grid;
    grid-template-columns: 80px 1fr;
  }
}
.form-container--button {
  margin-top: 10px;
}
.label-whatever-container .other-input {
  margin-bottom: $elements-padding-bottom;
}
</style>
