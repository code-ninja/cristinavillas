<template>
<main class="hero flex-column" role="main">

  <figure :style="{ 'background-image': url }"></figure>
  <nuxt-link to="/"><logo type="headerLogo" class="mx-auto" /></nuxt-link>
  <div class="hero-content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <div class="text-center">
            <h1 class="title">{{ title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="top"></div>
</main>
</template>

<style>

#top {
  position: absolute;
  bottom: 400px;
  left: 0;
  height: 10px;
  width: 10px;
}

</style>

<script>
const apiUrl = process.env.API_URL || 'http://localhost:1337'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
    url() {
      return this.img ? 'url('+apiUrl+this.img+')' : ''
    }
  },
  props: ['title','img']
}

</script>
