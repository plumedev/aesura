import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase'; 

const transactionsCollection = useCollection(collection(db, 'transactions'));

export const useTransactionStore = defineStore('TransactionStore', {
  state: () => {
    return {
      transaction: transactionsCollection
    }
  },

  actions: {}
})

