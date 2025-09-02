import { reactive } from 'vue'

export const auth = reactive({
  isAuthenticated: false,
  user: null,
})

export function login(username, password) {
  if (username === 'FIT5032' && password === 'Monash') {
    auth.isAuthenticated = true
    auth.user = { name: 'FIT5032' }
    return true
  }
  return false
}

export function logout() {
  auth.isAuthenticated = false
  auth.user = null
}
