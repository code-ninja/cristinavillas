<template>
<div>
  <site-header />
  <nuxt />
  <site-footer />
</div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter
  },
  computed: {
    sitename() {
      return this.$store.getters.getSettingByName('sitename')
    }
  },
  head() {
    return {
      title: this.sitename,
      titleTemplate: '%s - ' + this.sitename
    }
  }
}
</script>
