import { useRequest } from '@/composables/utils/useRequest'
import {
  deleteDoc,
  doc,
  getDoc,
  type CollectionReference,
} from 'firebase/firestore'

export function useDeleteDoc() {
  const runServices = async (
    collectionRef: CollectionReference,
    documentId: string
  ): Promise<boolean> => {
    try {
      if (!collectionRef) {
        throw new Error('Référence de collection invalide')
      }

      if (!documentId) {
        throw new Error('ID du document invalide pour la suppression')
      }

      const docRef = doc(collectionRef, documentId)

      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        throw new Error("Document introuvable. Vérifiez l'ID du document.")
      }

      await deleteDoc(docRef)

      return true
    } catch (error) {
      if (error instanceof Error) {
        switch (true) {
          case error.message.includes('permission-denied'):
            throw new Error(
              'Accès refusé à la collection. Vérifiez vos permissions Firebase.'
            )

          case error.message.includes('not-found'):
            throw new Error("Document introuvable. Vérifiez l'ID du document.")

          case error.message.includes('unavailable'):
            throw new Error(
              'Service Firebase temporairement indisponible. Veuillez réessayer.'
            )

          case error.message.includes('unauthenticated'):
            throw new Error(
              'Vous devez être authentifié pour supprimer des documents.'
            )

          case error.message.includes('network'):
            throw new Error(
              'Erreur de connexion réseau. Vérifiez votre connexion internet.'
            )

          case error.message.includes('invalid-argument'):
            throw new Error('ID du document invalide pour la suppression.')

          default:
            throw new Error(
              'Erreur lors de la suppression du document: ' + error.message
            )
        }
      }

      throw new Error(
        'Erreur lors de la suppression du document: Erreur inconnue'
      )
    }
  }

  return useRequest<boolean>({
    runServices,
  })
}
