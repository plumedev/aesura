<template>
  <div>
    <h2 class="text-stone-600 text-2xl font-bold">
      {{ $t('tutorial.stepOne.title') }}
    </h2>

    <p class="text-stone-600 text-md">
      {{ $t('tutorial.stepOne.description') }}
    </p>

    <p class="text-stone-600 text-md">
      {{ $t('tutorial.stepOne.form.addAccountDescription') }}
    </p>

    <div class="w-full space-y-4 pb-4">
      <div class="flex flex-col justify-center pt-4">
        <div
          class="table-header flex flex-row items-center h-auto bg-neutral-100 rounded-t-md p-3"
        >
          <UInput
            color="primary"
            icon="i-lucide-text"
            variant="soft"
            :placeholder="$t('tutorial.stepOne.form.addPlaceholder')"
            class="w-full"
            v-model="accountName"
          />
          <UButton
            icon="i-lucide-circle-plus"
            @click="addAccount"
            size="xl"
            :disabled="!accountName"
            class="max-h-[34px]"
          />
        </div>
        <UTable
          sticky
          :data="accountsData"
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
  import { useGetDocs } from '@/composables/firebase/useGetDocs'
  import { useAddDoc } from '@/composables/firebase/useAddDoc'
  import { useDeleteDoc } from '@/composables/firebase/useDeleteDoc'
  import { useDefineMainAccount } from '@/composables/firebase/useDefineMainAccount'

  const accountName = ref('')
  const UButton = resolveComponent('UButton')
  const UBadge = resolveComponent('UBadge')
  const UDropdownMenu = resolveComponent('UDropdownMenu')

  const accountsCollectionRef = collection(db, 'accounts')

  const toast = useToast()
  const { data: accountsData, isLoading, doRequest: getAccounts } = useGetDocs()
  const { doRequest: addAccountRequest } = useAddDoc()
  const { doRequest: deleteAccountRequest } = useDeleteDoc()
  const { doRequest: defineMainAccountRequest } = useDefineMainAccount()

  const addAccount = async () => {
    addAccountRequest(collection(db, 'accounts'), {
      name: accountName.value,
      isMainAccount: false,
      createdAt: new Date(),
    })
    ;(await getAccounts(accountsCollectionRef)) as Account[]
    await setDefaultMainAccount()
  }

  const deleteAccount = async (accountId: string) => {
    await deleteAccountRequest(accountsCollectionRef, accountId)
    ;(await getAccounts(accountsCollectionRef)) as Account[]
    await setDefaultMainAccount()
  }

  const defineMainAccount = async (accountId: string) => {
    await defineMainAccountRequest(accountsCollectionRef, accountId)
    ;(await getAccounts(accountsCollectionRef)) as Account[]
  }

  const setDefaultMainAccount = async () => {
    if (accountsData.value && accountsData.value.length === 1) {
      const account = accountsData.value[0]
      if (!account.isMainAccount) {
        await defineMainAccount(account.id)
      }
    }
  }

  interface Account {
    id: string
    isMainAccount: boolean
    name: string
    createdAt?: {
      type: 'timestamp'
      seconds: number
      nanoseconds: number
    }
  }

  const columns: TableColumn<DocumentData>[] = [
    {
      accessorKey: 'name',
      header: 'Nom du Compte',
      cell: ({ row }) => row.getValue('name'),
    },
    {
      accessorKey: 'isMainAccount',
      header: 'Principal',
      cell: ({ row }) => {
        const isMain = row.getValue('isMainAccount')
        if (isMain) {
          return h(
            UBadge,
            {
              class: 'capitalize',
              variant: 'subtle',
              color: 'success',
            },
            () => 'Principal'
          )
        }
        return ''
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
        label: 'Supprimer le compte',
        icon: 'i-lucide-trash',
        onSelect() {
          if (row.original.id) {
            deleteAccount(row.original.id)
          }
          toast.add({
            title: 'Compte supprimé avec succès',
            color: 'success',
            icon: 'i-lucide-trash-2',
          })
        },
      },
      {
        label: 'Définir comme principal',
        icon: 'i-lucide-star',
        onSelect() {
          defineMainAccount(row.original.id)
          toast.add({
            title: 'Fonctionnalité à venir',
            color: 'warning',
            icon: 'i-lucide-text',
          })
        },
      },
    ]
  }

  onMounted(async () => {
    ;(await getAccounts(accountsCollectionRef)) as Account[]
    await setDefaultMainAccount()
  })
</script>
