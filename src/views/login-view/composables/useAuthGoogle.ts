import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/plugins/firebase'
import { useAuthStore } from '@/stores/authStore'
import { useRequest } from '@/composables/utils/useRequest'
import router from '@/router'

export function useAuthGoogle() {
  const authStore = useAuthStore()

  const runServices = async (routeName: string): Promise<void> => {
    const { add } = useToast()

    try {
      authStore.setLoading(true)
      authStore.clearError()
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      authStore.setUser(user)

      // Récupérer les données utilisateur depuis Firestore
      await authStore.fetchUserData(user.uid)

      add({
        title: `Connexion réussie ! Bienvenue ${user.displayName || user.email}`,
        color: 'success'
      })

      if (authStore.isTutorialActive) {
        router.push({ name: 'tutorial' })
      } else {
        router.push({ name: routeName })
      }

    } catch (error: unknown) {
      console.error('Erreur de connexion Google:', error)

      let errorMessage = 'Erreur lors de la connexion'

      if (error instanceof Error) {
        switch (error.message) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Connexion annulée'
            break
          case 'auth/popup-blocked':
            errorMessage = 'Popup bloqué par le navigateur'
            break
          default:
            errorMessage = error.message
        }
      }

      authStore.setError(errorMessage)

      add({
        title: `Erreur de connexion: ${errorMessage}`,
        color: 'error'
      })

      throw error
    } finally {
      authStore.setLoading(false)
    }
  }

  return useRequest<void>({
    runServices
  })
}
