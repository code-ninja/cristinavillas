<script setup lang="ts">
import { nextTick, ref } from 'vue'
const props = defineProps<{
  roomName: string
  price: string
  sitename: string
  toEmail: string
  googleDoc?: string
}>()

function localDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
const minDate = localDate(today)

const started = ref(false)
const validated = ref(false)
const booking = ref(false)
const booked = ref(false)
const error = ref(false)
const guestCount = [1, 2, 3, 4, 5, 6]
const inputName = ref<HTMLInputElement | null>(null)
const inputEmail = ref<HTMLInputElement | null>(null)
const inputPhone = ref<HTMLInputElement | null>(null)

const form = ref({
  rangeStart: minDate,
  rangeEnd: localDate(tomorrow),
  count: 2,
  name: '',
  email: '',
  phone: '',
})

function validEmail() {
  return /\S+@\S/.test(form.value.email)
}

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

async function book() {
  error.value = false
  if (!started.value) {
    started.value = true
    nextTick(() => inputName.value?.focus())
    return
  }
  const invalid = !form.value.name
    ? inputName
    : !validEmail()
      ? inputEmail
      : !form.value.phone
        ? inputPhone
        : null
  if (invalid) {
    validated.value = true
    nextTick(() => invalid.value?.focus())
    return
  }
  if (!form.value.rangeStart || !form.value.rangeEnd) {
    validated.value = true
    return
  }

  booking.value = true
  const start = form.value.rangeStart
  const end = form.value.rangeEnd

  try {
    const doc = props.googleDoc?.trim()
    if (doc) {
      const params = new URLSearchParams({
        Name: form.value.name,
        Email: form.value.email,
        Phone: form.value.phone,
        Count: String(form.value.count),
        Room: props.roomName,
        Price: props.price,
        Start: start,
        End: end,
        Contacted: 'no',
        Deposit: 'no',
        DateBooked: today.toISOString().slice(0, 10),
      })
      await fetch(`${doc}?${params.toString()}`, { method: 'GET' })
    }

    const res = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking',
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        count: String(form.value.count),
        room: props.roomName,
        price: props.price,
        start,
        end,
        sitename: props.sitename,
        to: props.toEmail,
      }),
    })
    const data = (await res.json()) as { ok?: boolean }
    if (!res.ok || !data.ok) throw new Error('email failed')

    booked.value = true
    started.value = false
    validated.value = false
    form.value.name = ''
    form.value.email = ''
    form.value.phone = ''
  } catch {
    error.value = true
  } finally {
    booking.value = false
  }
}
</script>

<template>
  <div v-if="booked" class="booking-form">
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Well done!</h4>
      <p>We are processing your booking. Expect an email confirmation within 24 hours</p>
      <hr />
      <p>Feel free to call us for additional information.</p>
      <button type="button" class="btn btn-block btn-lg btn-black" @click="booked = false">
        Make another booking
      </button>
    </div>
  </div>
  <div v-else class="booking-form">
    <div class="form-group">
      <label>Check-In - Check-Out</label>
      <div class="form-row">
        <div class="col-6">
          <input v-model="form.rangeStart" type="date" class="form-control" :min="minDate" />
        </div>
        <div class="col-6">
          <input
            v-model="form.rangeEnd"
            type="date"
            class="form-control"
            :min="form.rangeStart || minDate"
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="inputNumberGuest">Number of guest</label>
      <select id="inputNumberGuest" v-model="form.count" class="form-control custom-select">
        <option v-for="count in guestCount" :key="count" :value="count">{{ count }}</option>
      </select>
    </div>
    <form novalidate :class="{ 'was-validated': validated }" @submit.prevent="book">
      <div v-if="started">
        <hr />
        <div class="form-group">
          <label for="inputName">Full Name</label>
          <input id="inputName" ref="inputName" v-model="form.name" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input id="inputEmail" ref="inputEmail" v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="inputPhone">Phone</label>
          <input id="inputPhone" ref="inputPhone" v-model="form.phone" type="tel" class="form-control" required />
        </div>
      </div>
      <button type="submit" class="btn btn-block btn-lg btn-black" :disabled="booking">
        <span
          v-if="booking"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        {{ booking ? 'Booking' : started ? 'Submit' : 'Book now' }}
      </button>
      <div v-if="error" class="row justify-content-center" role="alert">
        Something went wrong, please try again.
      </div>
    </form>
    <div v-if="!started" class="booking-form-list">
      <ul>
        <li>Price is subject to change without prior notice.</li>
        <li>Check-in time is 2:00 PM</li>
        <li>Check-out is 12:00 NOON the next day</li>
      </ul>
    </div>
  </div>
</template>
