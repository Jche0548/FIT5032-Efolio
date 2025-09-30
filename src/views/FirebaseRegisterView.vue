<template>
  <div class="container mt-5" style="max-width: 480px;">
    <h1 class="mb-3">Create an Account</h1>

    <p><input type="text" class="form-control" placeholder="Email" v-model.trim="email" /></p>
    <p><input type="password" class="form-control" placeholder="Password" v-model="password" /></p>

    <p v-if="error" class="text-danger small">{{ error }}</p>

    <p>
      <button class="btn btn-primary"
              :disabled="loading || !email || !password"
              @click="register">
        {{ loading ? 'Saving...' : 'Save to Firebase' }}
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/init.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const register = async () => {
  error.value = ''
  loading.value = true
  try {
    if (password.value.length < 6) {
      throw new Error('Password must be at least 6 characters.')
    }

    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Register Successful!', cred.user?.uid)

    router.push('/FireLogin')
  } catch (e) {
    console.error(e)
    error.value = e.code ? `Error: ${e.code}` : (e.message || 'Registration failed')
  } finally {
    loading.value = false
  }
}
</script>
