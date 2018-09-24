<template>
  <div>
    <h3>Sign In</h3>
    <input v-model="email" type="text" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="login">Enter!</button>
    <a>
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

<style>
</style>
