<template>
<main class="hero flex-column" :class="[ bg ]" role="main">
  <logo color="#fff" class="mx-auto" />
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
</main>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  props: ['title','bg']
}

</script>
