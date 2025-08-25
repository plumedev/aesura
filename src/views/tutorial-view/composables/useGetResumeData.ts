import { useGetTransactions } from '@/composables/firebase/useGetTransactions'
import { db } from '@/plugins/firebase'
import { TransactionType } from '@/types/transaction'
import { collection } from 'firebase/firestore'
import { ref, computed } from 'vue'

export function useGetResumeData() {
  const { getTransactions } = useGetTransactions()

  const incomes = ref(0)
  const expenses = ref(0)
  const isLoading = ref(false)

  const sumIncome = async () => {
    try {
      const dataIncome = await getTransactions(collection(db, 'transactions'), {
        type: TransactionType.INCOME,
      })
      incomes.value = dataIncome.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      )
      return incomes.value
    } catch (error) {
      console.error('Erreur lors du calcul des revenus:', error)
      return 0
    }
  }

  const sumExpense = async () => {
    try {
      const dataExpense = await getTransactions(
        collection(db, 'transactions'),
        {
          type: TransactionType.EXPENSE,
        }
      )
      expenses.value = dataExpense.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      )
      return expenses.value
    } catch (error) {
      console.error('Erreur lors du calcul des dépenses:', error)
      return 0
    }
  }

  const calculateResumeData = async () => {
    isLoading.value = true
    try {
      await Promise.all([sumIncome(), sumExpense()])
    } catch (error) {
      console.error('Erreur lors du calcul des données résumées:', error)
    } finally {
      isLoading.value = false
    }
  }

  const resumeData = computed(() => ({
    incomes: incomes.value,
    expenses: expenses.value,
    total: incomes.value - expenses.value,
  }))

  return {
    incomes,
    expenses,
    isLoading,
    resumeData,
    sumIncome,
    sumExpense,
    calculateResumeData,
  }
}
