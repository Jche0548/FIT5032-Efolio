import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import AddBookView from '@/views/AddBookView.vue'
import { auth } from '@/stores/auth'

const routes = [
  { path: '/', name: 'home', component: HomeView },

  { path: '/about', name: 'about', component: AboutView, meta: { requiresAuth: true } },

  { path: '/addbook', name: 'addbook', component: AddBookView },
  
  { path: '/login', name: 'login', component: LoginView },

  { path: '/firelogin', name: 'firelogin', component: FirebaseSigninView },

  { path: '/register', name: 'register', component: FirebaseRegisterView },

  { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView},

  { path: '/denied', name: 'denied', component: AccessDeniedView },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),

  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to) => {

  if (to.meta?.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }


  if (to.name === 'login' && auth.isAuthenticated) {
    const back = (to.query.redirect ?? '/addbook').toString()
    return back 
  }
})

export default router
