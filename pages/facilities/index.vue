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

      <div class="masonry-gallery">
        <masonry
        :cols="{default: 4, 1000: 3, 700: 2}"
        :gutter="{default: '16px', 400: '10px'}"
        >
          <div class="image-item" v-for="(image, index) in items" :key="index">
            <img :src="image" />
          </div>
        </masonry>
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
  data() {
    return {
      index: 0,
      visible: false,
      items: [
        'img/cv-facilities-gallery-1.jpg',
        'img/cv-facilities-gallery-2.jpg',
        'img/cv-facilities-gallery-3.jpg',
        'img/cv-facilities-gallery-4.jpg',
        'img/cv-facilities-gallery-5.jpg',
        'img/cv-facilities-gallery-6.jpg',
        'img/cv-facilities-gallery-7.jpg',
        'img/cv-facilities-gallery-8.jpg',
        'img/cv-facilities-gallery-9.jpg',
        'img/cv-facilities-gallery-10.jpg'
      ]
    }
  },
  head() {
    return {
      title: this.pagetitle,
      meta: [
      {
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

  },
  methods: {
    handleHide() {
      this.visible = false
    }
  }

}

</script>
