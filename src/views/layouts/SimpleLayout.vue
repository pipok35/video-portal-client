<template>
  <div class="flex flex-col">
    <AppLayoutHeader />
    <main class="h-screen p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppLayoutHeader from '@/views/layouts/AppLayoutHeader.vue'
</script>
