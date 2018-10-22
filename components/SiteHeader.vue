<template>
 <!--Header with phone number & book now-->
  <header>
    <div class="container-fluid">
      <div class="row no-gutters">
        <div class="col">
          <button class="menu-toggle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="#FFF" fill-rule="evenodd" d="M0 2.5h16v1H0v-1zm4 5h12v1H4v-1zm-4 5h16v1H0v-1z"/>
          </svg>Menu</button>
        </div>
        <div class="col-auto">
          <div class="header-location-contact">
            <div class="row no-gutters">
              <div class="col-auto d-none d-md-block">
                <a href="tel:(02)6974521"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#FFF" d="M14 15.08l-2.42-4.53c-.006.003-1.358.647-1.42.675-1.54.724-4.674-5.214-3.168-5.996l1.432-.684L6.022 0 4.574.693c-4.951 2.503 2.91 17.321 7.975 15.076.084-.036 1.446-.686 1.451-.688z"/></svg>(02) 6974521</a>
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
</template>
