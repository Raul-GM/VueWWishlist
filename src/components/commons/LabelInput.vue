<template>
  <label :for="id" class="label-container">
    <span class="label-container--label">{{label}}:</span>
    <input class="label-container--text" v-if="!isLabel" type="text" :id="id" v-model="inputValue" :title="value" v-on:input="emitValue">
    <span v-if="isLabel">{{value}}</span>
  </label>
</template>

<script>
export default {
  name: 'LabelInput',
  data () {
    return {
      inputValue: this.value
    }
  },
  methods: {
    emitValue: function () {
      this.$emit('update', this.inputValue, this.id)
    }
  },
  props: {
    id: { type: String, required: false },
    isLabel: { type: Boolean, required: false },
    label: { type: String, required: true },
    value: { type: String, required: false }
  },
  updated: function () {
    if (this.inputValue !== this.value) this.inputValue = this.value
  }
}
</script>

<style>
</style>
