import { useRequest } from '@/composables/utils/useRequest'
import {
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  type CollectionReference,
} from 'firebase/firestore'
import { handleEntityFirebaseError } from '@/helpers/firebaseError.helper'

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
      throw handleEntityFirebaseError(
        error,
        'la définition du compte principal',
        'le compte'
      )
    }
  }

  return useRequest<boolean>({
    runServices,
  })
}
