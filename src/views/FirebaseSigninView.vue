<template>
    <div class="container py-4">
      <h1>Login with Firebase</h1>
  
      <p><input type="email" v-model="email" placeholder="Email" class="form-control" /></p>
      <p><input type="password" v-model="password" placeholder="Password" class="form-control" /></p>
  
      <button class="btn btn-primary" @click="login">Login</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
  import { auth as authStore } from '@/stores/auth' 
  
  const router = useRouter()
  const route = useRoute()
  const email = ref('')
  const password = ref('')
  
  const auth = getAuth()
  
  onAuthStateChanged(auth, (user) => {
    console.log('[auth state]', user ? { uid: user.uid, email: user.email } : null)
  })
  
  const login = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email.value, password.value)
      console.log('[login success]', { uid: user.uid, email: user.email })
  
      authStore.isAuthenticated = true
      authStore.user = { uid: user.uid, email: user.email }
  
      const back = (route.query.redirect ?? '/addbook').toString()
      router.replace(back)
    } catch (err) {
      console.error('[login failed]', err.code, err.message)
    }
  }
  </script>
  