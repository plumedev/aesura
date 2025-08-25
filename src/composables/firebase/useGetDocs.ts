import { useRequest } from '@/composables/utils/useRequest'
import {
  getDocs,
  type CollectionReference,
  type DocumentData,
  type QuerySnapshot,
  type Query,
} from 'firebase/firestore'
import { handleFirebaseError } from '@/helpers/firebaseError.helper'

export function useGetDocs() {
  const runServices = async (
    collectionRef: CollectionReference | Query
  ): Promise<DocumentData[]> => {
    try {
      if (!collectionRef) {
        throw new Error('Référence de collection ou requête invalide')
      }

      const querySnapshot: QuerySnapshot = await getDocs(collectionRef)

      const documents: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      return documents
    } catch (error) {
      throw handleFirebaseError(
        error,
        'la récupération des documents',
        'la collection'
      )
    }
  }

  return useRequest<DocumentData[]>({
    runServices,
  })
}
