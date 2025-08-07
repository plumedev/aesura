import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import RouteName from './RouteName'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.ROOT,
    redirect: {
      name: RouteName.LOGIN,
    }
  },
  {
    path: '/home',
    name: RouteName.HOME,
    component: () => import('../views/home-view/HomeView.vue'),
    meta: {
      title: 'Accueil',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: RouteName.LOGIN,
    component: () => import('../views/login-view/LoginView.vue'),
    meta: {
      title: 'Connexion',
      requiresGuest: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.title) {
    document.title = `${to.meta.title} - Aesura`
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: RouteName.LOGIN })
    return
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: RouteName.HOME })
    return
  }

  next()
})

export default router
