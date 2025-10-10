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

    <p v-if="message" style="margin-top:8px">{{ message }}</p>

    <div v-if="latest" style="margin-top:16px">
      <h3>Last added (auto-uppercased by Functions):</h3>
      <pre>{{ latest }}</pre>
    </div>

    <BookList />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  getFirestore, collection, addDoc, serverTimestamp,
  query, orderBy, limit, onSnapshot
} from 'firebase/firestore'

import BookList from '@/components/BookList.vue'

const db = getFirestore()

const isbn = ref('')
const name = ref('')
const message = ref('')
const latest = ref(null)

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (Number.isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    const docRef = await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
      createdAt: serverTimestamp() 
    })

    isbn.value = ''
    name.value = ''
    message.value = `Book added: ${docRef.id}`
  } catch (error) {
    console.error('Error adding book', error)
    alert('Add failed: ' + (error?.message || 'unknown error'))
  }
}

let unsub = null
onMounted(() => {
  const q = query(collection(db, 'books'), orderBy('createdAt', 'desc'), limit(1))
  unsub = onSnapshot(q, (snap) => {
    snap.forEach(doc => (latest.value = { id: doc.id, ...doc.data() }))
  })
})
onBeforeUnmount(() => unsub && unsub())
</script>

<style></style>
