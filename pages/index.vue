<template>
<div>
  <hero :title="herotitle" bg="home" :img="heroUrl" />
  <section>
    <div class="container">
      <div v-if="extras" class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">{{ extras.title }}</h2>
          <p class="subtitle">{{ extras.subtitle }}</p>
        </div>
        <div class="col-lg-10">
          <div class="embed-responsive embed-responsive-16by9 my-5">
            <div class="embed-responsive-item"><img :src="frontUrl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <packages />
  <facilities v-if="extras && extras.facilities" :text="extras.facilities" />
</div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import Facilities from '~/components/Facilities.vue'
import Packages from '~/components/Packages.vue'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Hero,
    Facilities,
    Packages
  },
  computed: {
    frontUrl() {
      return this.images.length ? apiUrl + this.images[0].url : ''
    },
    heroUrl() {
      return this.hero && this.hero.url ? this.hero.url : ''
    }
  },
  async asyncData({ res, params, error }) {

    try {
      let { data } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            mainpages(where: { slug:"/", published: true }) {
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

      if (data.mainpages.length)
        return data.mainpages[0]
      else
        throw('')

    } catch (e) {

      error({
        statusCode: 503,
        message: "You're in the right place at the wrong time! Come back later."
      })
    }

  }
}
</script>
