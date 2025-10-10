<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <main>
        <div v-if="weatherData">
          <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import axios from 'axios'
  
  const apikey = 'YOUR_API_KEY' 
  const city = ref('')
  const weatherData = ref(null)
  
  const temperature = computed(() => {
    return weatherData.value ? Math.floor(weatherData.value.main.temp) : null
  })
  
  const iconUrl = computed(() => {
    return weatherData.value
      ? `http://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
      : ''
  })
  
  async function searchByCity() {
    if (!city.value) return
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}&units=metric`
    await fetchWeatherData(url)
  }
  
  async function fetchWeatherData(url) {
    try {
      const response = await axios.get(url)
      weatherData.value = response.data
    } catch (error) {
      console.error('Error fetching weather data:', error)
      weatherData.value = null
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    max-width: 500px;
    margin: auto;
  }
  .header {
    text-align: center;
  }
  .search-bar {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .search-input {
    padding: 10px;
    font-size: 16px;
    width: 70%;
    margin-right: 10px;
  }
  .search-button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }
  main {
    text-align: center;
    margin-top: 30px;
  }
  </style>
  