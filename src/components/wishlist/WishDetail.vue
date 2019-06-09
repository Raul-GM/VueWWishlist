<template>
  <div class="section-container flex-column-centered wish-detail">
    <h3 v-if="!isModifying" class="text-title link">
      <a v-bind:href="wishToSave.URL" target="_blank">{{wishToSave.name}}</a>
    </h3>
    <div v-if="isModifying" class="form-container">
      <LabeInput class="text-field" :id="'name'" :label="'Name'" v-model="wishToSave.name" @update="update"></LabeInput>
      <LabeInput class="text-field" :id="'url'" :label="'URL'" v-model="wishToSave.URL" @update="update"></LabeInput>
      <LabeInput class="text-field" :id="'image'" :label="'Image'" v-model="wishToSave.image" @update="update"></LabeInput>
      <label class="label-whatever-container text-field" for="description">
        <span>Description:</span>
        <textarea v-model="wishToSave.description"></textarea>
      </label>
      <LabeInput class="text-field" :id="'price'" :label="'Price'" :isLabel="!isModifying" v-model="wishToSave.price" @update="update"></LabeInput>
      <label for="priority" class="label-whatever-container">
        <span>Priority ({{wishToSave.priority}}):</span>
        <input type="range" id="priority" v-model="wishToSave.priority" min="0" max="10">
      </label>
    </div>
    <div class="flex-column-centered" v-if="!isModifying">
      <img class="wish-detail_image" alt="Wish image" v-bind:src="wishToSave.image" />
      <div class="wish-detail_field">
        <p>{{wishToSave.description}}</p>
      </div>
      <div class="wish-detail_field">
        <LabeInput :id="'price'" :label="'Price'" :isLabel="!isModifying" v-model="wishToSave.price" @update="update"></LabeInput>
      </div>
      <div class="wish-detail_field">
        <LabeInput :id="'priority'" :label="'Priority'" :isLabel="!isModifying" v-model="wishToSave.priority" @update="update"></LabeInput>
      </div>
    </div>
    <div class="wish-detail_field">
      <label for="private">
        <input type="checkbox" :disabled=!isModifying id="private" :value=wishToSave.isPrivate v-model="wishToSave.isPrivate"> Private
      </label>
    </div>
    <div v-if="isModifying" class="wish-detail_field">
      <button @click="saveChanges">Save</button>
    </div>
    <div class="wish-detail_field">
      <button>
        <router-link :to="{name:'Wishlist', params: {wishlistId: wishlistId}}">Go back</router-link>
      </button>
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

<style lang="scss">
.wish-detail_image {
  max-width: 50vw;
}
.wish-detail_field {
  margin-top: 6px;
}
</style>
