<template>
  <div class="modal-wrapper" :class="{ opened: modals.newWishlistOpened}">
    <div class="modal-container">
      <div class="modal-header">
        <h4>New Wishlist</h4>
      </div>
      <div class="modal-body">
        <p>
          <input type="text" placeholder="Name of wishlist owner" v-model="wishlistName">
        </p>
        <p>
          <label class="label-checkbox"><span>Private:</span><input type="checkbox" v-model="isPrivate"></label>
        </p>
      </div>
      <div class="modal-footer">
        <button @click="saveWishlist">Create Owner</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../../store'

export default {
  data: function () {
    return {
      isModalOpened: false,
      isPrivate: false,
      wishlistName: ''
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
      store.dispatch('createWishlist', { wishlistName: this.wishlistName, isPrivate: this.isPrivate })
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/styles/colors';
.modal-wrapper {
  align-items: center;
  background-color: $translucid-background;
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
  background-color: $background-color;
  border: 3px solid $main-color;
  border-radius: 10px;
  display: grid;
  flex-direction: column;
  gap: 10px;
  grid-template-rows: 40px 1fr 40px;
  height: 30vh;
  width: 90vw;
}
.modal-header,
.modal-body {
  justify-self: center;
  margin: 0 20px;
}
.modal-footer {
  justify-self: flex-end;
  margin: 0 14px;
}
</style>
