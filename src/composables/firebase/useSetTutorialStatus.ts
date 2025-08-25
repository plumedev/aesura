import { useRequest } from '../utils/useRequest'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'
import { useAuthStore } from '@/stores/authStore'
import { handleEntityFirebaseError } from '@/helpers/firebaseError.helper'

export function useSetTutorialStatus() {
  const runServices = async (activate: boolean): Promise<boolean> => {
    try {
      const authStore = useAuthStore()
      const currentUser = authStore.currentUser

      if (!currentUser?.uid) {
        throw new Error('Aucun utilisateur connecté')
      }

      const userRef = doc(db, 'users', currentUser.uid)

      await updateDoc(userRef, {
        isTutorialActive: activate,
        updatedAt: new Date(),
      })

      // Mettre à jour le store local pour la cohérence
      if (authStore.user) {
        authStore.user.isTutorialActive = activate
      }

      return true
    } catch (error) {
      throw handleEntityFirebaseError(
        error,
        `la ${activate ? 'activation' : 'désactivation'} du tutoriel`,
        "l'utilisateur"
      )
    }
  }

  return useRequest<boolean>({
    runServices,
  })
}
