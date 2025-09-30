<template>
    <div class="container mt-5" style="max-width: 640px;">
      
      <h1 class="mb-4">Book Counter</h1>
  
      <button class="btn btn-primary mb-3" @click="getBookCount">
        Get Book Count
      </button>
  
      <div v-if="count !== null">
        Total number of books: {{ count }}
      </div>
      <div v-else>
        {{ error || 'error' }}
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  
  const count = ref(null)   
  const error = ref('')
  
  const getBookCount = async () => {
    
    try {
      error.value = ''
      count.value = null
      const URL = 'https://countbooks-323kn4l2sa-uc.a.run.app'
      const resp = await axios.get(URL)
      count.value = Number(resp.data?.count ?? NaN)
      if (!Number.isFinite(count.value)) {
        count.value = null
        error.value = 'error'
      }
    } catch (e) {
      count.value = null
      error.value = 'error'
    }
  }
  </script>
  
  <style scoped>
  </style>
  