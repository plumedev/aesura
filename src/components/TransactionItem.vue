<script setup lang="ts">
/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faPenToSquare, faTrash)

import ModalEditTransaction from './ModalEditTransaction.vue';

const props = defineProps({
    transaction: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div class="transaction-item" v-if="transaction">
        <div class="content">
            <span class="type" :class="transaction.isAnIncome ? 'revenu' : 'depense'"></span>
            <span class="name">{{ transaction.name }}</span>
            <span class="amount">{{ transaction.amount }}€</span>
        </div>
        <div class="actions">
            <modalEditTransaction/>
            <font-awesome-icon :icon="['fa', 'trash']" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.transaction-item {
    position: relative;  
    &:hover {  
        .actions {
            display: flex;
            opacity: 1;
            align-items: center;
            justify-content: space-between;
        }
    }
    .content, .actions {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .actions {
        display: none;
        opacity: 0;
        padding: 12px 6px;
        background: rgba(255, 255, 255, 0);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
}
</style>