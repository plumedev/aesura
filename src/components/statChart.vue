<script setup lang="ts">
import { onMounted, ref } from 'vue'
/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowLeft, faArrowRight)
/** Utils */
import { getRevenus, getDepenses } from '@/utils/transactionUtils'

/** Vue chart.js */
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(ChartDataLabels)
const getChartData = () => {
  let chartDataDepense: number = 0
  let chartDataRevenus: number = 0

  getRevenus().forEach((element) => {
    chartDataRevenus = chartDataRevenus + element.montant
  })

  getDepenses().forEach((element) => {
    chartDataDepense = chartDataDepense + element.montant
  })

  const chartDatas: [number, number] = [chartDataRevenus, chartDataDepense]
  return chartDatas
}

const chartDatas = ref(getChartData())

onMounted(() => {
  getRevenus()
  getDepenses()
})

const chartData = ref({
  labels: ['Revenus', 'Dépenses'],
  datasets: [
    {
      data: getChartData(),
      backgroundColor: ['#2CB67D', '#E16162'],
      borderColor: ['#001E1D'],
      borderWidth: 2
    }
  ]
})

const options = ref({
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  },
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      align: 'end',
      anchor: 'end',
      color: '#ffffff',
      font: {
        weight: 'bold',
        family: 'proxima-nova',
        size: '18px'
      }, // Couleur du texte
      formatter: (value: number) => {
        return Math.ceil(value) + ' €'
      }
    },
    layout: {
      padding: 0
    },
    elements: {
      line: {
        borderWidth: 10
      }
    }
  }
})
</script>

<template>
  <div class="card w-100" style="width: 18rem">
    <div class="card-body d-flex flex-column align-items-center">
      <div id="month-selector" class="d-flex align-items-center justify-content-evenly">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        <h3 class="card-title text-light">Novembre</h3>
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </div>

      <BarChart :chart-data="chartData" :options="options" />

      <h3 class="text-light mt-4">Budget disponible</h3>
      <h5 class="text-light-green">104€</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
