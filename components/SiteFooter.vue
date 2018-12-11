<template>
<footer>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-sm-6 col-md-4">
          <logo color="#FFCE4B" />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 mb-5 mb-sm-0 d-none d-md-block">
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
        <contact-address />
        <social />
      </div>
    </div>
  </footer>
</template>

<script>

import Logo from '~/components/Logo.vue'
import ContactAddress from '~/components/Address.vue'
import Social from '~/components/Social.vue'

export default {
  components: {
    Logo,
    ContactAddress,
    Social
  }
}

</script>

<style src="~/assets/css/footer.scss" lang="scss"></style>
