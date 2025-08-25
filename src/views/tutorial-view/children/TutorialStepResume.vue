<template>
  <h2 class="text-stone-600 text-2xl font-bold">
    {{ $t('tutorial.stepResume.title') }}
  </h2>

  <p>
    {{ $t('tutorial.stepResume.description') }}
  </p>

  <div class="flex flex-row gap-4 w-full pb-4">
    <UCard variant="soft" class="w-1/3 bg-neutral-100">
      <h3 class="text-stone-600 text-lg font-bold">
        {{ $t('tutorial.stepResume.form.expense') }}
      </h3>
      <div v-if="isLoading" class="flex justify-center">
        <UIcon
          name="i-heroicons-arrow-path"
          class="animate-spin h-6 w-6"
          :title="$t('tutorial.stepResume.form.loading')"
        />
      </div>
      <p v-else class="text-error-400 text-2xl font-bold">
        {{ formatCurrency(resumeData.expenses) }}
      </p>
    </UCard>

    <UCard variant="soft" class="w-1/3 bg-neutral-100">
      <h3 class="text-stone-600 text-lg font-bold">
        {{ $t('tutorial.stepResume.form.income') }}
      </h3>
      <div v-if="isLoading" class="flex justify-center">
        <UIcon
          name="i-heroicons-arrow-path"
          class="animate-spin h-6 w-6"
          :title="$t('tutorial.stepResume.form.loading')"
        />
      </div>
      <p v-else class="text-primary-500 text-2xl font-bold">
        {{ formatCurrency(resumeData.incomes) }}
      </p>
    </UCard>

    <UCard variant="soft" class="w-1/3 bg-neutral-100">
      <h3 class="text-stone-600 text-lg font-bold">
        {{ $t('tutorial.stepResume.form.total') }}
      </h3>
      <div v-if="isLoading" class="flex justify-center">
        <UIcon
          name="i-heroicons-arrow-path"
          class="animate-spin h-6 w-6"
          :title="$t('tutorial.stepResume.form.loading')"
        />
      </div>
      <p v-else class="text-primary-600 text-2xl font-bold">
        {{ formatCurrency(resumeData.total) }}
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  import { useGetResumeData } from '../composables/useGetResumeData'
  import { formatCurrency } from '@/helpers/StringFormat.helper'
  import { onMounted } from 'vue'

  const { resumeData, isLoading, calculateResumeData } = useGetResumeData()

  onMounted(async () => {
    await calculateResumeData()
  })
</script>
