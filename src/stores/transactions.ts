import { defineStore } from 'pinia'

import transaction from '@/data/transactions.json'

export const useTransactionStore = defineStore('TransactionStore', {
  state: () => {
    return {
      transaction
    }
  }
})
