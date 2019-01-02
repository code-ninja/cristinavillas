<template>
  <div>
    <hero :title="id" />
    <section>
      <div class="container">
      </div>
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
  asyncData({ params }) {
    return params
  }
}

</script>
