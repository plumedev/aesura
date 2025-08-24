<template>
  <UCard class="w-full mb-6 bg-neutral-100">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Capturer l'onglet actif -->
      <UTabs v-model="activeTab" :items="frequency" class="w-full" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UInput
          v-model="transactionName"
          :placeholder="
            props.type === TransactionType.INCOME
              ? $t('tutorial.stepThree.form.incomeName')
              : $t('tutorial.stepTwo.form.expenseName')
          "
          variant="outline"
          required
          :icon="
            props.type === TransactionType.INCOME
              ? 'i-lucide-banknote-arrow-up'
              : 'i-lucide-banknote-arrow-down'
          "
        />
        <UInput
          v-model="transactionAmount"
          :placeholder="
            props.type === TransactionType.INCOME
              ? $t('tutorial.stepThree.form.incomeAmount')
              : $t('tutorial.stepTwo.form.expenseAmount')
          "
          type="number"
          step="0.01"
          :min="props.type === TransactionType.INCOME ? '0' : undefined"
          variant="outline"
          required
          icon="i-lucide-euro"
        />
        <UInput
          v-model="transactionDate"
          type="date"
          variant="outline"
          required
        />
        <USelect
          v-model="accountUse"
          :placeholder="
            props.type === TransactionType.INCOME
              ? $t('tutorial.stepThree.form.incomeAccount')
              : $t('tutorial.stepTwo.form.expenseAccount')
          "
          variant="outline"
          required
          icon="i-lucide-piggy-bank"
          :items="accounts"
          :loading="accountsLoading"
          :disabled="accountsLoading"
        />
        <UButton
          type="submit"
          color="primary"
          class="w-fit"
          icon="i-lucide-plus"
          :loading="isCreating"
          :disabled="!isFormValid || isCreating"
        >
          {{
            isCreating
              ? 'Création...'
              : props.type === TransactionType.INCOME
                ? $t('tutorial.stepThree.form.addIncome')
                : $t('tutorial.stepTwo.form.addExpense')
          }}
        </UButton>
      </div>

      <!-- Affichage des erreurs -->
      <div
        v-if="isError"
        class="p-4 bg-red-50 border border-red-200 rounded-md"
      >
        <p class="text-red-800 text-sm">{{ errorMessage }}</p>
      </div>
    </form>
  </UCard>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { collection } from 'firebase/firestore'
  import { db } from '@/plugins/firebase'
  import {
    useGetAccountList,
    type AccountOption,
  } from '@/composables/firebase/useGetAccountList'
  import {
    useCreateTransaction,
    type TransactionData,
  } from '@/composables/firebase/useCreateTransaction'
  import type { TabsItem } from '@nuxt/ui'
  import {
    TransactionType,
    type TransactionTypeValue,
  } from '@/types/transaction'

  // Props
  interface Props {
    type?: TransactionTypeValue
  }

  const props = withDefaults(defineProps<Props>(), {
    type: TransactionType.EXPENSE,
  })

  const { t } = useI18n()

  // Composables
  const { getAccountsList, isLoading: accountsLoading } = useGetAccountList()
  const {
    createTransaction,
    isLoading: isCreating,
    isError,
    errorMessage,
  } = useCreateTransaction()
  const { add: addToast } = useToast()

  const frequency = ref<TabsItem[]>([
    {
      label: t('tutorial.stepTwo.form.type.mensuel'),
      icon: 'i-lucide-dice-4',
      value: '0',
    },
    {
      label: t('tutorial.stepTwo.form.type.hebdomadaire'),
      icon: 'i-lucide-dice-1',
      value: '1',
    },
    {
      label: t('tutorial.stepTwo.form.type.quotidien'),
      icon: 'i-lucide-calendar-days',
      value: '2',
    },
  ])

  // État actif de l'onglet sélectionné
  const activeTab = ref('0')

  // Champs du formulaire
  const transactionName = ref('')
  const transactionAmount = ref<number | ''>('')
  const transactionDate = ref('')
  const accounts = ref<AccountOption[]>([])
  const accountUse = ref<string>('')

  // Validation des champs
  const isFormValid = computed(() => {
    return (
      transactionName.value.trim() !== '' &&
      transactionAmount.value !== '' &&
      transactionAmount.value !== 0 &&
      transactionDate.value !== '' &&
      accountUse.value !== ''
    )
  })

  // Collecte des données du formulaire
  const collectFormData = (): TransactionData => {
    // Utiliser le type défini par la prop
    const amount = Number(transactionAmount.value)
    const finalAmount =
      props.type === TransactionType.INCOME ? Math.abs(amount) : amount

    // Déterminer la fréquence basée sur l'onglet actif
    const frequencyMap = {
      '0': 'monthly',
      '1': 'weekly',
      '2': 'daily',
    }

    return {
      name: transactionName.value.trim(),
      amount: finalAmount,
      type: props.type, // Utiliser la prop
      date: new Date(transactionDate.value),
      accountId: accountUse.value,
      frequency: frequencyMap[activeTab.value as keyof typeof frequencyMap] as
        | 'monthly'
        | 'weekly'
        | 'daily',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  const loadAccounts = async () => {
    const accountsCollectionRef = collection(db, 'accounts')
    const accountsList = await getAccountsList(accountsCollectionRef)
    accounts.value = accountsList
    if (accountsList.length > 0) {
      accountUse.value = accountsList[0].value
    }
  }

  // Gestion de la soumission
  const handleSubmit = async () => {
    if (!isFormValid.value) {
      console.error('Formulaire invalide')
      return
    }

    try {
      const formData = collectFormData()

      // Créer la transaction avec le composable
      await createTransaction(formData)

      // Réinitialiser le formulaire après succès
      resetForm()

      // Toast de succès
      addToast({
        title:
          props.type === TransactionType.INCOME
            ? 'Revenu créé avec succès !'
            : 'Dépense créée avec succès !',
        color: 'success',
        icon: 'i-lucide-check-circle',
      })
    } catch (error) {
      console.error('Erreur lors de la création:', error)

      // Toast d'erreur
      addToast({
        title: 'Erreur lors de la création',
        description: error instanceof Error ? error.message : 'Erreur inconnue',
        color: 'error',
        icon: 'i-lucide-alert-circle',
      })
    }
  }

  // Réinitialisation du formulaire
  const resetForm = () => {
    transactionName.value = ''
    transactionAmount.value = ''
    transactionDate.value = ''
    accountUse.value = accounts.value.length > 0 ? accounts.value[0].value : ''
    activeTab.value = '0'
  }

  // Charger les comptes au montage du composant
  onMounted(() => {
    loadAccounts()
  })
</script>

<style lang="scss"></style>
