import { useRequest } from '@/composables/utils/useRequest'
import {
  addDoc,
  type CollectionReference,
  type DocumentData,
} from 'firebase/firestore'
import { handleEntityFirebaseError } from '@/helpers/firebaseError.helper'

export function useAddDoc() {
  const runServices = async (
    collectionRef: CollectionReference,
    data: DocumentData
  ): Promise<DocumentData> => {
    try {
      if (!collectionRef) {
        throw new Error('Référence de collection invalide')
      }

      if (!data) {
        throw new Error("Données invalides pour l'ajout du document")
      }

      const docRef = await addDoc(collectionRef, data)

      const newDocument: DocumentData = {
        id: docRef.id,
        ...data,
      }

      return newDocument
    } catch (error) {
      throw handleEntityFirebaseError(
        error,
        "l'ajout du document",
        'le document'
      )
    }
  }

  return useRequest<DocumentData>({
    runServices,
  })
}
