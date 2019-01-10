<template>
<footer>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-sm-6 col-md-4">
          <logo color="#FFCE4B" />
        </div>
        <nav-links type="footer" class="col-sm-6 col-md-4 col-lg-3 mb-5 mb-sm-0 d-none d-md-block" />
        <contact-address class="col-sm-6 col-md-4 col-lg-3 mb-5 mb-sm-0" />
        <social class="col-md-4 col-lg-2 offset-sm-6 offset-md-0"/>
      </div>
    </div>
  </footer>
</template>

<script>

import Logo from '~/components/Logo.vue'
import NavLinks from '~/components/NavLinks.vue'
import ContactAddress from '~/components/Address.vue'
import Social from '~/components/Social.vue'

export default {
  components: {
    Logo,
    NavLinks,
    ContactAddress,
    Social
  }
}

</script>

<style src="~/assets/css/footer.scss" lang="scss"></style>
