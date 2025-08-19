import { getDocs, type CollectionReference, type QuerySnapshot, type DocumentData } from "firebase/firestore"
import { useRequest } from "@/composables/utils/useRequest"

export function useGetDocs() {
  const runServices = async (collectionRef: CollectionReference): Promise<DocumentData[]> => {
    try {
      if (!collectionRef) {
        throw new Error('Référence de collection invalide')
      }

      const querySnapshot: QuerySnapshot = await getDocs(collectionRef)

      const documents: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        })
      })
      console.log('documents', documents)
      return documents
    } catch (error) {

      if (error instanceof Error) {
        switch (true) {
          case error.message.includes('permission-denied'):
            throw new Error('Accès refusé à la collection. Vérifiez vos permissions Firebase.')

          case error.message.includes('not-found'):
            throw new Error('Collection introuvable. Vérifiez le nom de la collection.')

          case error.message.includes('unavailable'):
            throw new Error('Service Firebase temporairement indisponible. Veuillez réessayer.')

          case error.message.includes('unauthenticated'):
            throw new Error('Vous devez être authentifié pour accéder à cette collection.')

          case error.message.includes('network'):
            throw new Error('Erreur de connexion réseau. Vérifiez votre connexion internet.')

          default:
            throw new Error('Erreur lors de la récupération des documents: ' + error.message)
        }
      }

      throw new Error('Erreur lors de la récupération des documents: Erreur inconnue')
    }
  }

  return useRequest<DocumentData[]>({
    runServices
  })
}
