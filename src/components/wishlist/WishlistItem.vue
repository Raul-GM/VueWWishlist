<template>
  <li>
    <a @click="selectWish()">
      <router-link :to="{name:'WishDetail', params: {wishlistId: this.wishlistSelected.id, wishId: id}}">{{wish.name}}</router-link>
    </a>
    <a v-if="user.uid === wishlistSelected.owner" @click="selectWish(true)">
      <router-link :to="{name:'WishDetail', params: {wishlistId: this.wishlistSelected.id, wishId: id}}">Modify</router-link>
    </a>
    <a v-if="user.uid === wishlistSelected.owner" @click="removeWish(id)">Remove</a>
  </li>
</template>
<script>
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'WishlistItem',
  data () {
    return {
      wishlistSelected: {}
    }
  },
  props: ['wish', 'id'],
  methods: {
    removeWish: function (id) {
      store.dispatch('removeWish', id)
    },
    selectWish: function (isModifying) {
      store.commit('modifyWish', isModifying)
      store.commit('selectWish', this.wish)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created: function () {
    this.wishlistSelected = this.$store.getters.getWishlistSelected()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
