<template>
<div>
  <hero :title="herotitle" :img="hero.url" />

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
  async asyncData ({ req, params, error }) {

    try {

      const { data } = await strapi.request('post','/graphql',{
        data: {
          query: `query {
            mainpages(where: { slug:"/gallery", published: true }) {
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
             galleries(where: { published: true }) {
               name
               img {
                 url
               }
             }
          }`
        }
      })

      if (!data.mainpages.length)
        throw('')

      return {
        ...data.mainpages[0],
        galleries: [
          ...data.galleries
        ]
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
