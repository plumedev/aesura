<template>
  <div>
    <h2 class="text-stone-600 text-2xl font-bold">
      {{ $t('tutorial.stepTwo.title') }}
    </h2>

    <p class="text-stone-600 text-md">
      {{ $t('tutorial.stepTwo.description') }}
    </p>

    <TransactionForm />

    <div class="w-full space-y-4 pb-4">
      <div class="flex flex-col justify-center pt-4">
        <UTable
          sticky
          :data="transactionsData"
          :columns="columns"
          :loading="isLoading"
          loading-color="primary"
          loading-animation="swing"
          class="flex-1 max-h-[325px] bg-neutral-100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { h, resolveComponent } from 'vue'
  import type { TableColumn } from '@nuxt/ui'
  import type { Row } from '@tanstack/vue-table'
  import { collection, type DocumentData } from 'firebase/firestore'
  import { db } from '@/plugins/firebase'
  import {
    useGetTransactions,
    type Transaction,
  } from '@/composables/firebase/useGetTransactions'
  import { useDeleteDoc } from '@/composables/firebase/useDeleteDoc'
  import TransactionForm from '@/components/shared/TransactionForm.vue'

  const UButton = resolveComponent('UButton')
  const UBadge = resolveComponent('UBadge')
  const UDropdownMenu = resolveComponent('UDropdownMenu')

  const transactionsCollectionRef = collection(db, 'transactions')

  const toast = useToast()
  const { transactionsData, isLoading, getTransactions } = useGetTransactions()
  const { doRequest: deleteTransactionRequest } = useDeleteDoc()

  const deleteTransaction = async (transactionId: string) => {
    await deleteTransactionRequest(transactionsCollectionRef, transactionId)
    await getTransactions(transactionsCollectionRef)
    toast.add({
      title: 'Transaction supprimée avec succès',
      color: 'success',
      icon: 'i-lucide-trash-2',
    })
  }

  const columns: TableColumn<DocumentData>[] = [
    {
      accessorKey: 'name',
      header: 'Nom de la Transaction',
      cell: ({ row }) => row.getValue('name'),
    },
    {
      accessorKey: 'amount',
      header: 'Montant',
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number
        const type = row.getValue('type') as string
        const color = type === 'income' ? 'success' : 'error'
        const icon =
          type === 'income' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'

        return h('div', { class: 'flex items-center gap-2' }, [
          h(
            'span',
            { class: `text-${color}-600 font-semibold` },
            `${amount > 0 ? '+' : ''}${amount.toFixed(2)} €`
          ),
          h('i', { class: icon }),
        ])
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('type') as string
        const color = type === 'income' ? 'success' : 'error'
        const label = type === 'income' ? 'Revenu' : 'Dépense'

        return h(
          UBadge,
          {
            class: 'capitalize',
            variant: 'subtle',
            color: color,
          },
          () => label
        )
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = row.getValue('date')
        if (date && typeof date === 'object' && 'toDate' in date) {
          return (date as any).toDate().toLocaleDateString('fr-FR')
        } else if (date) {
          return new Date(date as string | number).toLocaleDateString('fr-FR')
        }
        return ''
      },
    },
    {
      accessorKey: 'frequency',
      header: 'Fréquence',
      cell: ({ row }) => {
        const frequency = row.getValue('frequency') as string
        const frequencyMap = {
          monthly: 'Mensuel',
          weekly: 'Hebdomadaire',
          daily: 'Quotidien',
        }
        return frequencyMap[frequency as keyof typeof frequencyMap] || frequency
      },
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
                align: 'end',
              },
              items: getRowItems(row),
              'aria-label': 'Actions dropdown',
            },
            () =>
              h(UButton, {
                icon: 'i-lucide-ellipsis-vertical',
                color: 'neutral',
                variant: 'ghost',
                class: 'ml-auto',
                'aria-label': 'Actions dropdown',
              })
          )
        )
      },
    },
  ]

  const getRowItems = (row: Row<DocumentData>) => {
    return [
      {
        label: 'Supprimer la transaction',
        icon: 'i-lucide-trash',
        onSelect() {
          if (row.original.id) {
            deleteTransaction(row.original.id)
          }
        },
      },
    ]
  }

  onMounted(async () => {
    await getTransactions(transactionsCollectionRef)
  })
</script>
