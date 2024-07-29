<template>
  <div>
    <SimpleLayoutHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SimpleLayoutHeader from '@/views/layouts/SimpleLayoutHeader.vue'

export default defineComponent({
  name: 'SimpleLayout',
  components: {
    SimpleLayoutHeader
  }
})
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>
