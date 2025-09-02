import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'
import { auth } from '@/stores/auth'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  // Protected page: Only logged-in users can see it
  { path: '/about', name: 'about', component: AboutView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/denied', name: 'denied', component: AccessDeniedView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// Block those who are not logged in
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // Tip page + bring the original path you want to go to in the query
    return { name: 'login', query: { redirect: to.fullPath } }
    // Or if you want to display the AccessDenied page:
    // return { name: 'denied', query: { redirect: to.fullPath } }
  }
  // If you are logged in and want to log in again, you will be redirected to the homepage/or redirected.
  if (to.name === 'login' && auth.isAuthenticated) {
    const back = (to.query.redirect ?? '/').toString()
    return back
  }
})

export default router
