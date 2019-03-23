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

      <div class="booking-room-slider">
        <slider :images="slides"></slider>
      </div>

    </section>

  </div>
</template>


<script>

import Hero from '~/components/Hero.vue'
import Slider from '~/components/Slider.vue'
import marked from 'marked'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  scrollToTop: true,
  components: {
    Hero,
    Slider
  },
  computed: {
    apiUrl() {
      return apiUrl
    },
    marked() {
      return this.bigdesc ? marked(this.bigdesc) : ''
    },
    slides() {
      let items = []

      if (this.img)
        items.push({
          url: this.img.url,
          title: this.name
        })

      for (let i=0; i < this.gallery.length; i++)
        items.push({
          url: this.gallery[i].url,
          title: `${this.name} ${i+1}`
        })

      return items
    }
  },
  async asyncData({ res, params, error }) {

    try {
      let { data } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
             facilities(where:{ id: "`+params.id+`",published: true}){
               name
               url
               bigdesc
               img {
                 url
               }
               gallery {
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
