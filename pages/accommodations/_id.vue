<template>
  <div>
    <hero :title="name" :img="img.url" />

    <section class="p-0 py-md-4">
      <div class="container">
        <div class="row">

          <!--Booking Form-->
          <div class="col-sm-7 col-md-6 order-sm-2">
            <!-- offset-md-1 offset-lg-0-->
            <div class="booking-form">
              <form @submit.prevent="book">
                <div class="form-row">
                  <div class="form-group col-6">
                    <label for="inputCheckIn">Check-In</label>
                    <datetime :auto="true" :min-datetime="form.from" v-model="form.from" input-class="form-control"></datetime>
                  </div>
                  <div class="form-group col-6">
                    <label for="inputCheckOut">Check-Out</label>
                    <datetime :auto="true" :min-datetime="form.to" v-model="form.to" input-class="form-control"></datetime>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputNumberGuest">Number of guest</label>
                  <select id="inputState" class="form-control custom-select">
                    <option v-for="(count, index) in guestCount" :key="index" :selected="count==2">{{ count }}</option>
                  </select>
                </div>
                <button type=" submit" class="btn btn-block btn-lg btn-black">Book Now</button>
              </form>

              <div class="booking-form-list">
                <ul>
                  <li>Price is subject to change without prior notice.</li>
                  <li>Check-in time is 2:00 PM</li>
                  <li>Check-out is 12:00 NOON the next day</li>
                </ul>
              </div>
            </div>
          </div>
          <!--End Booking Form-->

          <!--Booking Room Details-->
          <div class="col-sm-5 col-md-6">
            <div class="booking-room-details">
              <ul class="booking-room-specs">
                <li>Per night<div class="specs-value">Php {{ price }}</div>
                </li>
                <li>Capacity<div class="specs-value">{{ capacity }} Guests</div>
                </li>
                <li v-if="size">Room Size<div class="specs-value">{{ size }}</div>
                </li>
              </ul>
              <hr>
            </div>

            <div class="booking-notes" v-if="notes">
              <div class="list-title">Notes</div>
              <div class="marked" v-html="marked"></div>
            </div>
          </div>
          <!--End Booking Room Details-->
        </div>
      </div>

      <div class="booking-room-slider">
        <slider>
          <div class="swiper-slide" v-for="image in images" :key="image.url">
            <img :src="apiUrl+ image.url" />
          </div>
        </slider>
      </div>

    </section>

  </div>
</template>


<script>

import Hero from '~/components/Hero.vue'
import Slider from '~/components/Slider.vue'
import marked from 'marked'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'


import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

const today = new Date().toISOString()
const tom = new Date()
tom.setDate(tom.getDate()+1)
const tomorrow = tom.toISOString()



export default {
  scrollToTop: false,
  components: {
    Hero,
    Slider,
    Datetime
  },
  computed: {
    apiUrl() {
      return apiUrl
    },
    marked() {
      return this.notes ? marked(this.notes) : ''
    },
    to() {
      let tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate()+1)
      return tomorrow.toISOString()
    }
  },
  data() {
    return {
      guestCount: [1,2,3,4,5,6],
      form: {
        from: today,
        to: tomorrow
      }
    }
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
               images {
                 url
               }
               notes
               size
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

  },
  methods: {
    book() {

    }
  }
}

</script>
