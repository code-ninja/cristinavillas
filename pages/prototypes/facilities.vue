<template>
<div>
<facilities-hero />
<section>
  <div class="container">
    <div class="row justify-content-md-center">
      <nav class="filter-gallery">
        <a class="active" href="#">All</a>
        <a href="#">Hotel &amp; Amenities</a>
        <a href="#">Rooms &amp; Suites</a>
        <a href="#">Pool &amp; Beach</a>
      </nav>
    </div>
  </div>
  <div class="masonry-gallery">
    <masonry
    :cols="{default: 4, 1000: 3, 700: 2}"
    :gutter="{default: '16px', 400: '10px'}"
    >
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-1.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-front-building.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-2.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-3.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-4.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-5.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-6.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-faq-hero.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-7.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-8.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-9.jpg"></div>
      <div class="image-item"><img src="~assets/img/cv-facilities-gallery-10.jpg"></div>
    </masonry>
  </div>
</section>
</div>
</template>

<script>
import FacilitiesHero from '~/components/FacilitiesHero.vue'
import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'

Vue.use(VueMasonry);

export default {
  components: {
    FacilitiesHero
  }
}
</script>
