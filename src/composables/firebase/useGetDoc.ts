import { getDoc, type DocumentData, type DocumentReference } from "firebase/firestore"
import { useRequest } from "@/composables/utils/useRequest"

export function useGetDoc() {


  const runServices = async (userDocRef: DocumentReference): Promise<DocumentData> => {
    const userDoc = await getDoc(userDocRef)
    return userDoc.data() as DocumentData
  }

  return useRequest<DocumentData>({
    runServices
  })
}
