<template>
<div>
  <hero title="Accomodations" bg="accomodations" />

  <section>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-10 col-lg-8 text-center">
          <h2 class="title">Rooms &amp; Suites</h2>
          <p class="subtitle">These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation. Think of them merely as actors on a paper stage, in a performance devoid of content yet rich
            inform.</p>
        </div>
      </div>
      </div>

      <slider>
        <div v-for="room in rooms" :key="room.url" class="swiper-slide">
          <img :src="room.img" :alt="room.name">
          <div class="room-details">
            <div class="room-name">{{ room.name }}</div>
            <p class="d-none">{{ room.desc }}</p>
            <div class="room-specs">
              <div class="row">
                <div class="col-md mb-3 mb-md-0">
                  <div class="room-price">{{ room.price }}</div>
                  <div>Capacity: {{ room.capacity }}</div>
                </div>
                <div class="col-auto">
                  <nuxt-link :to="'/accomodations/'+room.url" class="btn btn-black">Book Now</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slider>

  </section>

  <packages />

</div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import Slider from '~/components/Slider.vue'
import Packages from '~/components/Packages.vue'

export default {
  scrollToTop: true,
  components: {
    Hero,
    Slider,
    Packages
  },
  data() {
    return {
      rooms: [
        {
          url: 'standard',
          name: 'Standard Room',
          img: '/img/cv-rooms-standard.jpg',
          desc: 'Think of them merely as actors on a paper stage, in a performance devoid of content yet.',
          price: 'Php 3000',
          capacity: '2 to 4 pax'
        },
        {
          url: 'couples',
          name: 'Couples Room',
          img: '/img/cv-rooms-couples.jpg',
          desc: 'Think of them merely as actors on a paper stage, in a performance devoid of content yet.',
          price: 'Php 3000',
          capacity: '2 to 4 pax'
        },
        {
          url: 'family',
          name: 'Family Room',
          img: '/img/cv-rooms-family.jpg',
          desc: 'Think of them merely as actors on a paper stage, in a performance devoid of content yet.',
          price: 'Php 3000',
          capacity: '2 to 4 pax'
        },
      ]
    }
  }
}
</script>
