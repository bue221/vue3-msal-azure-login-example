import { authState } from '@/config/msalConfig'
import { useAuth } from '@/hooks/useAuth'
import { createRouter, createWebHistory, useRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: { requiresAuth: true },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/validateLogin',
      name: 'validateLogin',
      meta: { requiresAuth: true },
      component: () => import('../views/ValidateLogin.vue')
    }
  ]
})

/*
 * Autorizar acceso a la ruta
 * Si el usuario no está autenticado, redirigir al login
 * para hacer la ruta protegida añadir el metadato "requiresAuth: true"
 */
router.beforeEach(async (to, from, next) => {
  const router = useRouter()
  const { handleRedirect, initialize } = useAuth()

  // Initialize MSAL instance in all routes and app
  await initialize()
  await handleRedirect()

  if (to.meta.requiresAuth && authState.isAuthenticated === false) {
    router.push('/')
  } else {
    next() // Permite el acceso a la ruta
  }
})

export default router
