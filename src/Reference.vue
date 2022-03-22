<template>
  <span>{{ line }}</span>
</template>

<script lang="ts">
export default {
  props: ['refId'],
  inject: ['passage'],
  computed: {
    line() {
      if (!this.passage) {
        return 'Missing <Passage> container'
      }
      return (
        this.passage.references[this.$props.refId] ??
        `No page ref: ${this.$props.refId}`
      )
    },
  },
}
</script>

<style lang="scss"></style>
