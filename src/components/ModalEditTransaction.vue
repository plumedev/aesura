<script setup lang="ts">
/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faPenToSquare, faTrash)

const props = defineProps({
    transaction: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <!-- Button trigger modal -->
    <button type="button" 
            class="btn btn-icon btn-sm" 
            data-bs-toggle="modal" 
            data-bs-target="#editTransactionModal" >
        <font-awesome-icon :icon="['fa', 'pen-to-square']" />
    </button>
</template>

<style lang="scss" scoped>
</style>