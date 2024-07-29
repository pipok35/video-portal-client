<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">YouTube App</h1>
      <nav>
        <router-link to="/" class="text-white mr-4">Home</router-link>
        <router-link to="/login" class="text-white mr-4">Login</router-link>
        <router-link to="/register" class="text-white">Register</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SimpleLayoutHeader'
})
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>
