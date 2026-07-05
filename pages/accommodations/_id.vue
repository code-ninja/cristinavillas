<template>
<div>
  <hero :title="name" :img="img.url" />

  <section class="p-0 py-md-4">
    <div class="container">
      <div class="row">

        <!--Booking Form-->
        <div class="col-sm-7 col-md-6 order-sm-2">
          <!-- offset-md-1 offset-lg-0-->
          <div class="booking-form" v-if="booked">

            <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Well done!</h4>
              <p>We are processing your booking. Expect an email confirmation within 24 hours</p>
              <hr>
              <p>Feel free to call us for additional information.</p>
              <button type="button" class="btn btn-block btn-lg btn-black" @click="booked = false">Make another booking</button>
            </div>

          </div>
          <div class="booking-form" v-if="!booked">
            <div class="form-group">
              <label>Check-In - Check-Out</label>
              <no-ssr>
                <v-date-picker mode='range' v-model='form.range' :min-date="minDate" :theme-styles='themeStyles' show-caps :disabled-attribute="themeStyles.disabled" popoverVisibility="focus">
                  <div slot-scope="props">
                    <input type="text" class="form-control" :value="props.inputValue" @change.native='props.updateValue($event.target.value);' @focus='started = true' readonly style="background: #fff" />
                  </div>
                </v-date-picker>
                <div slot="placeholder">
                  <input type="text" class="form-control" />
                </div>
              </no-ssr>
            </div>
            <div class="form-group">
              <label for="inputNumberGuest">Number of guest</label>
              <select id="inputNumberGuest" class="form-control custom-select" v-model="form.count">
                <option v-for="(count, index) in guestCount" :key="index">{{ count }}</option>
              </select>
            </div>
            <form @submit.prevent="book" novalidate :class="{ 'was-validated' : validated }">
              <div v-if="started">
                <hr />
                <div class="form-group">
                  <label for="inputName">Full Name</label>
                  <input type="text" ref="inputName" class="form-control" id="inputName" name="name" v-model="form.name" required />
                </div>
                <div class="form-group">
                  <label for="inputEmail">Email</label>
                  <input type="email" ref="inputEmail" class="form-control" id="inputEmail" name="email" v-model="form.email" required />
                </div>
                <div class="form-group">
                  <label for="inputPhone">Phone</label>
                  <input type="tel" ref="inputPhone" class="form-control" id="inputPhone" name="phone" v-model="form.phone" required />
                </div>
              </div>
              <button type="submit" class="btn btn-block btn-lg btn-black" :disabled="booking">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="booking"></span>
                {{ booking ? 'Booking' : started ? 'Submit' : 'Book now' }}
              </button>
              <div class="row justify-content-center" role="alert" v-if="error">Something went wrong, please try again.</div>
            </form>

            <div class="booking-form-list" v-if="!started">
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
              <li>Capacity<div class="specs-value">{{ capacity }}</div>
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
      <slider :images="slides"></slider>
    </div>

  </section>

</div>
</template>


<script>
import Hero from '~/components/Hero.vue'
import Slider from '~/components/Slider.vue'

import marked from 'marked'
import axios from 'axios'
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || 'http://localhost:1337'
const googleDoc = process.env.GOOGLE_DOC || ''

const strapi = new Strapi(apiUrl)
const today = new Date()
const tomorrow = new Date()

tomorrow.setDate(today.getDate() + 1)

