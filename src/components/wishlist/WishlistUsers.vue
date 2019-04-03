<template>
  <div class="section-container flex-column-centered">
    <h3 class="text-title">Users</h3>
    <ul class="list">
      <li v-for="wishlist in wishlists" :key="wishlist.id">
        <div class="row" v-if="user.uid === wishlist.owner || (user.uid !== wishlist.owner && !wishlist.private)">
          <span>
            <a class="link">
              <router-link :to="{name:'Wishlist', params: {wishlistId: wishlist.id}}">{{wishlist.name}}</router-link>
            </a>
          </span>
          <label class="row-action-cell label-checkbox" v-if="user.uid === wishlist.owner" for="private-checkbox">
            Private: <input type="checkbox" name="private-checkbox" id="private-checkbox" v-model="wishlist.private" @click="changePrivacy(wishlist)">
          </label>
          <span class="row-action-cell">
            <a v-if="user.uid === wishlist.owner" @click="removeWishlist(wishlist.id)">
              <img src="../../assets/images/recycle-bin.svg" alt="Remove Wishlist" class="action-icon"/>
            </a>
          </span>
        </div>
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
    changePrivacy: function (wishlist) {
      const params = {
        list: wishlist.id,
        isPrivate: wishlist.private
      }
      store.dispatch('changeWishlistPrivacy', params)
    },
    removeWishlist: function (wishlistId) {
      console.log('REMOVE', wishlistId)
      store.dispatch('removeWishlist', {wishlistId})
    }
  },
  computed: {
    ...mapState(['wishlists', 'user'])
  },
  created: function () {
    store.dispatch('fetchWishlists')
  }
}
</script>

<style lang="scss">
.row-action-cell.label-checkbox {
  display: flex;
  justify-content: space-around;
}
</style>
