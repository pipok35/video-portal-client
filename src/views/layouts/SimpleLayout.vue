<template>
  <div class="h-screen overflow-auto flex flex-col">
    <AppLayoutHeader />
    <main class="grow">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppLayoutHeader from '@/views/layouts/AppLayoutHeader.vue'
</script>
