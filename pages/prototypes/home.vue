<template>
<div>
<!--Header with address & phone number
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <button class="menu-toggle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="#FFF" fill-rule="evenodd" d="M0 2.5h16v1H0v-1zm4 5h12v1H4v-1zm-4 5h16v1H0v-1z"/>
          </svg>Menu</button>
        </div>
        <div class="col-auto d-none d-md-block">
          <div class="header-location-contact">
            <div class="row">
              <div class="col-auto">
                <div class="title">Address</div>
                <p>Sta. Cruz Taktak Road, Antipolo, Rizal, 1870</p>
              </div>
              <div class="col-auto">
                <div class="title">Contact</div>
                <a href="tel:(02)6974521">(02) 6974521</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header> -->

  <!--Header without phone number-->
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <button class="menu-toggle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="#FFF" fill-rule="evenodd" d="M0 2.5h16v1H0v-1zm4 5h12v1H4v-1zm-4 5h16v1H0v-1z"/>
          </svg>Menu</button>
        </div>
        <div class="col-auto d-none d-md-block">
          <div class="header-location-contact">
            <div class="row">
              <div class="col-auto">
                <a href="tel:(02)6974521"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#FFF" d="M14 15.08l-2.42-4.53c-.006.003-1.358.647-1.42.675-1.54.724-4.674-5.214-3.168-5.996l1.432-.684L6.022 0 4.574.693c-4.951 2.503 2.91 17.321 7.975 15.076.084-.036 1.446-.686 1.451-.688z"/></svg>(02) 6974521</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
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
                  <nuxt-link to="#" class="btn btn-black">View All</nuxt-link>
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
