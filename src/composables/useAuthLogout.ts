import { signOut } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import { useAuthStore } from '@/stores/authStore'
import { useRequest } from '@/composables/utils/useRequest'
import router from '@/router'
import RouteName from '@/router/RouteName'

export function useAuthLogout() {
  const authStore = useAuthStore()

  const runServices = async (): Promise<void> => {
    try {
      authStore.setLoading(true)
      authStore.clearError()

      await signOut(auth)

      // Réinitialiser l'état de l'utilisateur
      authStore.setUser(null)
      authStore.clearError()

      // Utilisation directe du toast de NuxtUI via le composable global
      const { add } = useToast()
      add({
        title: 'Déconnexion réussie !',
        color: 'success',
      })

      router.push({ name: RouteName.LOGIN })
    } catch (error: unknown) {
      console.error('Erreur lors de la déconnexion:', error)

      let errorMessage = 'Erreur lors de la déconnexion'

      if (error instanceof Error) {
        errorMessage = error.message
      }

      authStore.setError(errorMessage)

      const { add } = useToast()
      add({
        title: `Erreur de déconnexion: ${errorMessage}`,
        color: 'error',
      })

      throw error
    } finally {
      authStore.setLoading(false)
    }
  }

  return useRequest<void>({
    runServices,
  })
}
