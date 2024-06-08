<script setup>
import { useAuth } from '@/hooks/useAuth'
import { authState } from '@/config/msalConfig.ts'

const { login, logout } = useAuth()

const onLogout = () => {
  logout()
}

const onLogin = () => {
  login()
}

console.log(authState)
</script>

<template>
  <main>
    <h1>Validate USER</h1>

    <div v-if="authState.isAuthenticated">
      <pre>
        {{ JSON.stringify(authState, null, 2) }}
      </pre>
    </div>

    <div>
      <button v-if="authState.isAuthenticated" @click="onLogout">Logout</button>
      <button v-else @click="onLogin">Login</button>
    </div>

    <div>Validating user...</div>
  </main>
</template>
