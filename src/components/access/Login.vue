<template>
  <div class="section-container flex-column-centered">
    <h3 class="text-title">Sign In</h3>
    <input v-model="email" type="text" class="text-field" placeholder="Email">
    <input v-model="password" type="password" class="text-field" placeholder="Password">
    <button @click="login">Enter!</button>
    <a class="link">
      <router-link to="/sign-up">Create an account</router-link>
    </a>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        userInfo => this.$router.replace('/'),
        err => console.log('ERROR! ', err)
      )
    }
  }
}
</script>

<style  lang="scss">
</style>
