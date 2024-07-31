<template>
  <div>
    <SimpleLayoutHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SimpleLayoutHeader from '@/views/layouts/SimpleLayoutHeader.vue'
</script>
