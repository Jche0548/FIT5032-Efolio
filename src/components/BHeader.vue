<template>
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" exact-active-class="active">Home (Week 5)</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" active-class="active">About</RouterLink>
          </li>
        </ul>
      </header>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  </script>
  
  <style scoped>
  .nav-link.active { font-weight: 600; }
  </style>
  