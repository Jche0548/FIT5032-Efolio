<script setup>
import BHeader from './components/BHeader.vue' 
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>

    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  border-bottom: 1px solid #ddd;
}

.main-box {
  flex: 1;
  padding: 2rem;
}
</style>
