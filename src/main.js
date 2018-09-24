// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
/* Initalize firebase */
const config = {
  apiKey: 'AIzaSyByb0HvtpgZvntzB0kj5nsOE3SbjTNKt_w',
  authDomain: 'family-wishlist-2b1a7.firebaseapp.com',
  databaseURL: 'https://family-wishlist-2b1a7.firebaseio.com',
  projectId: 'family-wishlist-2b1a7',
  storageBucket: 'family-wishlist-2b1a7.appspot.com',
  messagingSenderId: '85914200107'
}
firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    })
  }
})
