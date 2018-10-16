<template>
  <div>
    <h4 v-if="!isModifying">
      <a v-bind:href="wishToSave.URL" target="_blank">{{wishToSave.name}}</a>
    </h4>
    <div v-if="isModifying">
      <LabeInput :id="'name'" :label="'Name'" v-model="wishToSave.name" @update="update"></LabeInput>
      <LabeInput :id="'url'" :label="'URL'" v-model="wishToSave.URL" @update="update"></LabeInput>
    </div>
    <img v-bind:src="wishToSave.image" />
    <input v-if="isModifying" type="text" v-model="wishToSave.image" />
    <div>
      <p v-if="!isModifying">{{wishToSave.description}}</p>
      <textarea v-if="isModifying" v-model="wishToSave.description"></textarea>
    </div>
    <div>
      <LabeInput :id="'price'" :label="'Price'" :isLabel="!isModifying" v-model="wishToSave.price" @update="update"></LabeInput>
    </div>
    <div>
      <LabeInput :id="'priority'" v-if="!isModifying" :label="'Priority'" :isLabel="!isModifying" v-model="wishToSave.priority" @update="update"></LabeInput>
      <label for="priority" v-if="isModifying">
        Priority:
        <input type="range" id="priority" v-model="wishToSave.priority" min="0" max="10"> {{wishToSave.priority}}
      </label>
      <label for="private">
        <input type="checkbox" id="private" v-model="wishToSave.isPrivate"> Private
      </label>
    </div>
    <div v-if="isModifying">
      <button @click="saveChanges">Save</button>
    </div>
  </div>
</template>

<script>
import LabeInput from './../commons/LabelInput.vue'
import store from '@/store'

export default {
  name: 'WishDetail',
  data () {
    return {
      isModifying: false,
      wishSelected: {},
      wishToSave: {}
    }
  },
  props: ['wishlistId', 'wishId'],
  components: {
    LabeInput
  },
  methods: {
    update: function (val, key) {
      this.wishToSave[key] = val
    },
    saveChanges: function () {
      this.wishSelected = Object.assign({}, this.wishToSave)
      const wishData = {
        wishlistId: this.wishlistId,
        wishId: this.wishId,
        wish: this.wishSelected
      }
      store.dispatch('saveWish', wishData)
    }
  },
  created: function () {
    this.isModifying = this.$store.getters.isModifying()
    this.wishSelected = this.$store.getters.getWishSelected()
    this.wishToSave = Object.assign({}, this.wishSelected) // <= clone the object
  },
  destroyed: function () {
    this.wishToSave = this.wishSelected
  }
}
</script>

<style>
</style>
