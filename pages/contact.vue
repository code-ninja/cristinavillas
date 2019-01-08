<template>
<div>
  <hero :title="herotitle" :img="hero.url" />

  <section class="contact bg-light-yellow collapse">
    <div class="container p-0">
      <div class="row no-gutters">
        <div class="col-sm-8 col-lg-6">
          <div class="contact-card">
            <h2 class="title">Get in touch</h2>
            <address class="mb-4" v-html="address"></address>
            <div class="title title-6 pr-sm-5">Request for proposals, group and bookings</div>
            <ul class="menu-links">
              <li><a href="tel:(02)6974521">Tel: {{ phone }}</a></li>
              <li><a href="tel:09178664932">Mobile: {{ mobile }}</a></li>
              <li>Fax: 697-5188</li>
              <li class="mt-4"><a :href="'mailto:'+email">Email: {{ email }}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-map-location"></div>
  </section>

</div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Hero
  },
  computed: {
    address() {
      let adr = this.$store.getters.getSettingByName('address')
      return adr.replace(/\n/g,'<br/>')
    },
    phone() {
      return this.$store.getters.getSettingByName('telephone')
    },
    mobile() {
      return this.$store.getters.getSettingByName('mobile')
    },
    fax() {
      return this.$store.getters.getSettingByName('fax')
    },
    email() {
      return this.$store.getters.getSettingByName('email')
    }
  },
  async asyncData ({ req, params, error }) {

    try {

      const { data } = await strapi.request('post','/graphql',{
        data: {
          query: `query {
            mainpages(where: { slug:"/contact", published: true }) {
              slug
              pagetitle
              metadesc
              hero {
                url
              }
              herotitle
              summary
              extras
              images {
                url
              }
             }
          }`
        }
      })

      if (!data.mainpages.length)
        throw('')

      return {
        ...data.mainpages[0]
      }

    } catch (e) {

      error({
        statusCode: 503,
        message: "You're in the right place at the wrong time! Come back later."
      })

    }

  }
}
</script>
