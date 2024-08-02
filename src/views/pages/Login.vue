<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form class="space-y-4" @submit.prevent="login">
      <input v-model="email" type="text" placeholder="Email" class="border p-2 w-full" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full" />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Войти</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../stores/userStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  try {
    await userStore.login(email.value, password.value)

    router.push({ name: 'home' })
  } catch (error) {
    console.error('Ошибка авторизации:', error)
  }
}

</script>
