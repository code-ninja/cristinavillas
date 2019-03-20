<template>
<div class="swiper-container" :style="{'visibility': ready ? 'visible' : 'hidden'}">
  <div class="swiper-wrapper">
    <slot />
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
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
      ready: true
    }
  },
  methods: {
    recreateSwiper() {

      this.swiper = new Swiper(this.$el, {
        slidesPerView: 'auto',
        parallax: true,
        spaceBetween: 0,
        centeredSlides: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })

      this.swiper.on('init', this.ready = true)

    }
  }
}
</script>
