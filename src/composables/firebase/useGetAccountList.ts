import { useGetDocs } from '@/composables/firebase/useGetDocs'
import { type CollectionReference } from 'firebase/firestore'

export interface AccountOption {
  label: string
  value: string
  isMainAccount: boolean
}

export function useGetAccountList() {
  const {
    data: accountsData,
    isLoading,
    isError,
    errorMessage,
    doRequest,
  } = useGetDocs()

  const getAccountsList = async (
    collectionRef: CollectionReference
  ): Promise<AccountOption[]> => {
    try {
      const accounts = await doRequest(collectionRef)

      if (!accounts || !Array.isArray(accounts)) {
        return []
      }

      // Formater les comptes pour USelect
      const formattedAccounts: AccountOption[] = accounts.map(
        (account: any) => ({
          label: account.name || 'Compte sans nom',
          value: account.id || '',
          isMainAccount: account.isMainAccount || false,
        })
      )

      const sortedAccounts = formattedAccounts.sort((a, b) => {
        if (a.isMainAccount && !b.isMainAccount) return -1
        if (!a.isMainAccount && b.isMainAccount) return 1
        return 0
      })
      return sortedAccounts
    } catch (error) {
      console.error(
        'Erreur lors de la récupération de la liste des comptes:',
        error
      )
      return []
    }
  }

  return {
    accountsData,
    isLoading,
    isError,
    errorMessage,
    getAccountsList,
  }
}
