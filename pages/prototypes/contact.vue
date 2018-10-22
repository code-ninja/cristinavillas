<template>
<div>
<contact-hero />
  <section class="contact bg-light-yellow collapse">
    <div class="container p-0">
      <div class="row no-gutters">
        <div class="col-sm-8 col-lg-6">
          <div class="contact-card">
            <h2 class="title">Get in touch</h2>
            <address class="mb-4">Sta Cruz Taktak Road, Antipolo, <br>Rizal, 1870 Philippines</address>
            <div class="title title-6 pr-sm-5">Request for proposals, group and bookings</div>
            <ul class="menu-links">
              <li><a href="tel:(02)6974521">Tel: (02) 6974521</a></li>
              <li><a href="tel:09178664932">Mobile: 0917-8664932</a></li>
              <li>Fax: 697-5188</li>
              <li class="mt-4"><a href="mailto:cristinavillashotel@gmail.com">Email: cristinavillashotel@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    <div class="contact-map-location"></div>
</section>


</div>
</template>

<script>
import ContactHero from '~/components/ContactHero.vue'

export default {
  components: {
    ContactHero
  }
}
</script>
