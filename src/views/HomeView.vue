<script setup lang="ts">
import { onMounted, ref } from 'vue'
/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
library.add(faXmark, faArrowLeft, faArrowRight)
/** Data */
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc} from 'firebase/firestore';
import transactions from '@/data/transactions.json'
/** Component */
import statChart from '@/components/statChart.vue'
/** Utils */
import { getRevenus, getDepenses } from '@/utils/transactionUtils'

  const db = useFirestore();
  const transactionsCollection = useCollection(collection(db, 'transactions'));
  
  const newTransaction = ref({
    name: '',
    amount: 0,
    isAnIncome: false,
    frequency: ''
  })

  async function addTransaction() {
    const newDoc = addDoc(collection(db, "transactions"), {
      ...newTransaction.value
    });
    console.log(newDoc);
  }

</script>

<template>
  <main class="d-flex justify-content-center align-items-center flex-column">
    <div id="transactions-list" class="w-100" v-if="transactions.length > 0">
      <div class="row">
        <div class="col-4">
          <h2 class="text-center">Revenus</h2>
          <div class="transaction-item" v-for="transaction in transactionsCollection.filter(t => t.isAnIncome)" :key="transaction.name">
            <span class="type" :class="transaction.isAnIncome ? 'revenu' : 'depense'"></span>
            <span class="name">
              {{ transaction.name }}
            </span>
            <span class="amount"> {{ transaction.amount }}€ </span>
          </div>
        </div>
        <div class="col-4">
          <h2 class="text-center">Dépenses</h2>
          <div class="transaction-item" v-for="transaction in transactionsCollection.filter(t => !t.isAnIncome)" :key="transaction.name">
            <span class="type" :class="transaction.isAnIncome ? 'revenu' : 'depense'"></span>
            <span class="name">
              {{ transaction.name }}
            </span>
            <span class="amount"> {{ transaction.amount }}€ </span>
          </div>
        </div>
        <div class="col-4">
          <statChart />
        </div>
      </div>
    </div>

    <div v-else>
      <p>Il semblerait que vous n’ayez pas encore renseigné de dépenses/revenus récurrent(e)s.</p>
      <p>Commencez dès maintenant !</p>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTransactionForm"
      >
        Ajouter ma première transaction
      </button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addTransactionForm"
      tabindex="-1"
      aria-labelledby="addTransactionFormLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="addTransactionFormLabel">Ajouter une transaction</h3>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              class="btn btn-link btn-sm"
            >
              <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  min-height: calc(100vh - 92px);
  max-width: 1140px;
  width: 100%;
}
</style>
