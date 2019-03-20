<template>
<div class="cv-logo" v-html="svg ? svg : ''"></div>
</template>

<script>

export default {
  props: ['type'],
  computed: {
    svg() {
      return this.$store.getters.getSettingByName(this.type)
    }
  }
}

</script>
