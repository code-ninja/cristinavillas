<template>
  <div class="col-sm-6 col-md-4 col-lg-3 mb-5 mb-sm-0 d-none d-md-block">
    <nav class="menu-nav-links" @click="$store.commit('toggleMenu',false)">
      <ul>
        <li v-for="navLink in navLinks" :key="navLink.id">
          <nuxt-link :to="navLink.slug">{{ navLink.label }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  props: [
    'type'
  ],
  computed: {
    navLinks() {
      const nav = this.$store.state.navLinks
      return nav.filter(item=>{return item[this.type] == true})
    }
  }
}

</script>
