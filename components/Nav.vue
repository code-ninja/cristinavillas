<template>
<div class="menu-nav">
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <button class="menu-toggle" @click="$emit('menu-toggle',false)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path fill="#FFF" fill-rule="evenodd" d="M8.282 7.575l6.01-6.01.708.707-6.01 6.01 6.01 6.01-.707.708-6.01-6.01L2.272 15l-.708-.707 6.01-6.01-6.01-6.01.707-.708 6.01 6.01z" /></svg>Close</button>
        </div>
        <div class="col-auto">
          <div class="header-location-contact">
            <div class="row no-gutters">
              <div class="col-auto d-none d-md-block">
                <a href="tel:(02)6974521"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path fill="#FFF" d="M14 15.08l-2.42-4.53c-.006.003-1.358.647-1.42.675-1.54.724-4.674-5.214-3.168-5.996l1.432-.684L6.022 0 4.574.693c-4.951 2.503 2.91 17.321 7.975 15.076.084-.036 1.446-.686 1.451-.688z" /></svg>(02) 6974521</a>
              </div>
              <div class="col-auto">
                <nuxt-link to="#" class="btn btn-cta">Book Now</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-lg-5 my-5 my-sm-0">
        <nav class="menu-nav-links">
          <ul>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#">Accomodation</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#">Facilities</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#">Gallery</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#">Packages</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#">Contact Us</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 mb-5 mb-sm-0 d-none d-lg-block">
        <h6 class="menu-nav-list-title mb-4">Address</h6>
        <div class="menu-nav-content mb-5">
          <address>
            Sta Cruz Taktak Road,<br />
            Antipolo, Rizal, 1870<br />
            Philippines
          </address>
        </div>
        <h6 class="menu-nav-list-title mb-4">Contact</h6>
        <div class="menu-nav-content mb-sm-5 mb-md-0">
          <ul class="menu-links">
            <li><a href="tel:(02)6974521">Tel: (02) 6974521</a></li>
            <li><a href="tel:09178664932">Mobile: 0917-8664932</a></li>
            <li>Fax: 697-5188</li>
            <li><a href="mailto:cristinavillashotel@gmail.com">Email: cristinavillashotel@gmail.com</a></li>
          </ul>
        </div>
        <p></p>
      </div>
      <div class="col-md-4 col-lg-2 offset-sm-6 offset-lg-0 d-none d-lg-block">
        <h6 class="menu-nav-list-title mb-4">Follow Us</h6>
        <div class="menu-nav-social d-flex">
          <ul>
            <li>
              <nuxt-link to="#" alt="Facebook" class="social-fb"></nuxt-link>
            </li>
            <li>
              <nuxt-link to="#" alt="Instagram" class="social-ig"></nuxt-link>
            </li>
            <li>
              <nuxt-link to="#" alt="Twitter" class="social-tw"></nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
