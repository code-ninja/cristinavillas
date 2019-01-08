<template>
<div>
  <hero :title="herotitle" :img="hero.url" />

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
  async asyncData ({ req, params, error }) {

    try {

      const { data } = await strapi.request('post','/graphql',{
        data: {
          query: `query {
            mainpages(where: { slug:"/faqs", published: true }) {
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
            faqs {
              id
              Question
              Answer
            }
          }`
        }
      })

      if (!data.mainpages.length)
        throw('')

      return {
        ...data.mainpages[0],
        faqs: [
          ...data.faqs
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
