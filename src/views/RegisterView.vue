<template>
    <div class="logo">
        <img src="@/assets/images/logo-aesura.png" alt="" srcset="">
    </div>
    <div class="site">
        <div id="form" class="col-md-5 col-12 sign-in d-flex flex-column text-center">
            <h1 class="mb-5">Create an account</h1>

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

            <button class="btn btn-primary" @click="register">Créer avec un mail</button>
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
import { 
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
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

const register = () =>  {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Successfully registered!");
        router.push('/');
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    }
    )
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/");
        })
        .catch((error) => {
            console.log(error.message)
        })

}

</script>

<style lang="scss">

.site {
    width: 100%;
    justify-content: center;
    align-items: center;
}

</style>