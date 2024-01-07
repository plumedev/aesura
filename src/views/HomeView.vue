<script setup lang="ts">
  import { ref } from 'vue'
  /**  Font Awesome */
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faXmark, faArrowLeft, faArrowRight, faFont, faCalendar } from '@fortawesome/free-solid-svg-icons'
  library.add(faXmark, faArrowLeft, faArrowRight, faFont, faCalendar)
  /** Firebase */
  import { useCollection } from 'vuefire';
  import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
  import { db } from '@/firebase'; 
  /** Component */
  import statChart from '@/components/statChart.vue';
  import TransactionItem from '@/components/TransactionItem.vue';
  /** Bootstrap imports */
  import { Modal } from 'bootstrap';
  /* Pinia stores */
  import { useTransactionStore } from '@/stores/transactions';

  // stockage des transaction dans le store depuis  
  useTransactionStore();

  interface Transaction {
    name: string;
    amount: string;
    isAnIncome: boolean;
    frequency: string;
    date: string;
    id: string;
  }

  let showError = ref(false);
  let currentTransactionId: string;


  const transactionsCollection = useCollection(collection(db, 'transactions'));

  const newTransaction = ref<Transaction>({
    name: '',
    amount: '',
    isAnIncome: false,
    frequency: '0',
    date: '',
    id: ''
  });

  async function addTransaction()  {
    if( newTransaction.value.name != '' &&
        newTransaction.value.amount != '' &&
        newTransaction.value.frequency != '' &&
        newTransaction.value.date != '' ) {
      const newDoc = addDoc(collection(db, "transactions"), {
        ...newTransaction.value
      });
      showError.value = false;
      
      const modalElement = document.getElementById('addTransactionModal');
      
      if (modalElement) {
          const modalInstance = Modal.getInstance(modalElement);
          if (modalInstance) {
              modalInstance.hide();
          }
      }
    } else {
      showError.value = true;
    }
  }

  async function editTransaction(id: string) {
    currentTransactionId = id;
    const docRef = doc(db, 'transactions', currentTransactionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      newTransaction.value = { 
        id,
        name: newTransaction.value.name || '',
        amount: newTransaction.value.amount || '',
        isAnIncome: newTransaction.value.isAnIncome || false,
        frequency: newTransaction.value.frequency || '',
        date: newTransaction.value.date || '',
        ...docSnap.data() };
    } else {
      console.log("Cette transaction n'existe pas !");
    }
    return id
  }

  async function updateTransaction() {
    const docRef = doc(db, 'transactions', currentTransactionId);
    await updateDoc(docRef, {
      ...newTransaction.value
    });

    const modalElement = document.getElementById('editTransactionModal');
    if (modalElement) {
        const modalInstance = Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
  }

  async function deleteTransaction(id: string) {
    await deleteDoc(doc(db, 'transactions',  id))
  }

  function cleanForm() {
    newTransaction.value.name = '';
    newTransaction.value.amount = '';
    newTransaction.value.isAnIncome = false;
    newTransaction.value.frequency = '0';
    newTransaction.value.date = '';
  }
</script>

<template>
  <main class="d-flex justify-content-center align-items-center flex-column">

    <div id="transactions-list" class="w-100" v-if="transactionsCollection.length > 0">
      <div class="row">
        <div class="col-4">
          <h2 class="text-center mb-3">Revenus</h2>
          <TransactionItem v-for="transaction in transactionsCollection.filter(t => t.isAnIncome)" 
              :key="transaction.name"
              :transaction="transaction"
              @edit-transaction="editTransaction(transaction.id)"
              @delete-transaction="deleteTransaction(transaction.id)"
                />
        </div>
        <div class="col-4">
          <h2 class="text-center mb-3">Dépenses</h2>
          <TransactionItem v-for="transaction in transactionsCollection.filter(t => !t.isAnIncome)" 
              :key="transaction.name"
              :transaction="transaction"
              @edit-transaction="editTransaction(transaction.id)"
              @delete-transaction="deleteTransaction(transaction.id)"/>
        </div>
        <div class="col-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <button type="button" 
                      class="btn btn-primary mb-3" 
                      data-bs-toggle="modal" 
                      data-bs-target="#addTransactionModal"
                      @click="cleanForm"
              >
                Ajouter une transaction
              </button>
            </div>
          </div>
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
              <div class="input-group-label d-flex justify-content-between">
                <label class="fw-bold" for="name">Nom</label>
                <div v-if="!newTransaction.name && showError" class="text-danger fw-bold text-end mb-1">Veuillez renseigner un nom</div>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" :class="{ error: !newTransaction.name && showError }" id="at-icon">
                  <font-awesome-icon :icon="['fa', 'font']" />
                </span>
                <input  type="text"
                        class="form-control"
                        placeholder="Ex: Spotify"
                        aria-label="Nom"
                        aria-describedby="font-icon"
                        v-model="newTransaction.name"
                        id="name"
                >
              </div>
              <div class="input-group-label d-flex justify-content-between">
                <label class="fw-bold" for="date">Date</label>
                <div v-if="!newTransaction.date && showError" class="text-danger fw-bold text-end mb-1">Veuillez renseigner un date</div>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" :class="{ error: !newTransaction.name && showError }" id="at-icon">
                  <font-awesome-icon :icon="['fa', 'calendar']" />
                </span>
                <input  type="date"
                        class="form-control"
                        placeholder="Montant"
                        aria-label="Montant"
                        aria-describedby="font-calendar"
                        v-model="newTransaction.date"
                        id="date"
                >
              </div>
              <select class="form-select form-select-lg mb-3" 
                      aria-label="Large select example"
                      v-model="newTransaction.frequency"
              >
                <option value="0" selected>Pas de répétition</option>
                <option value="1">Quotidienne</option>
                <option value="2">Hebdomadaire</option>
                <option value="3">Mensuelle</option>
                <option value="4">Trimestrielle</option>
                <option value="5">Annuelle</option>
              </select>
            </div>
            <div class="col-5 offset-1 d-flex flex-column align-items-center justify-content-center">
              <h3>Montant</h3>
              <div class="input-group-label">
                <div v-if="!newTransaction.amount && showError" class="text-danger fw-bold text-end mb-1">Veuillez renseigner un montant</div>
              </div>
              <input class="bigger-transparent" type="number" name="" id="" placeholder="XX€" v-model="newTransaction.amount">
              <button type="button" @click="addTransaction" class="btn btn-primary">Ajouter</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="editTransactionModal" tabindex="-1" aria-labelledby="editTransactionModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-3" id="editTransactionModalLabel">Modifier {{ newTransaction.name }}</h1>
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
              <div class="input-group-label d-flex justify-content-between">
                <label class="fw-bold" for="name">Nom</label>
                <div v-if="!newTransaction.name && showError" class="text-danger fw-bold text-end mb-1">Veuillez renseigner un nom</div>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" :class="{ error: !newTransaction.name && showError }" id="at-icon">
                  <font-awesome-icon :icon="['fa', 'font']" />
                </span>
                <input  type="text"
                        class="form-control"
                        placeholder="Ex: Spotify"
                        aria-label="Nom"
                        aria-describedby="font-icon"
                        v-model="newTransaction.name"
                        id="name"
                >
              </div>
              <div class="input-group-label d-flex justify-content-between">
                <label class="fw-bold" for="date">Date</label>
                <div v-if="!newTransaction.date && showError" class="text-danger fw-bold text-end mb-1">Veuillez renseigner un date</div>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" :class="{ error: !newTransaction.name && showError }" id="at-icon">
                  <font-awesome-icon :icon="['fa', 'calendar']" />
                </span>
                <input  type="date"
                        class="form-control"
                        placeholder="Montant"
                        aria-label="Montant"
                        aria-describedby="font-calendar"
                        v-model="newTransaction.date"
                        id="date"
                >
              </div>
              <select class="form-select form-select-lg mb-3" 
                      aria-label="Large select example"
                      v-model="newTransaction.frequency"
              >
                <option value="0" selected>Pas de répétition</option>
                <option value="1">Quotidienne</option>
                <option value="2">Hebdomadaire</option>
                <option value="3">Mensuelle</option>
                <option value="4">Trimestrielle</option>
                <option value="5">Annuelle</option>
              </select>
            </div>
            <div class="col-5 offset-1 d-flex flex-column align-items-center justify-content-center">
              <h3>Montant</h3>
              <div class="input-group-label">
                <div v-if="!newTransaction.amount && showError" class="text-danger fw-bold text-end mb-1">Veuillez renseigner un montant</div>
              </div>
              <input class="bigger-transparent" type="number" name="" id="" placeholder="XX€" v-model="newTransaction.amount">
              <button type="button" @click="updateTransaction" class="btn btn-primary">Ajouter</button>
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
