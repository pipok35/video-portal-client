<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-3xl font-bold text-white mb-4">Вход</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-400 mb-2">Логин</label>
          <input v-model="username" class="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter email" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-400 mb-2">Пароль</label>
          <input v-model="password" type="password" class="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter password" />
        </div>
        <div class="mb-4">
          <input id="recaptcha" type="checkbox" />
          <label for="recaptcha" class="text-gray-400 ml-2">I'm not a robot</label>
        </div>
        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">Войти</button>
        <div class="flex justify-between mt-4">
          <button class="bg-white text-black rounded-full p-2">G</button>
          <button class="bg-white text-black rounded-full p-2">G</button>
        </div>
        <div class="text-center mt-4 text-gray-400">
          Нет аккаунта? <router-link to="/register" class="text-blue-500">Зарегистрироваться</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  await userStore.login(username.value, password.value)
  router.push('/')
}
</script>

<style scoped>
</style>
