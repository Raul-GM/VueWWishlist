<template>
  <li>
    <a @click="selectWish()">
      <router-link :to="{name:'WishDetail', params: {wishlistId: this.wishlistSelected.id, wishId: id}}">{{wish.name}}</router-link>
    </a>
    <a @click="removeWish(id)">Eliminar</a>
  </li>
</template>
<script>
import store from '../../store'

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
    selectWish: function () {
      store.commit('selectWish', this.wish)
    }
  },
  created: function () {
    this.wishlistSelected = this.$store.getters.getWishlistSelected()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
