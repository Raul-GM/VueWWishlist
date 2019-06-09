<template>
  <div class="section-container flex-column-centered flex-column-centered">
    <h3 class="text-title">Modify user data</h3>
     <div class="form-container">
       <div class="flex-column-centered">
        <img class="user-wrapper-avatar" v-bind:src="user.avatar" />
        <LabeInput class="text-field" :id="'avatar'" :label="'Avatar'" v-model="user.avatar"></LabeInput>
        <LabeInput class="text-field" :id="'nickname'" :label="'Name'" v-model="user.nickname" @update="(val) => user.nickname = val"></LabeInput>
        <button @click="saveUserData">Save</button>
      </div>
    </div>
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

<style lang="scss">
  @import 'src/assets/styles/variables';

.user-wrapper-avatar {
  border-radius: 50%;
  height: 120px;
  padding-bottom: calc(#{$elements-padding-bottom} / 2);
  width: 120px;
}
</style>
