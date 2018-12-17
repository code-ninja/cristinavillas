<template>
<div>
  <hero title="Your Amazing Gateway in the Sky" bg="home" />
  <section>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">The Perfect Place...</h2>
          <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation. Think of them merely as actors on a paper stage, in a performance devoid of content yet rich
            inform.</p>
        </div>
      </div>
      <div class="row no-gutters justify-content-md-center">
        <div class="col-lg-10">
          <div class="embed-responsive embed-responsive-16by9 my-5">
            <div class="embed-responsive-item"><img src="~assets/img/cv-front-building.jpg"></div>
            </div>

            <!--Facilities-->
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

  <packages />

</div>
</template>

<script>

import Hero from '~/components/Hero.vue'
import Packages from '~/components/Packages.vue'
import Slider from '~/components/Slider.vue'

export default {
  components: {
    Hero,
    Slider,
    Packages
  }
}

</script>
