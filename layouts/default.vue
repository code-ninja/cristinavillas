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
    },
    fbAppID() {
      return this.$store.getters.getSettingByName('fb_app_id')
    }
  },
  head() {
    return {
      title: this.sitename,
      titleTemplate: '%s - ' + this.sitename,
      meta: [
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: this.fbAppID || '2342695049293795'
        }
      ]
    }
  }
}
</script>
