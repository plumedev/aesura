import { collection, type CollectionReference } from 'firebase/firestore'
import { db } from '@/plugins/firebase'
import { useAddDoc } from '@/composables/firebase/useAddDoc'

// Interface pour les données de transaction
export interface TransactionData {
  // Informations de base
  name: string
  amount: number
  type: 'income' | 'expense'
  date: Date

  // Référence
  accountId: string

  // Fréquence (pour transactions récurrentes)
  frequency: 'monthly' | 'weekly' | 'daily'

  // Métadonnées
  createdAt: Date
  updatedAt: Date
}

// Interface pour la transaction créée (avec ID)
export interface Transaction extends TransactionData {
  id: string
}

export function useCreateTransaction() {
  const { doRequest, isLoading, isError, errorMessage, isSuccess } = useAddDoc()

  const createTransaction = async (
    transactionData: TransactionData
  ): Promise<Transaction> => {
    try {
      // Validation des données
      if (!transactionData.name?.trim()) {
        throw new Error('Le nom de la transaction est requis')
      }

      if (transactionData.amount === 0) {
        throw new Error('Le montant de la transaction ne peut pas être zéro')
      }

      if (!transactionData.accountId) {
        throw new Error('Le compte associé est requis')
      }

      if (!transactionData.date) {
        throw new Error('La date de la transaction est requise')
      }

      // Préparer les données pour Firebase
      const firebaseData = {
        ...transactionData,
        // Convertir les dates en Timestamp Firebase
        date: transactionData.date,
        createdAt: transactionData.createdAt,
        updatedAt: transactionData.updatedAt,
      }

      // Référence de la collection transactions
      const transactionsCollectionRef = collection(db, 'transactions')

      // Créer la transaction
      const newTransaction = await doRequest(
        transactionsCollectionRef,
        firebaseData
      )

      console.log('Transaction créée avec succès:', newTransaction)

      return newTransaction as Transaction
    } catch (error) {
      console.error('Erreur lors de la création de la transaction:', error)
      throw error
    }
  }

  return {
    createTransaction,
    isLoading,
    isError,
    errorMessage,
    isSuccess,
  }
}
