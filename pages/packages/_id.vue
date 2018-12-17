<template>
  <div>
    <section>
      <div class="container">
      </div>
    </section>

    {{ id }}
  </div>
</template>


<script>

export default {
  asyncData({ params }) {
    return params
  }
}

</script>
