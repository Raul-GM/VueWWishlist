<template>
  <div class="modal-wrapper" :class="{ opened: modals.newWishlistOpened}">
    <div class="modal-container">
      <p>
        <input type="text" placeholder="Name of wishlist owner" v-model="wishlistName">
      </p>
      <p>
        <button @click="saveWishlist">Create Owner</button>
        <button @click="closeModal">Cancel</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../../store'

export default {
  data: function () {
    return {
      wishlistName: '',
      isModalOpened: false
    }
  },
  computed: {
    ...mapState(['modals'])
  },
  methods: {
    closeModal: function () {
      store.commit('toggleNewWishlistOpened')
    },
    saveWishlist: function () {
      store.dispatch('createWishlist', { wishlistName: this.wishlistName })
    }
  }
}
</script>

<style>
.modal-wrapper {
  align-items: center;
  background-color: hsla(0, 0%, 74%, 0.7);
  display: none;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
}
.modal-wrapper.opened {
  display: flex;
}
.modal-container {
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 40vh;
  justify-content: center;
  width: 70vw;
}
</style>
