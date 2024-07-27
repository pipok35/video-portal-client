<template>
  <div v-if="movie" class="p-4">
    <h1 class="text-2xl font-bold mb-2">{{ 'movie.title' }}</h1>
    <p>{{ 'movie.description ' }}</p>
    <p><strong>Director:</strong> {{ 'movie.director' }}</p>
    <p><strong>Release Date:</strong> {{ 'new Date(movie.releaseDate).toLocaleDateString()' }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = ref(null)

onMounted(async () => {
  const response = await axios.get(`http://localhost:3000/movies/${route.params.id}`)
  movie.value = response.data
})
</script>

<style scoped>
</style>
