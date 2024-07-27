<template>
  <div>
    <AppLayoutHeader />
    <main class="container mx-auto mt-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppLayoutHeader from '@/views/layouts/AppLayoutHeader.vue'
</script>

<style scoped>
</style>
