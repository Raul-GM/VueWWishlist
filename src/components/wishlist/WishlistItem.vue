<template>
  <li>
    <label>{{wish}}</label>
    <a @click="removeWish(id)">Eliminar</a>
  </li>
</template>
<script>
import store from '../../store'

export default {
  name: 'WishlistItem',
  data () {
    return {
    }
  },
  props: ['wish', 'id'],
  methods: {
    removeWish: function (id) {
      store.dispatch('removeWish', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
