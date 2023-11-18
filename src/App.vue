<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTableColumns, faBuildingColumns, faSwatchbook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getAuth, onAuthStateChanged, signOut, type Auth } from 'firebase/auth';
import router from './router'

library.add(faTableColumns, faBuildingColumns, faSwatchbook)

const isLoggedIn = ref(false);
let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  })
};
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
      <RouterLink to="/register" class="router-link link-offset-2 fw-bolder">
        <font-awesome-icon :icon="['fas', 'swatchbook']" />
        Register
      </RouterLink>
      <RouterLink to="/sign-in" class="router-link link-offset-2 fw-bolder">
        <font-awesome-icon :icon="['fas', 'swatchbook']" />
        Login
      </RouterLink>
      <button @click="handleSignOut" v-if="isLoggedIn" class="router-link link-offset-2 fw-bolder">
        <font-awesome-icon :icon="['fas', 'swatchbook']" />
        Sign out
      </button>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss"></style>
