<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-1/4">
      <BaseCard title="Авторизация">
        <form class="flex flex-col gap-3 p-4" @submit.prevent="login">
          <span class="text-xl">E-mail</span>
          <BaseInput v-model="email" size="large" placeholder="E-mail" />
          <span class="text-xl">Пароль</span>
          <BaseInput v-model="password" size="large" type="password" placeholder="Пароль" />
          <BaseButton color="red" size="large" @click="login">Войти</BaseButton>
        </form>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
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
