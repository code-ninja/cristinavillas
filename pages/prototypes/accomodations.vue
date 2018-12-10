<template>
<div>
<accomodations-hero />
  <section>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">Rooms &amp; Suites</h2>
          <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation. Think of them merely as actors on a paper stage, in a performance devoid of content yet rich
            inform.</p>
        </div>
      </div>
      </div>
      <div class="slider-container slider-rooms">
        <div class="slider-wrapper">
          <div class="slider-content">
            <img src="~assets/img/cv-rooms-standard.jpg" alt="Standard Room">
            <div class="room-details">
              <div class="room-name">Standard Room</div>
              <p class="d-none">Think of them merely as actors on a paper stage, in a performance devoid of content yet.</p>
              <div class="room-specs">
                <div class="row">
                  <div class="col-md mb-3 mb-md-0">
                    <div class="room-price">Php 3,500</div>
                    <div>Capacity: 2 to 4 pax</div>
                  </div>
                  <div class="col-auto">
                    <nuxt-link to="#" class="btn btn-black">Book Now</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slider-content">
            <img src="~assets/img/cv-rooms-family.jpg" alt="Standard Deluxe Room">
            <div class="room-details">
              <div class="room-name">Standard Deluxe</div>
              <p class="d-none">Think of them merely as actors on a paper stage, in a performance devoid of content yet.</p>
              <div class="room-specs">
                <div class="row">
                  <div class="col-md mb-3 mb-md-0">
                    <div class="room-price">Php 3,800</div>
                    <div>Capacity: 2 to 3 pax</div>
                  </div>
                  <div class="col-auto">
                    <nuxt-link to="#" class="btn btn-black">Book Now</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slider-content">
            <img src="~assets/img/cv-rooms-couples.jpg" alt="Couples Room">
            <div class="room-details">
              <div class="room-name">Couples Room</div>
              <p class="d-none">Think of them merely as actors on a paper stage, in a performance devoid of content yet.</p>
              <div class="room-specs">
                <div class="row">
                  <div class="col-md mb-3 mb-md-0">
                    <div class="room-price">Php 4,000</div>
                    <div>Capacity: 2 to 3 pax</div>
                  </div>
                  <div class="col-auto">
                    <nuxt-link to="#" class="btn btn-black">Book Now</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slider-content">
            <img src="~assets/img/cv-rooms-family.jpg" alt="Family Room">
            <div class="room-details">
              <div class="room-name">Family Room</div>
              <p class="d-none">Think of them merely as actors on a paper stage, in a performance devoid of content yet.</p>
              <div class="room-specs">
                <div class="row">
                  <div class="col-md mb-3 mb-md-0">
                    <div class="room-price">Php 4,500</div>
                    <div>Capacity: 2 to 5 pax</div>
                  </div>
                  <div class="col-auto">
                    <nuxt-link to="#" class="btn btn-black">Book Now</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slider-content">
            <img src="~assets/img/cv-rooms-family.jpg" alt="Family Room">
            <div class="room-details">
              <div class="room-name">Suite Room</div>
              <p class="d-none">Think of them merely as actors on a paper stage, in a performance devoid of content yet.</p>
              <div class="room-specs">
                <div class="row">
                  <div class="col-md mb-3 mb-md-0">
                    <div class="room-price">Php 5,000</div>
                    <div>Capacity: 2 to 5 pax</div>
                  </div>
                  <div class="col-auto">
                    <nuxt-link to="#" class="btn btn-black">Book Now</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>

  <!--Packages-->
  <section class="bg-light-yellow">
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
import AccomodationsHero from '~/components/AccomodationsHero.vue'

export default {
  components: {
    AccomodationsHero
  }
}
</script>
