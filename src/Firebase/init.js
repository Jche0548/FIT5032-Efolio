// src/firebase/index.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: 'AIzaSyDGfxV6Kc_KHIYLYdsvjlNa1VPLGgXdmrM',
  authDomain: 'week7-juiche.firebaseapp.com',
  projectId: 'week7-juiche',
  storageBucket: 'week7-juiche.firebasestorage.app',
  messagingSenderId: '65360079953',
  appId: '1:65360079953:web:78f52868ede3ecbb4b5c70',
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
