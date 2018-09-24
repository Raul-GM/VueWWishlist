<template>
  <header>
    <h1>{{header}}</h1>
    <p v-if="user.nickname" class="header-wrapper">
      <span>Welcome {{user.nickname}}</span>
      <span>
        <a @click="openNewWishlistModal">New wishlist</a>
      </span>
      <span>
        <a @click="logout">Logout</a>
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

<style>
.header-wrapper {
  display: flex;
  justify-content: space-around;
}
</style>
