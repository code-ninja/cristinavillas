<template>
  <div class="col-sm-6 col-md-4 col-lg-3 mb-5 mb-sm-0 d-none d-md-block">
    <nav class="menu-nav-links" @click="$store.commit('toggleMenu',false)">
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/accomodations">Accomodations</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/facilities">Facilities</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/gallery">Gallery</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/packages">Packages</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/faqs">FAQs</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact">Contact Us</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
