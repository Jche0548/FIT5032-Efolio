import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
// import './style.css'
import { createApp } from 'vue'
import App from './App.vue'

//import './style.css'

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

const app = createApp(App)

app.use(PrimeVue, {
  theme: {preset: Aura,options: { cssLayer: true }}
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
