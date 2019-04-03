<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss">
  @import './assets/styles/reset';
  @import './assets/styles/fonts';
  @import './assets/styles/colors';
  @import './assets/styles/variables';
  @import './assets/styles/commons';
</style>
