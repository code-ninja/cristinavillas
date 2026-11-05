<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  sitename: string
  toEmail: string
}>()

const validated = ref(false)
const sending = ref(false)
const sent = ref(false)
const error = ref(false)
const form = ref({ name: '', email: '', phone: '', message: '' })

function validEmail() {
  return /\S+@\S/.test(form.value.email)
}

async function send() {
  validated.value = true
  const { name, email, phone, message } = form.value
  if (!name || !email || !validEmail() || !phone || !message) return

  sending.value = true
  error.value = false
  try {
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        name,
        email,
        phone,
        message,
        sitename: props.sitename,
        to: props.toEmail,
      }),
    })
    const data = (await res.json()) as { ok?: boolean }
    if (!res.ok || !data.ok) throw new Error('send failed')
    sent.value = true
    form.value = { name: '', email: '', phone: '', message: '' }
    validated.value = false
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="sent" class="alert alert-success" role="alert">
      <h4 class="alert-heading">Well done!</h4>
      <p>We are processing your message. Expect an email confirmation within 24 hours</p>
      <hr />
      <p>Feel free to call us for additional information.</p>
      <button type="button" class="btn btn-block btn-lg btn-black" @click="sent = false">
        Send another message
      </button>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      <p>Something went wrong sending your message. Please try again or call us directly.</p>
    </div>

    <form v-if="!sent" novalidate :class="{ 'was-validated': validated }" @submit.prevent="send">
      <div class="form-group">
        <input
          id="inputName"
          v-model="form.name"
          type="text"
          class="form-control"
          placeholder="Name"
          required
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <input
            id="inputEmail"
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <input
            id="inputPhone"
            v-model="form.phone"
            type="tel"
            class="form-control"
            placeholder="Phone"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputMessage">Message</label>
        <textarea
          id="inputMessage"
          v-model="form.message"
          class="form-control"
          rows="5"
          required
        />
      </div>
      <button type="submit" class="btn btn-block btn-lg btn-black" :disabled="sending">
        <span
          v-if="sending"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        {{ sending ? 'Sending' : 'Submit' }}
      </button>
    </form>
  </div>
</template>
