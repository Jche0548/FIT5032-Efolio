import { initializeApp } from "firebase/app";
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGfxV6Kc_KHIYLYdsvjlNa1VPLGgXdmrM",
  authDomain: "week7-juiche.firebaseapp.com",
  projectId: "week7-juiche",
  storageBucket: "week7-juiche.firebasestorage.app",
  messagingSenderId: "65360079953",
  appId: "1:65360079953:web:78f52868ede3ecbb4b5c70"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router) // Enable Vue Router

app.use(PrimeVue, {
  theme: { preset: Aura, options: { cssLayer: true } }
})

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Dropdown', Dropdown)
app.component('Checkbox', Checkbox)
app.component('Textarea', Textarea)
app.component('Button', Button)

app.mount('#app')
