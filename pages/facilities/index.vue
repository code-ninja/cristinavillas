<template>
  <div>
    <hero :title="herotitle" :img="hero.url" />

    <section>

      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-10 col-lg-8 text-center">
            <h2 class="title" v-if="extras && extras.title">{{ extras.title }}</h2>
            <p class="subtitle" v-if="extras && extras.subtitle">{{ extras.subtitle }}</p>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <nuxt-link v-for="(item, index) in facilities" :key="index" :to="'/facilities/'+item.id" class="room-wrapper col-12 col-md-6 col-lg-4 mb-4">
            <div class="room-pic preview-img-item">
              <div :style="{'background-image': 'url('+apiUrl+item.img.url+')' }"></div>
            </div>
              <div class="room-caption">{{ item.name }}</div>
          </nuxt-link>
        </div>
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
  computed: {
    apiUrl() {
      return apiUrl
    }
  },
  data() {
    return {
      lightbox: false,
      imgs: [],
      index: 0
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
             facilities(where: { published: true }) {
               id
               url
               name
               img {
                 url
               }
             }

          }`
        }
      })

      if (data.mainpages.length)
        return {
          ...data.mainpages[0],
          facilities: [
            ...data.facilities
          ]
        }
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
