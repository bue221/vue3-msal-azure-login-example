<template>
  <main>
    <h1>Login</h1>
    <div>
      <button @click="onLogin">Login</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuth } from '@/hooks/useAuth'
import { authState } from '@/config/msalConfig'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()

const onLogin = () => {
  login() // call login function
}

onMounted(() => {
  if (authState.isAuthenticated) {
    alert('You are already logged in')
    router.push('/validateLogin')
  }
})
</script>
