import { addDoc, type CollectionReference, type DocumentData } from "firebase/firestore"
import { useRequest } from "@/composables/utils/useRequest"

export function useAddDoc() {
  const runServices = async (collectionRef: CollectionReference, data: DocumentData): Promise<DocumentData> => {
    try {
      if (!collectionRef) {
        throw new Error('Référence de collection invalide')
      }

      if (!data) {
        throw new Error('Données invalides pour l\'ajout du document')
      }

      const docRef = await addDoc(collectionRef, data)

      const newDocument: DocumentData = {
        id: docRef.id,
        ...data
      }

      console.log('Document ajouté avec succès:', newDocument)
      return newDocument
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
            throw new Error('Vous devez être authentifié pour ajouter des documents.')

          case error.message.includes('network'):
            throw new Error('Erreur de connexion réseau. Vérifiez votre connexion internet.')

          case error.message.includes('invalid-argument'):
            throw new Error('Données invalides pour l\'ajout du document.')

          default:
            throw new Error('Erreur lors de l\'ajout du document: ' + error.message)
        }
      }

      throw new Error('Erreur lors de l\'ajout du document: Erreur inconnue')
    }
  }

  return useRequest<DocumentData>({
    runServices
  })
}
