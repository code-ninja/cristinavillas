<template>
<div class="travel-advisory">
  
  <div class="alert d-flex justify-content-between shadow">
    <div class="d-flex align-items-center">
      <div class="alert-icon">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 33">
          <g clip-path="url(#clip0)">
            <path d="M16 .5C7.164.5 0 7.664 0 16.5s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zm-.001 7.667c.92 0 1.668.746 1.668 1.666a1.666 1.666 0 11-1.668-1.667zM18.667 24.5h-5.334v-1.333c.646-.239 1.334-.268 1.334-.98V16.23c0-.712-.688-.824-1.334-1.063v-1.333h4v8.353c0 .713.69.744 1.334.98V24.5z" fill="#000"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <path fill="#fff" transform="translate(0 .5)" d="M0 0h32v32H0z"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="alert-content">
        <div class="alert-heading">Covid-19 Updates</div>
        <p class="m-0">Our flexible policies, health and safety protocols. <nuxt-link :to="'/advisory/'"><strong>Learn more</strong></nuxt-link></p>
      </div>
    </div>
    <button type="button" class="close align-self-baseline" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <hero :title="herotitle" :img="hero.url" />
  <section>
    <div class="container">
      <div v-if="extras" class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">{{ extras.title }}</h2>
          <p class="subtitle">{{ extras.subtitle }}</p>
        </div>

        <LazyHydrate class="col-lg-10" v-if="videoSrc">
          <div class="embed-responsive embed-responsive-16by9 my-5">
            <div class="embed-responsive-item">
              <object :data="videoSrc" :alt="pagetitle+' video'"></object>
            </div>
          </div>
        </LazyHydrate>

      </div>
    </div>
  </section>
  <packages :subtitle="extras.packageSubTitle" limit="3" />
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
                <nuxt-link to="facilities" class="btn btn-black" aria-label="View All">View All</nuxt-link>
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
import LazyHydrate from 'vue-lazy-hydration'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Hero,
    Packages,
    Slider,
    LazyHydrate
  },
  computed: {
    videoSrc() {
      if (!(this.extras && this.extras.videoID))
        return ''
      let url = "//www.youtube-nocookie.com/embed/"+this.extras.videoID+"?controls=1&autohide=1;&showinfo=0;modestbranding=1&autoplay=0&rel=0"
      return url
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
        content: this.metadesc ? this.metadesc : ''
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: this.metadesc ? this.metadesc : ''
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
