<template>
<div>
  <hero :title="herotitle" :img="hero.url" />

  <section>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">Resort Time</h2>
          <div class="resort-time d-flex justify-content-center">
            <ul class="rates-card-specs">
              <li>Day Time<div class="specs-value">{{ daytime }}</div>
              </li>
              <li>Night Time<div class="specs-value">{{ nighttime }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr>

      <!--Rates-->
      <div class="row my-5 justify-content-center">
        <div class="col-sm-10">
          <h2 class="title text-center text-lg-left">Rates</h2>


          <div class="row">
            <div class="col-lg-6"  v-for="rate in entrance" :key="rate.id">
              <div class="card rates-card">
                <div class="rate-type">{{ rate.name }}</div>
                <ul class="rates-card-specs">
                  <li>Day Time<div class="specs-value">₱{{ rate.day }}</div>
                  </li>
                  <li>Night Time<div class="specs-value">₱{{ rate.night }}</div>
                  </li>
                  <li>Day &amp; Night<div class="specs-value">₱{{ rate.daynight }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!--End Rates-->

      <!--Cottages-->
      <div class="row my-5 justify-content-center">
        <div class="col-md-10">
          <h2 class="title text-center text-lg-left">Cottages</h2>

          <div class="row">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Day (₱)</th>
                    <th scope="col">Night (₱)</th>
                    <th scope="col">Day &amp; Night (₱)</th>
                    <th scope="col">Excess</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="rate in cottages" :key="rate.id">
                    <td>{{ rate.name }} ({{ rate.count }} units)</td>
                    <td>{{ rate.capacity }}</td>
                    <td>{{ rate.day }}</td>
                    <td>{{ rate.night }}</td>
                    <td>{{ rate.daynight }}</td>
                    <td>{{ rate.excess }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--End Rates-->

      <!--Rates-->
      <div class="row my-5 justify-content-center">
        <div class="col-sm-10">
          <div class="row">
            <div class="col-lg-6"  v-for="rate in special" :key="rate.id">
              <div class="card rates-card">
                <div class="rate-type">{{ rate.name }}</div>
                <ul class="rates-card-specs">
                  <li>Rate<div class="specs-value">₱{{ rate.day }}</div>
                  </li>
                  <li v-if="rate.excess">Excess<div class="specs-value">₱{{ rate.excess }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!--End Rates-->

      <hr />

      <!--Rules-->
      <div class="row my-5 justify-content-center">
        <div class="col-md-10">
          <h2 class="title text-center text-lg-left">Rules &amp; Regulations</h2>

          <div class="row">
            <div class="col">
              <div class="bullet-list" v-html="marked"></div>
            </div>
          </div>
        </div>
      </div>
      <!--End Rules-->



    </div>
  </section>

</div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import marked from 'marked'

import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Hero
  },
  computed: {
    marked() {
      return this.summary ? marked(this.summary) : ''
    },
    entrance() {
      return this.rates.length ? this.rates.filter((rate) => rate.ratetype == 'Entrance') : []
    },
    cottages() {
      return this.rates.length ? this.rates.filter(rate => rate.ratetype == 'Cottage') : []
    },
    special() {
      return this.rates.length ? this.rates.filter(rate => rate.ratetype == 'Special') : []
    },
    daytime() {
      return this.$store.getters.getSettingByName('daytime')
    },
    nighttime() {
      return this.$store.getters.getSettingByName('nighttime')
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
    req,
    params,
    error
  }) {

    try {

      const {
        data
      } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            mainpages(where: { slug:"/rates", published: true }) {
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
             rates(where:{publish: true}) {
               id
               name
               count
               capacity
               day
               night
               daynight
               excess
               ratetype
             }
          }`
        }
      })

      //console.log(data)

      if (!data.mainpages.length)
        throw ('')

      return {
        ...data.mainpages[0],
        rates: data.rates ? data.rates : []
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
