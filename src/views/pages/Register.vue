<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form class="space-y-4" @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" class="border p-2 w-full" />
      <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full" />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../../stores/userStore'

export default defineComponent({
  setup () {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const userStore = useUserStore()

    const register = async () => {
      await userStore.register(username.value, email.value, password.value)
    }

    return { username, email, password, register }
  }
})
</script>
