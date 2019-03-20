<template>
  <div>
    <h6 v-if="address" class="menu-nav-list-title mb-4">Address</h6>
    <div v-if="address" class="menu-nav-content mb-5">
      <address v-html="address" />
    </div>
    <h6 v-if="phone || mobile || fax || email" class="menu-nav-list-title mb-4">Contact</h6>
    <div class="menu-nav-content mb-5">
      <ul class="menu-links">
        <li v-if="phone"><a :href="'tel:'+phone">Tel: {{ phone }}</a></li>
        <li v-if="mobile"><a :href="'tel:'+mobile">Mobile: {{ mobile }}</a></li>
        <li v-if="fax">Fax: {{ fax }}</li>
        <li v-if="email"><a :href="'mailto:'+email">Email: {{ email }}</a></li>
      </ul>
    </div>
    <h6 v-if="facebook || instagram || twitter" class="menu-nav-list-title mb-4">Follow Us</h6>
    <div v-if="facebook || instagram || twitter" class="menu-nav-content mb-sm-5 mb-md-0">
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
  </div>
</template>

<script>

export default {
  computed: {
    address() {
      let adr = this.$store.getters.getSettingByName('address')
      return adr.replace(/\n/g,'<br/>')
    },
    phone() {
      return this.$store.getters.getSettingByName('telephone')
    },
    mobile() {
      return this.$store.getters.getSettingByName('mobile')
    },
    fax() {
      return this.$store.getters.getSettingByName('fax')
    },
    email() {
      return this.$store.getters.getSettingByName('email')
    },
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
