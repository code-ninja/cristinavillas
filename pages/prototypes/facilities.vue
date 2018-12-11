<template>
<div>
<facilities-hero title="Facilities" bg="facilities" />
<section>
  <div class="container">
    <div class="row justify-content-md-center">
      <nav class="filter-gallery">
        <a class="active" href="#">All</a>
        <a href="#">Hotel &amp; Amenities</a>
        <a href="#">Rooms &amp; Suites</a>
        <a href="#">Pool &amp; Beach</a>
      </nav>
    </div>
  </div>
</section>
</div>
</template>

<script>
import FacilitiesHero from '~/components/Hero.vue'

export default {
  components: {
    FacilitiesHero
  }
}
</script>
