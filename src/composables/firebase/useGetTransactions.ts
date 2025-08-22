import { collection, type CollectionReference } from 'firebase/firestore'
import { useGetDocs } from '@/composables/firebase/useGetDocs'

// Interface pour les transactions
export interface Transaction {
  id: string
  name: string
  amount: number
  type: 'income' | 'expense'
  date: Date
  accountId: string
  frequency: 'monthly' | 'weekly' | 'daily'
  createdAt: Date
  updatedAt: Date
}

export function useGetTransactions() {
  const {
    data: transactionsData,
    isLoading,
    isError,
    errorMessage,
    doRequest,
  } = useGetDocs()

  const getTransactions = async (
    collectionRef: CollectionReference
  ): Promise<Transaction[]> => {
    try {
      const transactions = await doRequest(collectionRef)

      if (!transactions || !Array.isArray(transactions)) {
        return []
      }

      // Formater les transactions avec les bonnes dates
      const formattedTransactions: Transaction[] = transactions.map(
        (transaction: any) => ({
          id: transaction.id || '',
          name: transaction.name || 'Transaction sans nom',
          amount: transaction.amount || 0,
          type: transaction.type || 'expense',
          date: transaction.date?.toDate
            ? transaction.date.toDate()
            : new Date(transaction.date),
          accountId: transaction.accountId || '',
          frequency: transaction.frequency || 'monthly',
          createdAt: transaction.createdAt?.toDate
            ? transaction.createdAt.toDate()
            : new Date(transaction.createdAt),
          updatedAt: transaction.updatedAt?.toDate
            ? transaction.updatedAt.toDate()
            : new Date(transaction.updatedAt),
        })
      )

      // Trier par date (plus récent en premier)
      const sortedTransactions = formattedTransactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

      console.log('Transactions récupérées:', sortedTransactions)
      return sortedTransactions
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error)
      return []
    }
  }

  return {
    transactionsData,
    isLoading,
    isError,
    errorMessage,
    getTransactions,
  }
}
