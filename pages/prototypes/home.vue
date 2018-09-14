<template>
<div>
  <home-hero />
  <section>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title mb-4">The Perfect Place...</h2>
          <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation. Think of them merely as actors on a paper stage, in a performance devoid of content yet rich
            inform.</p>
        </div>
      </div>
      <div class="row no-gutters justify-content-md-center">
        <div class="col-lg-10">
          <div style="background: gray; margin: 64px 0;" class="embed-responsive embed-responsive-16by9">
            <div class="embed-responsive-item"><img src="~assets/img/cv-home-1.jpg"></div>
            </div>

            <!--Facilities-->
            <div class="home-facilities">
              <div class="row justify-content-md-center">
                <div class="col-lg-4">
                  <h2 class="title">Facilities</h2>
                </div>
                <div class="col-lg-5">
                  <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation.</p>
                </div>
                <div class="col-sm-auto ml-lg-auto">
                  <nuxt-link to="#" class="btn btn-primary">View All</nuxt-link>
                </div>
              </div>
            </div>
            <!--End of Facilities-->

          </div>
        </div>


      </div>

  </section>

  <!--Packages-->
  <section class="home-packages">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-6 text-center">
          <h2 class="title mb-4">Packages</h2>
          <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation.</p>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-lg-10 text-center">
          <div class="row mt-4">
            <div class="col-md-4">
              <div class="packages-card bg-secondary">
                <nuxt-link to="#">
                  <div class="packages-bg">Weddings</div>
                </nuxt-link>
              </div>
            </div>
            <div class="col-md-4">
              <div class="packages-card bg-secondary">
                <nuxt-link to="#">
                  <div class="packages-bg">Team Building</div>
                </nuxt-link>
              </div>
            </div>
            <div class="col-md-4">
              <div class="packages-card bg-secondary">
                <nuxt-link to="#">
                  <div class="packages-bg">Corporate Retreat</div>
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
