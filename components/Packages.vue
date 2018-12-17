<template>
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
                <nuxt-link to="/packages/weddings">
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
                <nuxt-link to="/packages/team-buildings">
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
                <nuxt-link to="/packages/retreats">
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
</template>
