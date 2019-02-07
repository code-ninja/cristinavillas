<template>
<div>
  <hero :title="error.message" />
</div>
</template>

<script>
import Hero from '~/components/Hero.vue'

export default {
  components: {
    Hero
  },
  computed: {
    sitename() {
      return this.$store.getters.getSettingByName('sitename')
    }
  },
  props: ['error'],
  head() {
    return {
      title: this.error.statusCode,
      titleTemplate: this.sitename ? '%s - ' + this.sitename : '%s'
    }
  }
}
</script>
