<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="w-1/4">
      <BaseCard title="Регистрация">
        <form class="flex flex-col gap-2" @submit.prevent="register">
          <span>Имя пользователя</span>
          <input v-model="username" type="text" placeholder="Имя пользователя" class="border p-2 w-full" />
          <span>E-mail</span>
          <input v-model="email" type="text" placeholder="E-mail" class="border p-2 w-full" />
          <span>Пароль</span>
          <input v-model="password" type="password" placeholder="Пароль" class="border p-2 w-full" />
          <BaseButton @click="register">Зарегистрироваться</BaseButton>
        </form>
      </BaseCard>
    </div>
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
