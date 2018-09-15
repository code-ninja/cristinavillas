<template>
<div>
  <home-hero />
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
            <div class="embed-responsive-item"><img src="~assets/img/cv-home-1.jpg"></div>
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
                  <nuxt-link to="#" class="btn btn-outline-secondary">View All</nuxt-link>
                </div>
              </div>

            </div>
          </div>

          <!--End of Facilities-->
        </div>
      </div>
      <div class="slider-container">
        <div class="slider-wrapper">
          <div class="slider-content">
            <img src="~assets/img/cv-facilities-1.jpg" alt="Function Room">
            <div class="slider-caption">Function Room</div>
          </div>
          <div class="slider-content">
            <img src="~assets/img/cv-facilities-2.jpg" alt="Gymnasium">
            <div class="slider-caption">Gymnasium</div>
          </div>
          <div class="slider-content">
            <img src="~assets/img/cv-facilities-3.jpg" alt="Garden Suite">
            <div class="slider-caption">Garden Suite</div>
          </div>
        </div>
      </div>
  </section>

  <!--Packages-->
  <section class="home-packages">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-6 text-center">
          <h2 class="title">Packages</h2>
          <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation.</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-10 col-sm-12 col-md-10">
          <div class="row mt-4">
            <div class="col-sm-4">
              <div class="packages-card bg-secondary">
                <nuxt-link to="#">
                  <div class="packages-bg">
                    <img src="~assets/img/cv-package-1.jpg" alt="Wedding Package">
                  </div>
                    <div class="packages-content">
                      <div class="package-name">Weddings</div>
                    </div>
                </nuxt-link>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="packages-card bg-secondary">
                <nuxt-link to="#">
                  <div class="packages-bg">
                    <img src="~assets/img/cv-package-2.jpg" alt="Team Building Package">
                  </div>
                    <div class="packages-content">
                      <div class="package-name">Team Building</div>
                    </div>
                </nuxt-link>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="packages-card bg-secondary">
                <nuxt-link to="#">
                  <div class="packages-bg">
                    <img src="~assets/img/cv-package-3.jpg" alt="Corporate Retreats Package">
                  </div>
                    <div class="packages-content">
                      <div class="package-name">Corporate Retreats</div>
                    </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  <!--End of Packages-->
</div>
</template>

<script>
import HomeHero from '~/components/HomeHero.vue'

export default {
  components: {
    HomeHero
  }
}
</script>
