<template>
<div>
  <hero :title="herotitle" :img="hero.url" />

  <section class="contact bg-light-yellow collapse">
    <div class="container p-0">
      <div class="row no-gutters">
        <div class="col-sm-8 col-lg-6">
          <div class="contact-card">
            <h2 class="title">Get in touch</h2>
            <div class="title title-6 pr-sm-5">Request for proposals, group and bookings</div>

            <div class="alert alert-success" role="alert" v-if="sent">
              <h4 class="alert-heading">Well done!</h4>
              <p>We are processing your message. Expect an email confirmation within 24 hours</p>
              <hr>
              <p>Feel free to call us for additional information.</p>
              <button type="button" class="btn btn-block btn-lg btn-black" @click="sent = false">Send another message</button>
            </div>


            <form @submit.prevent="send" v-if="!sent">
              <div class="form-group">
                <input type="text" class="form-control" ref="inputName" id="inputName" placeholder="Name" v-model="form.name" required>
              </div>
              <div class="form-row">
              <div class="form-group col-md-6">
                <input type="email" class="form-control" ref="inputEmail" id="inputEmail" placeholder="Email" v-model="form.email" required>
              </div>
              <div class="form-group col-md-6">
                <input type="tel" class="form-control" ref="inputPhone" id="inputPhone" placeholder="Phone" v-model="form.phone" required>
              </div>
            </div>
            <div class="form-group">
              <label for="inputMessage">Message</label>
              <textarea class="form-control" id="inputMessage" ref="inputMessage" rows="5" v-model="form.message" required></textarea>
            </div>
              <button type="submit" class="btn btn-block btn-lg btn-black" :disabled="sending">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="sending"></span>
                {{ sending ? 'Sending' : 'Submit' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-map-location"></div>
  </section>

</div>
</template>

<script>
import axios from 'axios'

import Hero from '~/components/Hero.vue'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)


export default {
  components: {
    Hero
  },
  computed: {
    sitename() {
      return this.$store.getters.getSettingByName('sitename')
    },
    address() {
      let adr = this.$store.getters.getSettingByName('address')
      return adr.replace(/\n/g, '<br/>')
    },
    phone() {
      return this.$store.getters.getSettingByName('telephone')
    },
    mobile() {
      return this.$store.getters.getSettingByName('mobile')
    },
    fax() {
      return this.$store.getters.getSettingByName('fax')
    },
    email() {
      return this.$store.getters.getSettingByName('email')
    },
    validEmail() {
      let re = /\S+@\S/;
      return re.test(this.form.email);
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

      const {
        data
      } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            mainpages(where: { slug:"/contact", published: true }) {
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
        throw ('')

      return {
        ...data.mainpages[0]
      }

    } catch (e) {

      error({
        statusCode: 503,
        message: "You're in the right place at the wrong time! Come back later."
      })

    }

  },
  data() {
    return {
      sending: false,
      sent: false,
      form: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  methods: {
    send() {

      let { name, email, phone, message } = this.form;

      if (!name) {
        this.$nextTick(() => this.$refs.inputName.focus())
        return
      }

      if (!email || !this.validEmail) {
        this.$nextTick(() => this.$refs.inputEmail.focus())
        return
      }
      if (!phone) {
        this.$nextTick(() => this.$refs.inputPhone.focus())
        return
      }

      if (!message) {
        this.$nextTick(() => this.$refs.inputMessage.focus())
        return
      }

      this.sending = true

      axios.post(apiUrl + '/email', {
        from: `${this.form.name} <info@fbmgroup.co>`,
        to: `FBM Sales Team <info@fbmgroup.co>`,
        replyTo: `${this.form.name} <${this.form.email}>`,
        subject: `Hello from ${this.form.name}`,
        html: `
          Name: ${this.form.name} <br/>
          Email: ${this.form.email} <br/>
          Phone: ${this.form.phone} <br />
          Site: ${this.sitename} <br />
          ${this.form.message}
          `
      }).then(() => {
        this.sent = true
        this.sending = false
        this.form.name = ''
        this.form.email = ''
        this.form.phone = ''
        this.form.message = ''
      })



    }
  }
}
</script>
