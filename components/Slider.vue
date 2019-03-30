<template>
<LazyHydrate when-visible>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide preview-img-item" v-for="(image,index) in images" :key="index">
        <img :src="apiUrl + image.url" :alt="image.title ? image.title : 'Slider Image' + (index ? ' ' + index : '')" @click="$photoswipe.open(index, imgs, { showAnimationDuration: 0, hideAnimationDuration:0 })" />
        <div class="slider-caption" v-if="image.title">{{ image.title }}</div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</LazyHydrate>
</template>

<script>
const apiUrl = process.env.API_URL || 'http://localhost:1337'
import LazyHydrate from 'vue-lazy-hydration'

export default {
  components: {
    LazyHydrate
  },
  props: [
    'images'
  ],
  computed: {
    apiUrl() {
      return apiUrl
    }
  },
  data() {
    return {
      imgs: [],
      swiperOption: {
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true
        }
      }
    }
  },
  mounted() {

    if (this.images)
    for (let i = 0; i < this.images.length; i++) {
      let item = {
        src: apiUrl + this.images[i].url,
        title: this.images[i].title ? this.images[i].title : ''
      }
      let img = new Image()
      img.onload = function() {
        item.w = this.width
        item.h = this.height
      }
      img.src = item.src
      this.imgs.push(item)
    }

  }
}
</script>
