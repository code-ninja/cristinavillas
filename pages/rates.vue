<template>
<div>
  <hero :title="herotitle" :img="hero.url" />

  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 marked" v-html="marked">Resort Time</div>
      </div>
    </div>
  </section>

</div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import marked from 'marked'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Hero
  },
  computed: {
    marked() {
      return this.summary ? marked(this.summary) : ''
    }
  },
  head() {
    return {
      title: this.pagetitle,
      meta: [{
          hid: 'description',
          name: 'description',
          content: this.metadesc
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metadesc
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.pagetitle
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: apiUrl + this.hero.url
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.herotitle
        }
      ]
    }
  },
  async asyncData({
    req,
    params,
    error
  }) {

    try {

      const {
        data
      } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            mainpages(where: { slug:"/rates", published: true }) {
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
        throw ('')

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
