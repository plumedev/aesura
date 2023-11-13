<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTableColumns, faBuildingColumns, faSwatchbook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTableColumns, faBuildingColumns, faSwatchbook)
</script>

<template>
  <header>
    <nav class="d-flex justify-content-center">
      <RouterLink to="/" class="router-link link-offset-2 fw-bolder">
        <font-awesome-icon :icon="['fas', 'table-columns']" />
        Dashboard
      </RouterLink>
      <RouterLink to="/accounts" class="router-link link-offset-2 fw-bolder">
        <font-awesome-icon :icon="['fas', 'building-columns']" />
        Comptes
      </RouterLink>
      <RouterLink to="/design-system" class="router-link link-offset-2 fw-bolder">
        <font-awesome-icon :icon="['fas', 'swatchbook']" />
        Design system
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss"></style>
