<template>
  <div>
    <h4>
      <a v-bind:href="wishSelected.URL" target="_blank">{{wishSelected.name}}</a>
    </h4>
    <div>
      {{wishSelected.description}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishDetail',
  data () {
    return {
      wishSelected: {}
    }
  },
  props: [],
  methods: {
  },
  created: function () {
    this.wishSelected = this.$store.getters.getWishSelected()
  }
}
</script>

<style>
</style>
