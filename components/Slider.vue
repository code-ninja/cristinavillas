<template>
<div class="swiper-container" :style="{'visibility': ready ? 'visible' : 'hidden'}">
  <div class="swiper-wrapper">
    <slot />
  </div>
</div>
</template>

<script>
import Swiper from 'swiper'

export default {
  mounted() {
    this.recreateSwiper()
  },
  destroyed() {
    this.swiper.destroy(true, false)
  },
  data() {
    return {
      swiper: null,
      ready: false
    }
  },
  methods: {
    recreateSwiper() {

      this.swiper = new Swiper(this.$el, {
        slidesPerView: 'auto',
        parallax: false,
        spaceBetween: 30,
        centeredSlides: true
      })

      this.swiper.on('init', this.ready = true)

    }
  }
}
</script>
