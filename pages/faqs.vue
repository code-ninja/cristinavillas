<template>
<div>
  <hero title="Frequently Asked Questions" bg="faqs" />

  <section>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col">
          <h2 class="title">General Questions</h2>
          <div class="faq-list">
            <ul>
              <li v-for="faq in faqs" :key="faq.id">
                <h4>{{ faq.Question }}</h4>
                <p>{{ faq.Answer }}</p>
              </li>
            </ul>
          </div>
        </div>
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
  components: {
    Hero
  },
  async asyncData ({ req, params }) {

    try {

      const response = await strapi.request('post','/graphql',{
        data: {
          query: `query {
            faqs {
              id
              Question
              Answer
            }
          }`
        }
      })

      return response.data

    } catch (e) {

      return { faqs: [] }

    }

  }
}
</script>
