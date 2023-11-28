<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faArrowUp)


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

  </main>
</template>
