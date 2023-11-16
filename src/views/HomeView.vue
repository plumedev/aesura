<script setup lang="ts">
import { onMounted, ref } from 'vue';
/**  Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
/** Data */
import transactions from "@/data/transactions.json";

/** Utils */
import { getRevenus, getDepenses } from '@/utils/transactionUtils';
/** Vue chart.js */
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

const getChartData = () => {
  let chartDataDepense: number = 0;
  let chartDataRevenus: number = 0;

  getRevenus().forEach(element => {
    chartDataRevenus = chartDataRevenus + element.montant;
  });

  getDepenses().forEach(element => {
    chartDataDepense = chartDataDepense + element.montant;
  });

  const chartDatas: [number, number] = [chartDataRevenus, chartDataDepense];
  return chartDatas
}

const chartDatas = ref(getChartData());

onMounted(() => {
  getRevenus();
  getDepenses();
});

const chartData = ref({
  labels: ['Revenus', 'Dépenses'],
  datasets: [{
    data: getChartData(), // Exemple: 5000€ pour les revenus, 3000€ pour les dépenses
    backgroundColor: ['#2CB67D', '#E16162'],
    borderColor: [
      '#001E1D',
    ],
    borderWidth: 2
  }],
});

const options = ref({
  scales: {
    x: {
      display: false, // Masquer l'axe X complètement
    },
    y: {
      display: false, // Masquer l'axe Y complètement
    },
  },
  plugins: {
    legend: {
      display: false, // Masquer la légende
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
        return Math.ceil(value) + ' €'; // Affiche la valeur
      },
  },
  layout: {
    padding: 0, // Pas de padding
  },
  elements: {
    line: {
      borderWidth: 10, // Pas de bordure de ligne
    },
  },
}});


library.add(faXmark, faArrowLeft, faArrowRight);
</script>

<template>
  <main class="d-flex justify-content-center align-items-center flex-column">

    <div id="transactions-list" class="w-100" v-if="transactions.length > 0">
      <div class="row">
        <div class="col-4">
          <h2 class="text-center">Revenus</h2>
          <div class="transaction-item" v-for="revenu in getRevenus()" :key="revenu.id">
            <span class="type revenu">
            </span>
            <span class="name">
              {{ revenu.nom }}
            </span>
            <span class="amount">
              {{ revenu.montant }}€
            </span>
          </div>
        </div>
        <div class="col-4">
          <h2 class="text-center">Dépenses</h2>
          <div class="transaction-item" v-for="depense in getDepenses()" :key="depense.id">
            <span class="type depense">
            </span>
            <span class="name">
              {{ depense.nom }}
            </span>
            <span class="amount">
              {{ depense.montant }}€
            </span>
          </div>
        </div>
        <div class="col-4">
          <div class="card w-100 h-100" style="width: 18rem;">
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
        </div>
      </div>
    </div>

    <div v-else>
      <p>
        Il semblerait que vous n’ayez pas encore renseigné de dépenses/revenus récurrent(e)s.
      </p>
      <p>Commencez dès maintenant !</p>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTransactionForm"
      >
        Ajouter ma première transaction
      </button>
    </div>

    



    <!-- Modal -->
    <div
      class="modal fade"
      id="addTransactionForm"
      tabindex="-1"
      aria-labelledby="addTransactionFormLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="addTransactionFormLabel">Ajouter une transaction</h3>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              class="btn btn-link btn-sm"
            >
              <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  min-height: calc(100vh - 92px);
  max-width: 1140px;
  width: 100%;
}
</style>
