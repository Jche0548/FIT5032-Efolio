<template>
    <div class="container mt-5" style="max-width: 480px;">
      <h2 class="mb-3 text-center">🔐 Secure Login</h2>
      <p class="text-muted text-center">
        Use username <code>FIT5032</code> and password <code>Monash</code>.
      </p>
  
      <form @submit.prevent="onSubmit" novalidate>
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input id="username" v-model.trim="username" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input id="password" v-model="password" type="password" class="form-control" required />
        </div>
  
        <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>
  
        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-primary">Login</button>
          <button type="button" class="btn btn-secondary" @click="clear">Clear</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { login } from '@/stores/auth'
  
  const router = useRouter()
  const route = useRoute()
  
  const username = ref('')
  const password = ref('')
  const error = ref('')
  
  function clear() {
    username.value = ''
    password.value = ''
    error.value = ''
  }
  
  function onSubmit() {
    error.value = ''
    const ok = login(username.value, password.value)
    if (!ok) {
      error.value = 'Invalid username or password'
      return
    }
    const redirect = (route.query.redirect ?? '/').toString()
    router.replace(redirect)
  }
  </script>
  