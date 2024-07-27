<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Movies</h1>
    <div v-if="movies.length">
      <div v-for="movie in movies" :key="movie._id" class="mb-4 p-4 border rounded">
        <router-link :to="`/movie/${movie._id}`" class="text-xl font-semibold">{{ movie.title }}</router-link>
        <p>{{ movie.description }}</p>
      </div>
    </div>
    <div v-else>No movies available.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const movies = ref([])
onMounted(async () => {
  const response = await axios.get('http://localhost:3000/movies')
  movies.value = response.data
})
</script>

<style scoped>
</style>
