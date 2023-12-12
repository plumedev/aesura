<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrash, faArrowUp } from '@fortawesome/free-solid-svg-icons'
library.add(faPenToSquare, faTrash, faArrowUp)
</script>

<template>
  <main>
    <div class="row m-4">
      <h1>Headline 1</h1>
      <h2>Headline 2</h2>
      <h3>Headline 3</h3>
      <h4>Headline 4</h4>
    </div>

    <div class="row m-4">
      <div class="col-2">
        <button type="button" class="btn btn-primary">Primary</button>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-secondary">Secondary</button>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-link">Link</button>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-icon">
          <font-awesome-icon :icon="['fa', 'pen-to-square']" />
        </button>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-primary btn-sm">Btn w/ minimum padding</button>
      </div>
      <div class="col-2">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div>


    <div class="row m-4">
      <div class="transaction-item ms-2 me-2">
        <span class="type depense"></span>
        <span class="name">
          Amazon Prime
        </span>
        <span class="amount"> 69.99€ </span>
      </div>
      <div class="transaction-item ms-2 me-2">
        <span class="type revenu"></span>
        <span class="name">
          Salaire
        </span>
        <span class="amount"> 1875€ </span>
      </div>
    </div>

    <div class="row m-4">
      <form @submit.prevent="">
        <div class="input-group mb-3">
                <span class="input-group-text" id="at-icon">
                    <font-awesome-icon :icon="['fas', 'at']" />
                </span>
                <input  type="text"
                        class="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="at-icon"
                >
            </div>
      </form>
    </div>

    <div class="row m-4">
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Ajouter
      </button>

      <!-- Modal -->
      <div class="modal fade" id="addTransactionModal" tabindex="-1" aria-labelledby="addTransactionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addTransactionModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>
