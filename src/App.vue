<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTableColumns, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTableColumns, faBuildingColumns);

</script>

<template>
  <header>
      <nav>
        <RouterLink to="/" class="router-link link-offset-2">
          <font-awesome-icon :icon="['fas', 'table-columns']" />
          Dashboard
        </RouterLink>
        <RouterLink to="/accounts" class="router-link link-offset-2">
          <font-awesome-icon :icon="['fas', 'building-columns']" />
          Comptes
        </RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped></style>
