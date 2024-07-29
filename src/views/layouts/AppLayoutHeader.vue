<template>
  <header class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">YouTube App</h1>
      <nav>
        <router-link to="/" class="text-white mr-4">Home</router-link>
        <router-link to="/upload" class="text-white">Upload Video</router-link>
        <button class="ml-4 bg-red-500 text-white p-2 rounded" @click="logout">Logout</button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppLayoutHeader',
  setup () {
    const userStore = useUserStore()
    const router = useRouter()

    const logout = () => {
      userStore.logout()
      router.push('/login')
    }

    return { logout }
  }
})
</script>

<style scoped>
</style>
