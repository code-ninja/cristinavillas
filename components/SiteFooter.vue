<template>
<footer>
    <div class="container">
      <div class="row justify-content-md-center">
        <nav-links type="footer" class="col-md-6 col-lg-4 my-5 my-sm-0" />
        <contact-address class="col-sm-6 col-md-4 mb-5 d-lg-block" />
        <resorts class="col-10 offset-1 offset-sm-0 col-md-12 col-lg-4" />
      </div>
    </div>
  </footer>
</template>

<script>

import NavLinks from '~/components/NavLinks.vue'
import ContactAddress from '~/components/Address.vue'
import Resorts from '~/components/Resorts.vue'

export default {
  components: {
    NavLinks,
    ContactAddress,
    Resorts
  }
}

</script>

<style src="~/assets/css/footer.scss" lang="scss"></style>
