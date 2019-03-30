<template>
<!--Header with phone number & book now-->
<div :class="{ 'menu-nav' : $store.state.menuOpen, 'nav-fixed' : navFixed }" class="nav-wrap">
  <header id="navTop">
    <div class="container-fluid">
      <div class="row no-gutters">
        <div class="col">
          <button class="menu-toggle" @click="$store.commit('toggleMenu')" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path fill="#FFF" fill-rule="evenodd" :d="[ $store.state.menuOpen ? 'M8.282 7.575l6.01-6.01.708.707-6.01 6.01 6.01 6.01-.707.708-6.01-6.01L2.272 15l-.708-.707 6.01-6.01-6.01-6.01.707-.708 6.01 6.01z' : 'M0 2.5h16v1H0v-1zm4 5h12v1H4v-1zm-4 5h16v1H0v-1z']" />
            </svg>
            {{ $store.state.menuOpen ? 'Close' : 'Menu' }}
          </button>
        </div>
        <div class="col-auto">
          <div class="header-location-contact">
            <div class="row no-gutters">
              <div class="col-auto d-none d-md-block" v-if="tel">
                <a :href="'tel:'+tel" aria-label="Telephone"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path fill="#FFF" d="M14 15.08l-2.42-4.53c-.006.003-1.358.647-1.42.675-1.54.724-4.674-5.214-3.168-5.996l1.432-.684L6.022 0 4.574.693c-4.951 2.503 2.91 17.321 7.975 15.076.084-.036 1.446-.686 1.451-.688z" /></svg> {{ tel }}</a>
              </div>
              <div class="col-auto">
                <nuxt-link to="/accommodations" aria-label="Book Now" class="btn btn-cta">Book Now</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container" v-show="$store.state.menuOpen">
    <div class="row justify-content-md-center">
      <nav-links type="header" class="fadeIn col-md-6 col-lg-4 my-5 my-sm-0" style="animation-delay: 0.2s;"/>
      <contact-address class="fadeIn col-sm-6 col-md-4 mb-5 mb-sm-0 d-none d-lg-block" style="animation-delay: 0.1s;" />
      <resorts class="fadeIn col-md-4 offset-sm-6 offset-lg-0 d-none d-lg-block"  style="animation-delay: 0s;" />
    </div>
  </div>
</div>
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
  },
  mounted() {
    window.addEventListener('scroll', this.stickyTop)
    this.navTop = document.getElementById('navTop')
    this.stickyTop()
  },
  destroyed() {
    window.removeEventListener('scroll', this.stickyTop)
  },
  data() {
    return {
      navFixed: false,
      navTop: null
    }
  },
  computed: {
    tel() {
      return this.$store.getters.getSettingByName('telephone')
    }
  },
  methods: {
    stickyTop() {

      let screenHeight = document.documentElement.clientHeight
      let navHeight = this.navTop.offsetHeight
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.navFixed = (scrollTop + navHeight >= screenHeight)


    }
  }
}
</script>
