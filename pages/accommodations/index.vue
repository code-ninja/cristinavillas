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
        <div v-for="room in rooms" :key="room.url" class="room-wrapper col-12 col-md-6 col-lg-4 mb-4">
          <nuxt-link :to="'/accommodations/'+room.url" class="room-pic">
            <div :style="{'background-image': 'url('+apiUrl + room.img.url+')' }"></div>
          </nuxt-link>
          <div class="room-details">
            <div class="room-name">{{ room.name }}</div>
            <p class="d-none">{{ room.desc }}</p>
            <div class="room-specs">
              <div class="row">
                <div class="col-md mb-3 mb-md-0">
                  <div class="room-price">Php {{ room.price }}</div>
                  <div>Capacity: {{ room.capacity }}</div>
                </div>
                <div class="col-auto">
                  <nuxt-link :to="'/accommodations/'+room.url" class="btn btn-black">Book Now</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>

  <packages />

</div>
</template>

<script>
import Hero from '~/components/Hero.vue'
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
    apiUrl() {
      return apiUrl
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
    res,
    params,
    error
  }) {

    try {
      let {
        data
      } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            mainpages(where: { slug:"/accommodations", published: true }) {
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
             rooms(where:{ published: true}){
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

      if (!data.mainpages.length)
        throw ('')

      return {
        ...data.mainpages[0],
        rooms: [
          ...data.rooms
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
