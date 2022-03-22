<template>
  <div class="passage">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  provide: {
    passage: {
      reset() {
        this.references = reactive({})
      },
      references: reactive({}),
    },
  },
}
</script>

<style>
</style>