<template>
  <div class="section-container flex-column-centered">
    <h3 class="text-title">Create New Account</h3>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="nickname" type="text" placeholder="Nickname">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="signUp">Sign Up!</button>
    <a class="link">
      <router-link to="/login">Log in</router-link>
    </a>
  </div>
</template>

<script>
import firebase from 'firebase'
import store from './../../store'
import IMAGES from './../../constants/index.js'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(info => {
          console.log('User created', info.user)
          const userData = {
            uid: info.user.uid,
            nickname: this.nickname,
            email: this.email,
            avatar: IMAGES.defaultAvatar
          }
          store.dispatch('saveUserData', userData)
        }, err => {
          console.log('ERROR!!', err)
        })
    }
  }
}
</script>

<style>
</style>
