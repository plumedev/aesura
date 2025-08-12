<template>
  <div>
    <h2 class="text-stone-600 text-2xl font-bold">
      {{ $t('tutorial.stepOne.title') }}
    </h2>
    <p class="text-stone-600 text-md">
      {{ $t('tutorial.stepOne.description') }}
    </p>

    <UInput class="w-full mt-6 mb-6" icon="i-lucide-text" size="xl" v-model="accountName"
      :placeholder="$t('tutorial.stepOne.form.accountNamePlaceholder')" />

    <h2 class="text-stone-600 text-2xl font-bold">
      {{ $t('tutorial.stepOne.form.addAccount') }}
    </h2>
    <p class="text-stone-600 text-md">
      {{ $t('tutorial.stepOne.form.addAccountDescription') }}
    </p>
    <div class="w-full space-y-4 pb-4">
      <div class="flex flex-col justify-center pt-4">
        <div class="table-header flex flex-row items-center h-auto bg-neutral-100 rounded-t-md p-3">
          <UButtonGroup>
            <UInput color="primary" size="md" icon="i-lucide-text" variant="outline"
              :placeholder="$t('tutorial.stepOne.form.addPlaceholder')" class="w-full" v-model="accountName" />
            <UButton icon="i-lucide-circle-plus" color="primary" @click="addAccount" size="md" />
          </UButtonGroup>
        </div>
        <UTable :data="data" :columns="columns" class="flex-1 bg-neutral-100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { useClipboard } from '@vueuse/core'

const accountName = ref('')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()
const addAccount = () => {
  console.log('addAccount')
}

type Payment = {
  id: string
  accountId: string
  isMainAccount: boolean
  currentBalance: number
  name: string
}

const data = ref<Payment[]>([
  {
    id: "0yjX35dYhtkePRXttNFc",
    accountId: "phnLBYYjhH",
    isMainAccount: true,
    currentBalance: 2450.75,
    name: "Compte Principal - CIC"
  },
  {
    id: "H75EiH1Owpf0kwW087eG",
    accountId: "revolut123",
    isMainAccount: false,
    currentBalance: 1250.30,
    name: "Revolut"
  },
  {
    id: "abc123def456",
    accountId: "lcl456",
    isMainAccount: false,
    currentBalance: 5000.00,
    name: "Épargne LCL"
  },
  {
    id: "xyz789uvw012",
    accountId: "credit789",
    isMainAccount: false,
    currentBalance: -125.50,
    name: "Carte de Crédit"
  },
  {
    id: "cash001",
    accountId: "cash123",
    isMainAccount: false,
    currentBalance: 85.25,
    name: "Espèces"
  }
])

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Nom du Compte',
    cell: ({ row }) => row.getValue('name')
  },
  {
    accessorKey: 'isMainAccount',
    header: 'Principal',
    cell: ({ row }) => {
      const isMain = row.getValue('isMainAccount')
      if (isMain) {
        return h(UBadge, {
          class: 'capitalize',
          variant: 'subtle',
          color: 'success'
        }, () => 'Principal')
      }
      return ''
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
]

function getRowItems(row: Row<Payment>) {
  return [
    {
      type: 'label',
      label: 'Actions'
    },
    {
      label: 'Copier l\'ID du compte',
      onSelect() {
        copy(row.original.id)

        toast.add({
          title: 'ID du compte copié !',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Voir les transactions'
    },
    {
      label: 'Modifier le compte'
    },
    {
      label: 'Supprimer le compte',
      onSelect() {
        // TODO: Implémenter la suppression
        toast.add({
          title: 'Fonctionnalité à venir',
          color: 'warning',
          icon: 'i-lucide-alert-triangle'
        })
      }
    }
  ]
}
</script>
