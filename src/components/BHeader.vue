<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3 border-bottom">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link">Home (Week 8)</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
        </li>

        <li class="nav-item" v-if="auth.isAuthenticated">
          <RouterLink :to="{ name: 'addbook' }" class="nav-link">Add Book</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="'/GetBookCount'" class="nav-link" active-class="active">Get Book Count</RouterLink>
        </li>

        <li class="nav-item" v-if="!auth.isAuthenticated">
          <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
        </li>
        <li class="nav-item" v-else>
          <button class="nav-link btn btn-link px-3" @click="onLogout">Logout</button>
        </li>

        <li class="nav-item">
          <RouterLink :to="{ name: 'firelogin' }" class="nav-link">Firebase Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { auth, logout } from '@/stores/auth'

const router = useRouter()
const route = useRoute()

function onLogout() {
  logout()
  if (route.meta.requiresAuth) router.replace('/')
}
</script>

<style scoped>
.btn.btn-link.nav-link { text-decoration: none; }
</style>
