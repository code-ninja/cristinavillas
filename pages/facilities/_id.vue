<template>
  <div>
    <hero :title="name" :img="img.url" />
    <section>
      <div class="container">
      </div>
    </section>

  </div>
</template>


<script>

import Hero from '~/components/Hero.vue'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  scrollToTop: true,
  components: {
    Hero
  },
  async asyncData({ res, params, error }) {

    try {
      let { data } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
             facilities(where:{ slug: "`+params.id+`",published: true}){
               name
               slug
               description
               img {
                 url
               }
             }
          }`
        }
      })

      if (!data.facilities.length)
        throw('')

      return {
        ...data.facilities[0]
      }

    } catch (e) {

      //console.log(e)

      error({
        statusCode: 404,
        message: "This package doesn't exist"
      })
    }

  }
}

</script>
