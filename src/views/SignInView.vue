<template>
    <div class="logo">
        <img src="@/assets/images/logo-aesura.png" alt="" srcset="">
    </div>
    <div class="site">
        <div id="form" class="col-md-5 col-12 sign-in d-flex flex-column text-center">
            <h1 class="mb-5">Se connecter</h1>
            <p v-if="errMsg" class="text-danger fw-bold">{{ errMsg }}</p>
            <div class="input-group mb-3">
                <span class="input-group-text" id="at-icon">
                    <font-awesome-icon :icon="['fas', 'at']" />
                </span>
                <input  type="text"
                        class="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="at-icon"
                        v-model="email"
                >
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="lock-icon">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                </span>
                <input  type="password"
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="lock-icon"
                        v-model="password"
                >
            </div>
            <button class="btn btn-primary" @click="register">Se connecter</button>
            <h3 class="m-3">Ou</h3>
            <button class="btn btn-primary" @click="signInWithGoogle">
                <font-awesome-icon :icon="['fab', 'google']" />
                se connecter avec Google
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import router from '@/router';

/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
library.add(faAt, faLock, faGoogle )

const email = ref('')
const password = ref('')
const errMsg = ref()

const register = () =>  {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Successfully sign in!");
        router.push('/');
    })
    .catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
            default:
                errMsg.value = "Email or password was incorrect";
                break;
        }
        alert(error.message);
    }
    )
};

const signInWithGoogle = () => {

}

</script>

<style lang="scss">

.site {
    width: 100%;
    justify-content: center;
    align-items: center;
}

</style>