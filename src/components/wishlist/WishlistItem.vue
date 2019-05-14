<template>
  <li class="row two-cells-row" v-if="showItem(wish)">
    <a class="link" @click="selectWish()">
      <router-link :to="{name:'WishDetail', params: {wishlistId: this.wishlistSelected.id, wishId: id}}">{{wish.name}}</router-link>
    </a>
    <span class="row-action-cell">
      <a class="row-action-cell" v-if="user.uid === wishlistSelected.owner" @click="selectWish(true)">
        <router-link :to="{name:'WishDetail', params: {wishlistId: this.wishlistSelected.id, wishId: id}}">
          <img src="../../assets/images/edit-icon.svg" alt="Remove Wish" class="action-icon"/>
        </router-link>
      </a>
      <a class="row-action-cell" v-if="user.uid === wishlistSelected.owner" @click="removeWish(id)">
        <img src="../../assets/images/recycle-bin.svg" alt="Remove Wish" class="action-icon"/>
      </a>
    </span>
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
    },
    showItem: function (wish) {
      return !(wish.isPrivate && (this.wishlistSelected.owner !== this.user.uid))
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
