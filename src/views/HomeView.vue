<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import transactions from "@/data/transactions.json";

import { useTransactionStore } from '@/stores/transactions'
import { onMounted } from 'vue';

const getRevenus = () => {
  const revenus = transactions.filter((transaction) => transaction.type === true);
  console.log(revenus);
  return revenus;
}

const getDepenses = () => {
  const depenses = transactions.filter((transaction) => transaction.type === false);
  console.log(depenses);
  return depenses;
}

onMounted(() => {
  getRevenus();
  getDepenses();
});


library.add(faXmark, faArrowLeft, faArrowRight);
</script>

<template>
  <main class="d-flex justify-content-center align-items-center flex-column">

    <div id="transactions-list" class="w-100" v-if="transactions.length > 0">
      <div class="row">
        <div class="col-4">
          <h2 class="text-center">Revenus</h2>
          <div class="transaction-item" v-for="revenu in getRevenus()" :key="revenu.id">
            <span class="type revenu">
            </span>
            <span class="name">
              {{ revenu.nom }}
            </span>
            <span class="amount">
              {{ revenu.montant }}€
            </span>
          </div>
        </div>
        <div class="col-4">
          <h2 class="text-center">Dépenses</h2>
          <div class="transaction-item" v-for="depense in getDepenses()" :key="depense.id">
            <span class="type depense">
            </span>
            <span class="name">
              {{ depense.nom }}
            </span>
            <span class="amount">
              {{ depense.montant }}€
            </span>
          </div>
        </div>
        <div class="col-4">
          <div class="card w-100 h-100" style="width: 18rem;">
            <div class="card-body">
              <div id="month-selector" class="d-flex align-items-center justify-content-evenly">
                <font-awesome-icon :icon="['fas', 'arrow-left']" />
                <h3 class="card-title text-light">Novembre</h3>
                <font-awesome-icon :icon="['fas', 'arrow-right']" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>
        Il semblerait que vous n’ayez pas encore renseigné de dépenses/revenus récurrent(e)s.
      </p>
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
