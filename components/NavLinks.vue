<template>
  <div>
    <nav class="menu-nav-links fadeInUp" @click="$store.commit('toggleMenu',false)">
      <ul>
        <li v-for="navLink in navLinks" :key="navLink.id">
          <a v-if="navLink.slug.slice(0,4) == 'http'" :href="navLink.slug" target="_blank">{{ navLink.label }}</a>
          <nuxt-link v-else :to="navLink.slug">{{ navLink.label }}</nuxt-link>
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
