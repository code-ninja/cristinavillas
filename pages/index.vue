<template>
<div>
  <hero :title="herotitle" bg="home" :img="hero.url" />
  <section>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">{{ extras.title }}</h2>
          <p class="subtitle">{{ extras.subtitle }}</p>
        </div>
        <div class="col-lg-10">
          <div class="embed-responsive embed-responsive-16by9 my-5">
            <div class="embed-responsive-item"><img :src="extras.img"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <packages />
  <facilities />
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
             }
          }`
        }
      })

      if (data.mainpages.length)
        return data.mainpages[0]

    } catch (e) {
      return {}
    }

  }
}
</script>
