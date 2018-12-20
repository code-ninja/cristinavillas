<template>
  <section>
    <div class="container">
      <!--Facilities-->
      <div class="row no-gutters justify-content-md-center">

          <div class="home-facilities text-center text-md-left">
            <div class="row justify-content-center">
              <div class="col-lg-4">
                <h2 class="title">Facilities</h2>
              </div>
              <div class="col-md-8 col-lg-5">
                <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation.</p>
              </div>
              <div class="col-sm-auto ml-md-auto">
                <nuxt-link to="facilities" class="btn btn-black">View All</nuxt-link>
              </div>
            </div>

          </div>
        </div>
        <!--End of Facilities-->
      </div>

      <slider>
        <div class="swiper-slide">
          <img src="~assets/img/cv-facilities-1.jpg" alt="Function Room">
          <div class="slider-caption">Function Room</div>
        </div>
        <div class="swiper-slide">
          <img src="~assets/img/cv-facilities-2.jpg" alt="Gymnasium">
          <div class="slider-caption">Gymnasium</div>
        </div>
        <div class="swiper-slide">
          <img src="~assets/img/cv-facilities-3.jpg" alt="Garden Suite">
          <div class="slider-caption">Garden Suite</div>
        </div>
      </slider>

  </section>
</template>

<script>

import Slider from '~/components/Slider.vue'

export default {
  components: {
    Slider
  }
}

</script>
