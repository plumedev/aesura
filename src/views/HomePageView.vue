<script setup lang="ts">
/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons'
library.add(faPersonDigging)
</script>

<template>
    <div class="logo">
        <img src="@/assets/images/logo-aesura.png" alt="" srcset="">
    </div>
    <div class="site">
        <div id="under-construction" class="d-flex align-items-center">
            <div class="headline text-center">
                <font-awesome-icon :icon="['fas', 'person-digging']" />
                <h1>En construction</h1>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#under-construction {
    height: calc(100vh - 129px);
}

.headline {
    .svg-inline--fa {
        font-size: 8rem;
        color: #058075;
        text-decoration: underline;
        path {
            fill: #f9bc60;
            stroke: #001e1d;
            stroke-width: 10;
        }
    }
}
</style>