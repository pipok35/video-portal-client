<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Регистрация</h1>
    <form class="space-y-4" @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" class="border p-2 w-full" />
      <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full" />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const register = async () => {
  try {
    await userStore.register(username.value, email.value, password.value)

    router.push({ name: 'home' })
  } catch (error) {
    console.error('Ошибка авторизации: ', error)
  }
}

</script>
