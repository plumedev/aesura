import { useRequest } from '@/composables/utils/useRequest'
import {
  getDocs,
  type CollectionReference,
  type DocumentData,
  type QuerySnapshot,
  type Query,
} from 'firebase/firestore'

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
      if (error instanceof Error) {
        switch (true) {
          case error.message.includes('permission-denied'):
            throw new Error(
              'Accès refusé à la collection. Vérifiez vos permissions Firebase.'
            )

          case error.message.includes('not-found'):
            throw new Error(
              'Collection introuvable. Vérifiez le nom de la collection.'
            )

          case error.message.includes('unavailable'):
            throw new Error(
              'Service Firebase temporairement indisponible. Veuillez réessayer.'
            )

          case error.message.includes('unauthenticated'):
            throw new Error(
              'Vous devez être authentifié pour accéder à cette collection.'
            )

          case error.message.includes('network'):
            throw new Error(
              'Erreur de connexion réseau. Vérifiez votre connexion internet.'
            )

          default:
            throw new Error(
              'Erreur lors de la récupération des documents: ' + error.message
            )
        }
      }

      throw new Error(
        'Erreur lors de la récupération des documents: Erreur inconnue'
      )
    }
  }

  return useRequest<DocumentData[]>({
    runServices,
  })
}
