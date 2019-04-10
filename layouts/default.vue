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

const URL = process.env.SEO_URL || ''

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
      link: [
        {
          rel: 'canonical',
          href: URL + this.$route.path
        }
      ],
      meta: [
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: this.fbAppID || '2342695049293795'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.sitename
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.SEO_URL
        }
      ]
    }
  }
}
</script>