export default {
  scrollToTop: false,
  components: {
    Hero,
    Slider
  },
  computed: {
    sitename() {
      return this.$store.getters.getSettingByName('sitename')
    },
    apiUrl() {
      return apiUrl
    },
    marked() {
      return this.notes ? marked(this.notes) : ''
    },
    slides() {
      let items = []
      if (this.img)
        items.push({
          url: this.img.url,
          title: this.name
        })
      for (let i = 0; i < this.images.length; i++)
        items.push({
          url: this.images[i].url,
          title: `${this.name} ${i+1}`
        })

      return items
    }
  },
  data() {
    return {
      error: false,
      started: false,
      booking: false,
      booked: false,
      validated: false,
      guestCount: [1, 2, 3, 4, 5, 6],
      themeStyles: {
        disabled: {
          contentStyle: {
            color: '#fff',
            opacity: 0.3
          }
        },
        wrapper: {
          background: 'linear-gradient(to bottom right, #ff5050, #ff66b3)',
          color: '#fafafa',
          border: '0',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.13)',
          borderRadius: '5px',
        },
        header: {
          color: '#fff',
          padding: '20px 15px'
        },
        headerHorizontalDivider: {
          borderTop: 'solid rgba(255, 255, 255, 0.2) 1px',
          width: '80%',
        },
        weekdays: {
          color: '#fff', // New color
          fontWeight: '600', // And bolder font weight
          padding: '20px 15px 5px 15px'
        },
        weeks: {
          color: '#fff',
          padding: '0 15px 15px 15px'
        },
        dayContent: {
          fontSize: '0.9rem'
        }
      },
      minDate: today,
      form: {
        range: {
          start: today,
          end: tomorrow
        },
        count: 2,
        name: '',
        email: '',
        phone: ''
      }
    }
  },
  head() {
    return {
      title: this.name,
      meta: [{
          hid: 'description',
          name: 'description',
          content: this.desc
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.desc
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.name
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
             rooms(where:{ url: "` + params.id +
            `",published: true}){
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
        throw ('')

      return {
        ...data.rooms[0]
      }

    } catch (e) {

      //console.log(e)

      error({
        statusCode: 404,
        message: "This room doesn't exist"
      })
    }

  },
  methods: {
    validateEmail() {
      let re = /\S+@\S/;
      return re.test(this.form.email);
    },
    async book() {

      this.error = false

      if (!this.started) {
        this.started = true
        this.$nextTick(() => this.$refs.inputName.focus())
        return
      }

      if (!this.form.name) {
        this.validated = true
        this.$nextTick(() => this.$refs.inputName.focus())
        return
      }

      if (!this.validateEmail()) {
        this.validated = true
        this.$nextTick(() => this.$refs.inputEmail.focus())
        return
      }

      if (!this.form.phone) {
        this.validated = true
        this.$nextTick(() => this.$refs.inputPhone.focus())
        return
      }

      this.booking = true

      const startObj = {
        month: this.form.range.start.getMonth() + 1,
        date: this.form.range.start.getDate(),
        year: this.form.range.start.getFullYear()
      }
      const endObj = {
        month: this.form.range.end.getMonth() + 1,
        date: this.form.range.end.getDate(),
        year: this.form.range.end.getFullYear()
      }
      if (startObj.date < 10) startObj.date = `0${startObj.date}`
      if (startObj.month < 10) startObj.month = `0${startObj.month}`
      if (endObj.date < 10) endObj.date = `0${endObj.date}`
      if (endObj.month < 10) endObj.month = `0${endObj.month}`

      let start = `${startObj.year}-${startObj.month}-${startObj.date}`
      let end = `${endObj.year}-${endObj.month}-${endObj.date}`
      let toEmail = this.$store.getters.getSettingByName('email')

      let form = this.form

      try {

        //save on spreadsheet
        if (googleDoc) {
          await axios({
            url: googleDoc,
            method: 'get',
            params: {
              Name: form.name,
              Email: form.email,
              Phone: form.phone,
              Count: form.count,
              Room: this.name,
              Price: this.price,
              Start: start,
              End: end,
              Contacted: 'no',
              Deposit: 'no',
              DateBooked: today.toISOString().slice(0, 10)
            }
          })
        }

        //send an email
        await axios.post('/api/email', {
          type: 'booking',
          name: form.name,
          email: form.email,
          phone: form.phone,
          count: form.count,
          room: this.name,
          price: this.price,
          start: start,
          end: end,
          sitename: this.sitename,
          to: toEmail
        })

      } catch (e) {

        this.booking = false
        this.error = true
        return

      }

      this.booked = true
      this.booking = false
      this.started = false
      this.validated = false
      this.form.name = ''
      this.form.email = ''
      this.form.phone = ''

    }
  }
}
</script>
