<template>
  <div>
    <hero title="Packages" bg="home" />
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
          url: '/packages'
        },
        {
          name: 'Weddings',
          url: '/packages/weddings'
        },
        {
          name: 'Team Buildings',
          url: '/packages/team-buildings'
        },
        {
          name: 'Corporate Retreats',
          url: '/packages/retreats'
        }
      ]
    }
  }
}

</script>
