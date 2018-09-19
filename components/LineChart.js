import {
  Line,
  mixins
} from 'vue-chartjs'
const {
  reactiveProp
} = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  watch: {
    options() {
      if (this.options.animation === true)
        this.options.animation = {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      this.renderChart(this.chartData, this.options);
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
