<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import DesignSystem from './DesignSystem.vue'

library.add(faXmark)
</script>

<template>
  <main class="d-flex justify-content-center align-items-center flex-column">
    <p>
      Il semblerait que vous n’ayez pas encore renseigné de dépenses/revenus récurrent(e)s.
      Commencez dès maintenant !
    </p>

    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addTransactionForm"
    >
      Ajouter ma première transaction
    </button>

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
}
</style>
