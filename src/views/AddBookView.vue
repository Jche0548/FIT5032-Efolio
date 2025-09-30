<template>
    <div>
      <h1>Add Book</h1>
  
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input id="isbn" type="text" v-model.trim="isbn" required />
        </div>
  
        <div>
          <label for="name">Name:</label>
          <input id="name" type="text" v-model.trim="name" required />
        </div>
  
        <button type="submit">Add Book</button>
      </form>
      
      <BookList />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { getFirestore, collection, addDoc } from 'firebase/firestore'

  import BookList from '@/components/BookList.vue'
  
  const db = getFirestore()
  
  const isbn = ref('')
  const name = ref('')
  
  const addBook = async () => {
    try {
      const isbnNumber = Number(isbn.value)
      if (Number.isNaN(isbnNumber)) {
        alert('ISBN must be a valid number')
        return
      }
  
      await addDoc(collection(db, 'books'), {
        isbn: isbnNumber,
        name: name.value
      })
  
      isbn.value = ''
      name.value = ''
      alert('Book added successfully!')
    } catch (error) {
      console.error('Error adding book', error)
      alert('Add failed: ' + (error?.message || 'unknown error'))
    }
  }
  </script>
  
  <style></style>
  