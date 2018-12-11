<template>
<div>
  <hero :title="error.message" bg="contact" />
</div>
</template>

<script>
import Hero from '~/components/Hero.vue'

export default {
  components: {
    Hero
  },
  props: ['error']
}
</script>
