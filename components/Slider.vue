<template>
<div class="swiper-container" :style="{ 'visibility': ready ? 'visible': 'hidden'}">
  <div class="swiper-wrapper">
    <slot />
  </div>
  <slot name="after-wrapper" />
</div>
</template>

<script>
import Swiper from 'swiper'

export default {
  mounted() {
    this.recreateSwiper()
  },
  updated() {
    this.recreateSwiper()
  },
  destroyed() {
    if (this.swiper) this.swiper.destroy()
  },
  data() {
    return {
      swiper: null,
      ready: false
    }
  },
  methods: {
    recreateSwiper() {
      if (this.swiper) this.swiper.destroy()

      this.swiper = new Swiper(this.$el, {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true
      })

      this.swiper.on('imagesReady', this.ready = true)

    }
  }
}
</script>
