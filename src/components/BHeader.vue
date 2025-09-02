<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3 border-bottom">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" exact-active-class="active">Home (Week 5)</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link" active-class="active">About</RouterLink>
        </li>

        <li class="nav-item" v-if="!auth.isAuthenticated">
          <RouterLink to="/login" class="nav-link" active-class="active">Login</RouterLink>
        </li>
        <li class="nav-item" v-else>
          <button class="nav-link btn btn-link px-3" @click="onLogout">Logout</button>
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
.btn.btn-link.nav-link {
  text-decoration: none;
}
</style>
