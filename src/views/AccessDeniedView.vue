<!-- src/views/AccessDeniedView.vue -->
<template>
    <div class="container mt-5" style="max-width: 640px;">
      <h2 class="mb-2">Access Denied</h2>
      <p class="text-muted">You must be logged in to view this page.</p>
      <RouterLink class="btn btn-primary" :to="{ name: 'login', query: { redirect: redirectTo } }">
        Go to Login
      </RouterLink>
    </div>
  </template>
  
  <script setup>
  import { RouterLink, useRoute } from 'vue-router'
  const route = useRoute()
  const redirectTo = route.query.redirect ?? '/'
  </script>
  
  <style scoped>
  /* optional */
  </style>
  