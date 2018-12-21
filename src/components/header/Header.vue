<template>
  <header>
    <a>
      <h1>
        <router-link :to="{name:'WishlistUsers'}">{{header}}</router-link>
      </h1>
    </a>
    <p v-if="user.nickname" class="header-wrapper">
      <span>
        <a>
          <router-link :to="{name:'User'}">
            <img class="mini-avatar" v-bind:src="user.avatar"> {{user.nickname}}
          </router-link>
        </a>
      </span>
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
.mini-avatar {
  height: 38px;
  width: 38px;
}
</style>
