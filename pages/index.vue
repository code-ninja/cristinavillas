<template>
<div>
  <hero :title="herotitle" :img="hero.url" />
  <section>
    <div class="container">
      <div v-if="extras" class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">{{ extras.title }}</h2>
          <p class="subtitle">{{ extras.subtitle }}</p>
        </div>
        <div class="col-lg-10">
          <div class="embed-responsive embed-responsive-16by9 my-5">
            <div class="embed-responsive-item">
              <iframe width="560" height="315"
                v-if="videoSrc"
                :src="videoSrc"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
              <img :src="frontUrl" v-else />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <packages :subtitle="extras.packageSubTitle" />
  <!--Facilities-->
  <section>
    <div class="container mb-5">
      <div class="row no-gutters justify-content-md-center">

          <div class="home-facilities text-center text-md-left">
            <div class="row justify-content-center">
              <div class="col-lg-4">
                <h2 class="title">Facilities</h2>
              </div>
              <div class="col-md-8 col-lg-5" v-if="extras.facilitiesSubTitle">
                <p class="subtitle">{{ extras.facilitiesSubTitle }}</p>
              </div>
              <div class="col-sm-auto ml-md-auto">
                <nuxt-link to="facilities" class="btn btn-black">View All</nuxt-link>
              </div>
            </div>

          </div>
        </div>
      </div>

      <slider :images="slides"></slider>

  </section>
  <!--End of Facilities-->

</div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import Packages from '~/components/Packages.vue'
import Slider from '~/components/Slider.vue'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Hero,
    Packages,
    Slider
  },
  computed: {
    videoSrc() {
      if (!(this.extras && this.extras.videoID))
        return ''
      let url = "//www.youtube-nocookie.com/embed/"+this.extras.videoID+"?controls=1&autohide=1;&showinfo=0;modestbranding=1&autoplay=0&rel=0"
      return url
    },
    frontUrl() {
      return this.images.length ? apiUrl + this.images[0].url : ''
    },
    apiUrl() {
      return apiUrl
    },
    slides() {
      let items = []
      for (let i in this.facilities)
        items.push({
          url: this.facilities[i].img.url,
          title: this.facilities[i].name
        })
      return items
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
  async asyncData({ res, params, error }) {

    try {
      let { data } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            mainpages(where: { slug:"/", published: true }) {
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
            facilities(limit: 3, where: { published: true }) {
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

      //console.log(apiUrl, e)

      error({
        statusCode: 503,
        message: "You're in the right place at the wrong time! Come back later."
      })
    }

  }
}
</script>
