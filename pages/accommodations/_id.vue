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
             rooms(where:{ url: "`+params.id+`",published: true}){
               url
               name
               desc
               img {
                 url
               }
               price
               capacity
             }
          }`
        }
      })

      if (!data.rooms.length)
        throw('')

      return {
        ...data.rooms[0]
      }

    } catch (e) {

      console.log(e)

      error({
        statusCode: 404,
        message: "This room doesn't exist"
      })
    }

  }
}

</script>
