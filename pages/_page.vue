<template>
  <section class="container">
    <h1>{{ title }}</h1>
    <div>

      {{ custom_excerpt }}

    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ res, params, error }) {

    let url = "http://localhost:3000/api/ghost/api/v0.1/posts/slug/"+ params.page+"/"

    let p = {
      "client_id": process.env.GHOST_ID,
      "client_secret": process.env.GHOST_SECRET
    }

    try {
      let { data } = await axios.get(url, { params: p })
      return data.posts[0]

    } catch (e) {
      error({
        statusCode: 404,
        message: "Sorry. But, we can't find this page anywhere."
      })
    }


  },
  head() {
    return {
      title: this.title
    }
  }
}

</script>
