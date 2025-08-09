import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import RouteName from './RouteName'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.ROOT,
    redirect: () => {
      const authStore = useAuthStore()
      // Si l'authentification n'est pas encore prête, ne pas rediriger
      if (!authStore.isAuthReady) {
        return { name: RouteName.LOGIN }
      }
      // Si l'utilisateur est connecté, rediriger vers home, sinon vers login
      return authStore.isAuthenticated
        ? { name: RouteName.HOME }
        : { name: RouteName.LOGIN }
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
  },
  {
    path: '/tutorial',
    name: RouteName.TUTORIAL,
    component: () => import('../views/tutorial-view/TutorialView.vue'),
    meta: {
      title: 'Tutoriel',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.title) {
    document.title = `${to.meta.title} - Aesura`
  }

  // Attendre que l'authentification soit initialisée avant de faire des redirections
  if (!authStore.isAuthReady) {
    return
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: RouteName.LOGIN }
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: RouteName.HOME }

  }

  return true
})

export default router
