<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-1/4">
      <BaseCard title="Регистрация">
        <form class="flex flex-col gap-3 p-4" @submit.prevent="register">
          <span class="text-xl">Имя пользователя</span>
          <BaseInput v-model="username" size="large" placeholder="Имя пользователя" />
          <span class="text-xl">E-mail</span>
          <BaseInput v-model="email" size="large" placeholder="E-mail" />
          <span class="text-xl">Пароль</span>
          <BaseInput v-model="password" size="large" type="password" placeholder="Пароль" />
          <BaseButton color="red" size="large" @click="register">Зарегистрироваться</BaseButton>
        </form>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

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
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message)
    }
  }
}
</script>
