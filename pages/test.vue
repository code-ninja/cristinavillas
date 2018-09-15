<template>
  <section class="container">
    <div>

      <a
        href="https://nuxtjs.org/"
        @click.prevent="fetch"
        class="button--green">Do it
      </a>

    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData() {

    let url = "http://localhost:3000/api/ghost/api/v0.1/posts/"

    let params = {
      "client_id": process.env.GHOST_ID,
      "client_secret": process.env.GHOST_SECRET,
      "limit": 2,
      "formats": "plaintext"
    }

    let { data } = await axios.get(url, { params })

    return {
      posts: data.posts
    }

  },
  methods: {
    fetch() {

      console.log(this.posts)

    }
  }
}

</script>
