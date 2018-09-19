<template>
  <div class="small">
    <line-chart :chart-data="chartData" :options="{responsive: true, maintainAspectRatio: false, animation: chartAnimation}"></line-chart>
    <button @click="fillData()">Randomize</button>
    <button @click="clearData()">Clear</button>
  </div>
</template>

<script>
  import LineChart from '../components/LineChart.js'
  import axios from 'axios'

  export default {
    components: {
      LineChart
    },
    data() {
      return {
        chartAnimation: false
      }
    },
    computed: {
      chartData() {
        return this.$store.getters.getChart ? this.$store.getters.getChart : {}
      }
    },
    mounted() {
      if (!this.$store.getters.getChart || !this.$store.getters.getChart.datasets.length)
        this.fillData()
    },
    methods: {
      async fillData () {
        this.chartAnimation = true

        try {
          let json = await axios.get('http://localhost:3000/chartData')
          this.$store.commit('fillChart', json.data)
        } catch (e) {

        }


      },
      clearData() {
        this.$store.commit('fillChart',{ labels: [], datasets: []})
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
