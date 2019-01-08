<template>
<div>
<contact-hero />
  <section class="contact bg-light-yellow collapse">
    <div class="container p-0">
      <div class="row no-gutters">
        <div class="col-sm-8 col-lg-6">
          <div class="contact-card">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
              </div>
              <div class="form-group">
                <label for="inputAddress2">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputCity">City</label>
                  <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputState">State</label>
                  <select id="inputState" class="form-control custom-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-black">Submit</button>
            </form>
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
