import { useRequest } from '@/composables/utils/useRequest'
import {
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  type CollectionReference,
} from 'firebase/firestore'

export function useDefineMainAccount() {
  const runServices = async (
    collectionRef: CollectionReference,
    accountId: string
  ): Promise<boolean> => {
    try {
      if (!collectionRef) {
        throw new Error('Référence de collection invalide')
      }

      if (!accountId) {
        throw new Error('ID du compte invalide')
      }

      const mainAccountQuery = query(
        collectionRef,
        where('isMainAccount', '==', true)
      )
      const mainAccountSnapshot = await getDocs(mainAccountQuery)

      const updatePromises = mainAccountSnapshot.docs.map(
        async (docSnapshot) => {
          const docRef = doc(collectionRef, docSnapshot.id)
          return updateDoc(docRef, { isMainAccount: false })
        }
      )

      await Promise.all(updatePromises)

      const newMainAccountRef = doc(collectionRef, accountId)
      await updateDoc(newMainAccountRef, { isMainAccount: true })

      return true
    } catch (error) {
      if (error instanceof Error) {
        switch (true) {
          case error.message.includes('permission-denied'):
            throw new Error(
              'Accès refusé à la collection. Vérifiez vos permissions Firebase.'
            )

          case error.message.includes('not-found'):
            throw new Error("Compte introuvable. Vérifiez l'ID du compte.")

          case error.message.includes('unavailable'):
            throw new Error(
              'Service Firebase temporairement indisponible. Veuillez réessayer.'
            )

          case error.message.includes('unauthenticated'):
            throw new Error(
              'Vous devez être authentifié pour modifier des comptes.'
            )

          case error.message.includes('network'):
            throw new Error(
              'Erreur de connexion réseau. Vérifiez votre connexion internet.'
            )

          case error.message.includes('invalid-argument'):
            throw new Error('ID du compte invalide.')

          default:
            throw new Error(
              'Erreur lors de la définition du compte principal: ' +
                error.message
            )
        }
      }

      throw new Error(
        'Erreur lors de la définition du compte principal: Erreur inconnue'
      )
    }
  }

  return useRequest<boolean>({
    runServices,
  })
}
