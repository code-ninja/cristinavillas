<template>
<div>
<contact-hero />
  <section class="bg-light-yellow collapse">
    <div class="container">
      <div class="row ">
        <div class="col-lg-6">
          <div class="contact-card">
            <h2 class="title">Get in touch</h2>
            <address>Sta Cruz Taktak Road, Antipolo, Rizal, 1870<br>Philippines</address>
            <div>Request for proposals, group and bookings</div>
            <ul class="menu-links mt-3">
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
