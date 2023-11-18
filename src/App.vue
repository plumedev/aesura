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
    <nav class="d-flex justify-content-center">
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
      <div class="right position-absolute top-10 end-0 pe-5">
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
</template>

<style lang="scss"></style>
