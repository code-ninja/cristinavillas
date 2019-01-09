<template>
  <div class="col-sm-6 col-md-4 col-lg-3 mb-5 mb-sm-0" v-if="address && phone">
    <h6 class="menu-nav-list-title mb-4">Address</h6>
    <div class="menu-nav-content mb-5">
      <address v-html="address" />
    </div>
    <h6 class="menu-nav-list-title mb-4">Contact</h6>
    <div class="menu-nav-content mb-sm-5 mb-md-0">
      <ul class="menu-links">
        <li v-if="phone"><a :href="'tel:'+phone">Tel: {{ phone }}</a></li>
        <li v-if="mobile"><a :href="'tel:'+mobile">Mobile: {{ mobile }}</a></li>
        <li v-if="fax">Fax: {{ fax }}</li>
        <li v-if="email"><a :href="'mailto:'+email">Email: {{ email }}</a></li>
      </ul>
    </div>
    <p></p>
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
    }
  }
}

</script>
