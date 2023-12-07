<script setup lang="ts">
import { ref } from 'vue'
/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark, faArrowLeft, faArrowRight, faFont, faCalendar } from '@fortawesome/free-solid-svg-icons'
library.add(faXmark, faArrowLeft, faArrowRight, faFont, faCalendar)
/** Data */
import { useFirestore, useCollection } from 'vuefire';
import { collection, addDoc} from 'firebase/firestore';
import transactions from '@/data/transactions.json'
/** Component */
import statChart from '@/components/statChart.vue';


  const db = useFirestore();
  const transactionsCollection = useCollection(collection(db, 'transactions'));
  
  const newTransaction = ref({
    name: '',
    amount: '',
    isAnIncome: false,
    frequency: '',
    date: ''
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
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTransactionModal">
            Ajouter une transaction
          </button>
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
<div class="modal fade" id="addTransactionModal" tabindex="-1" aria-labelledby="addTransactionModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-3" id="addTransactionModalLabel">Ajouter une transaction</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>      
      <div class="modal-body">
        <form @submit.prevent="">
          <div class="row">
            <div class="col-6">
              <div class="form-check form-switch d-flex align-items-center mb-3">
                <input  class="form-check-input me-2" 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckDefault"
                        v-model="newTransaction.isAnIncome"
                >
                <label class="form-check-label fw-bold" for="flexSwitchCheckDefault">Cette transaction est un revenu</label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="at-icon">
                  <font-awesome-icon :icon="['fa', 'font']" />
                </span>
                <input  type="text"
                        class="form-control"
                        placeholder="Nom"
                        aria-label="Nom"
                        aria-describedby="font-icon"
                        v-model="newTransaction.name"
                >
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="at-icon">
                  <font-awesome-icon :icon="['fa', 'calendar']" />
                </span>
                <input  type="date"
                        class="form-control"
                        placeholder="Montant"
                        aria-label="Montant"
                        aria-describedby="font-calendar"
                        v-model="newTransaction.date"
                >
              </div>
              <select class="form-select form-select-lg mb-3" 
                      aria-label="Large select example"
                      v-model="newTransaction.frequency"
              >
                <option default>Pas de répétition</option>
                <option value="1">Quotidienne</option>
                <option value="2">Hebdomadaire</option>
                <option value="3">Mensuelle</option>
                <option value="4">Trimestrielle</option>
                <option value="5">Annuelle</option>
              </select>
            </div>
            <div class="col-5 offset-1 d-flex flex-column align-items-center justify-content-center">
              <h3>Montant</h3>
              <input class="bigger-transparent" type="number" name="" id="" placeholder="XX€" v-model="newTransaction.amount">
              <button type="button" @click="addTransaction" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </form>
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
