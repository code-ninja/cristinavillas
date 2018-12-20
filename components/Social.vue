<template>
  <div class="col-md-4 col-lg-2 offset-sm-6 offset-md-0" v-if="facebook || instagram || twitter">
    <h6 class="menu-nav-list-title mb-4">Follow Us</h6>
    <div class="menu-nav-social d-flex">
      <ul>
        <li v-if="facebook">
          <a :href="facebook" alt="Facebook" target="_blank" class="social-fb"></a>
        </li>
        <li v-if="instagram">
          <a :href="instagram" alt="Instagram" target="_blank" class="social-ig"></a>
        </li>
        <li v-if="twitter">
          <a :href="twitter" alt="Twitter" target="_blank" class="social-tw"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    facebook() {
      return this.$store.getters.getSettingByName('facebook')
    },
    instagram() {
      return this.$store.getters.getSettingByName('instagram')
    },
    twitter() {
      return this.$store.getters.getSettingByName('twitter')
    }
  }
}

</script>
