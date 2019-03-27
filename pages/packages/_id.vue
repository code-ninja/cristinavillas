<template>
  <div>
    <hero :title="name" :img="img.url" />
    <section>
      <div class="container">

        <div class="row justify-content-md-center">
          <div class="col-md-10 col-lg-6 text-center">
            <h2 class="title">{{ name }}</h2>
            <hr />
            <br />
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-8 marked" v-html="marked"></div>
        </div>
      </div>
    </section>

    <packages subtitle="View the other packages that we offer"/>

  </div>
</template>


<script>

import Hero from '~/components/Hero.vue'
import marked from 'marked'
import Packages from '~/components/Packages.vue'


import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  scrollToTop: true,
  components: {
    Hero,
    Packages
  },
  computed: {
    marked() {
      return this.description ? marked(this.description) : ''
    }
  },
  head() {
    return {
      title: this.name,
      meta: [{
          hid: 'description',
          name: 'description',
          content: this.name || ''
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.name || ''
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.name || ''
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: apiUrl + this.img.url
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.name
        }
      ]
    }
  },
  async asyncData({ res, params, error }) {

    try {
      let { data } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
             packages(where:{ slug: "`+params.id+`",published: true}){
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

      if (!data.packages.length)
        throw('')

      return {
        ...data.packages[0]
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
