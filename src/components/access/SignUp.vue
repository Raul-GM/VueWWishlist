<template>
  <div>
    <h3>Create New Account</h3>
    <input v-model="email" type="text" placeholder="Email">
    <input v-model="nickname" type="text" placeholder="Nickname">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="signUp">Sign Up!</button>
    <a>
      <router-link to="/login">Log in</router-link>
    </a>
  </div>
</template>

<script>
import firebase from 'firebase'
import store from './../../store'
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
          store.dispatch('saveUserData', { uid: info.user.uid, nickname: this.nickname })
        }, err => {
          console.log('ERROR!!', err)
        })
    }
  }
}
</script>

<style>
</style>
