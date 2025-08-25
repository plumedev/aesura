import { useRequest } from '@/composables/utils/useRequest'
import {
  deleteDoc,
  doc,
  getDoc,
  type CollectionReference,
} from 'firebase/firestore'
import { handleEntityFirebaseError } from '@/helpers/firebaseError.helper'

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
      throw handleEntityFirebaseError(
        error,
        'la suppression du document',
        'le document'
      )
    }
  }

  return useRequest<boolean>({
    runServices,
  })
}
