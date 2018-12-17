<template>
  <div>
    <hero title="Facilities" bg="facilities" />
    <section>
      <div class="container">
        <div class="row justify-content-md-center">
          <nav class="filter-gallery">
            <nuxt-link v-for="category in categories" :key="category.url" :to="category.url">{{ category.name }}</nuxt-link>
          </nav>
        </div>
      </div>
      <nuxt-child />
    </section>

  </div>
</template>

<script>

import Hero from '~/components/Hero.vue'

export default {
  scrollToTop: true,
  components: {
    Hero
  },
  data() {
    return {
      categories: [
        {
          name: 'All',
          url: '/facilities'
        },
        {
          name: 'Hotel & Amenities',
          url: '/facilities/amenities'
        },
        {
          name: 'Rooms & Suites',
          url: '/facilities/suites'
        },
        {
          name: 'Pools',
          url: '/facilities/pools'
        }
      ]
    }
  }
}

</script>
