<template>
  <header class="header-wrapper" v-bind:class="{'header-wrapper_not-logged': !user.nickname}">
    <a class="header-title">
      <h3>
        <router-link :to="{name:'WishlistUsers'}">{{header}}</router-link>
      </h3>
    </a>
    <p v-if="user.nickname" class="header-options-container">
      <span class="header-options-container-option">
        <a class="header-options-container-option-link" @click="openNewWishlistModal">New wishlist</a>
      </span>
      <span class="header-options-container-option">
        <a class="header-options-container-option-link" @click="logout">Logout</a>
      </span >
      <span class="header-options-container-option">
        <router-link :to="{name:'User'}" class="header-options-container-option__user-container">
          <img class="mini-avatar" v-bind:src="user.avatar">
          <span>{{user.nickname}}</span>
        </router-link>
      </span>
    </p>
  </header>

</template>

<script>
import { mapState } from 'vuex'
import store from '../../store'
import firebase from 'firebase'

export default {
  name: 'Header',
  data () {
    return {
      header: 'Family Wishlist'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    openNewWishlistModal: function () {
      store.commit('toggleNewWishlistOpened')
    },
    logout: function () {
      firebase.auth().signOut().then(
        () => { this.$router.replace('login') }
      )
    }
  }
}
</script>

<style lang="scss">
  @import 'src/assets/styles/colors';
  @import 'src/assets/styles/variables';

.header-options-container {
  align-items: center;
  display: flex;
  justify-content: flex-end;
  flex: 1;
}
.header-options-container-option {
  font-family: $title-bold;
  font-size: 12px;
  padding: 0 14px;
}
.header-options-container-option-link {
  color: $background-color;
  transition: $transition-fast linear color;
  &:hover {
    color: $soft-color;
  }
}
.header-options-container-option__user-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.header-title {
  font-size: 1.5rem;
}
.header-wrapper {
  align-items: center;
  background-color: $main-color;
  color: $background-color;
  display: flex;
  height: 90px;
  padding: 0 20px;
}
.header-wrapper_not-logged {
  justify-content: center;
}
.mini-avatar {
  border-radius: 50px;
  height: 38px;
  width: 38px;
}
</style>
