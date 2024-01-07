<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTableColumns, faBuildingColumns, faSwatchbook, faRightFromBracket, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getAuth, onAuthStateChanged, signOut, type Auth } from 'firebase/auth';
import router from './router'

library.add(faTableColumns, faBuildingColumns, faSwatchbook, faRightFromBracket, faRightToBracket, faUserPlus)

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
    <nav class="d-flex justify-content-center d-none d-md-flex d-lg-flex d-xl-flex">
      <div v-if="isLoggedIn" class="menu">
        <RouterLink to="/dashboard" class="router-link link-offset-2 fw-bolder">
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
      </div>
      <div id="user-hub" class="position-absolute-md top-10 end-0 pe-5 mb-3 d-flex">
        <RouterLink to="/sign-in" v-if="!isLoggedIn" class="router-link link-offset-2 fw-bolder">
          <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
          Login
        </RouterLink>
        <RouterLink to="/register" v-if="!isLoggedIn" class="router-link link-offset-2 fw-bolder">
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          S'inscrire
        </RouterLink>
        <button @click="handleSignOut" v-if="isLoggedIn" class="router-link btn btn-link btn-xs link-offset-2 fw-bolder">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          Se déconnecter
        </button>
      </div>
    </nav>
  </header>

  <RouterView />

  <nav class="navbar fixed-bottom w-100 d-sm-flex d-md-none d-lg-none d-xl-none">
    <div class="container-fluid d-flex flex-row justify-content-center">
      <div v-if="isLoggedIn" class="menu d-flex">
        <RouterLink to="/dashboard" class="router-link link-offset-2 fw-bolder d-flex flex-column">
          <font-awesome-icon :icon="['fas', 'table-columns']" />
          Dashboard
        </RouterLink>
        <RouterLink to="/accounts" class="router-link link-offset-2 fw-bolder d-flex flex-column">
          <font-awesome-icon :icon="['fas', 'building-columns']" />
          Comptes
        </RouterLink>
      </div>
      <div v-if="!isLoggedIn" class="menu d-flex">
        <RouterLink to="/sign-in" v-if="!isLoggedIn" class="router-link link-offset-2 fw-bolder d-flex flex-column">
          <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
          Login
        </RouterLink>
        <RouterLink to="/register" v-if="!isLoggedIn" class="router-link link-offset-2 fw-bolder d-flex flex-column">
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          S'inscrire
        </RouterLink>
        <button @click="handleSignOut" v-if="isLoggedIn" class="router-link btn btn-link btn-xs link-offset-2 fw-bolder d-flex flex-column align-items-center">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          Se déconnecter
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss"></style>
