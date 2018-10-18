<template>
  <div>
    <h3>Modify user data</h3>
    <p>
      <img v-bind:src="user.avatar" />
      <input type="text" v-model="user.avatar">
    </p>
    <p>
      <LabeInput :id="'nickname'" :label="'Name'" v-model="user.nickname" @update="(val) => user.nickname = val"></LabeInput>
    </p>
    <p>
      <button @click="saveUserData">Save</button>
    </p>
  </div>
</template>

<script>
import store from '@/store'
import LabeInput from './../commons/LabelInput.vue'

export default {
  name: 'User',
  data () {
    return {
      user: {}
    }
  },
  components: {
    LabeInput
  },
  created: function () {
    this.user = Object.assign({}, store.getters.getUserData())
    console.log('==>', this.user)
  },
  methods: {
    saveUserData: function () {
      store.dispatch('updateUserData', this.user)
    }
  }
}
</script>

<style>
img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}
</style>
