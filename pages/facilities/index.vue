<template>
  <div>
    <hero :title="herotitle" :img="hero.url" />

    <section>
      <div class="container">
        <!-- <div class="row justify-content-md-center">
          <nav class="filter-gallery">
            <nuxt-link v-for="category in categories" :key="category.url" :to="category.url">{{ category.name }}</nuxt-link>
          </nav>
        </div> -->
      </div>
      <nuxt-child />

      <div class="masonry-gallery">
        <masonry
        :cols="{default: 4, 1000: 3, 700: 2}"
        :gutter="{default: '16px', 400: '10px'}"
        >
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-1.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-front-building.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-2.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-3.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-4.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-5.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-6.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-faq-hero.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-7.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-8.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-9.jpg"></div>
          <div class="image-item"><img src="~assets/img/cv-facilities-gallery-10.jpg"></div>
        </masonry>
      </div>
    </section>
  </div>
</template>

<script>

import Hero from '~/components/Hero.vue'

import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry);

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  scrollToTop: true,
  components: {
    Hero
  },
  // data() {
  //   return {
  //     categories: [
  //       {
  //         name: 'All',
  //         url: '/facilities'
  //       },
  //       {
  //         name: 'Hotel & Amenities',
  //         url: '/facilities/amenities'
  //       },
  //       {
  //         name: 'Rooms & Suites',
  //         url: '/facilities/suites'
  //       },
  //       {
  //         name: 'Pools',
  //         url: '/facilities/pools'
  //       }
  //     ]
  //   }
  // }
  async asyncData ({ req, params, error }) {

    try {

      const { data } = await strapi.request('post','/graphql',{
        data: {
          query: `query {
            mainpages(where: { slug:"/facilities", published: true }) {
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
        ...data.mainpages[0],
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
