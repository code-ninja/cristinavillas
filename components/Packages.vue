<template>
  <!--Packages-->
  <section class="bg-light-yellow" v-if="packages.length">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-6 text-center">
          <h2 class="title">Packages</h2>
          <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-10 col-sm-12 col-md-10">
          <div class="row mt-4">
            <div class="col-sm-4" v-for="item in packages" :key="item.id">
              <div class="packages-card bg-secondary">
                <nuxt-link :to="'/packages/'+item.slug">
                  <div class="packages-bg">
                    <img :src="url + item.img.url" :alt="item.name">
                  </div>
                    <div class="packages-content">
                      <div class="package-name">{{ item.name }}</div>
                    </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  <!--End of Packages-->
</template>

<script>
const apiUrl = process.env.API_URL || 'http://localhost:1337'

export default {
  props: [
    'subtitle'
  ],
  computed: {
    packages() {
      return this.$store.state.packages || []
    },
    url() {
      return apiUrl
    }
  }
}

</script>
