<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  googleAnalytics?: string
  swaychatWidgetId?: string
}>()

onMounted(() => {
  if (props.googleAnalytics) {
    const id = props.googleAnalytics
    ;(window as unknown as { ga?: (...args: unknown[]) => void }).ga =
      (window as unknown as { ga?: (...args: unknown[]) => void }).ga ||
      function (...args: unknown[]) {
        ;((window as unknown as { ga?: { q?: unknown[] } }).ga!.q =
          (window as unknown as { ga?: { q?: unknown[] } }).ga!.q || []).push(args)
      }
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://www.google-analytics.com/analytics.js'
    document.head.appendChild(s)
    ;(window as unknown as { ga: (...args: unknown[]) => void }).ga('create', id, 'auto')
    ;(window as unknown as { ga: (...args: unknown[]) => void }).ga('set', 'page', location.pathname)
    ;(window as unknown as { ga: (...args: unknown[]) => void }).ga('send', 'pageview')
  }

  if (props.swaychatWidgetId) {
    const w = window as unknown as { _SwayChat?: (...args: unknown[]) => void }
    w._SwayChat =
      w._SwayChat ||
      function (...args: unknown[]) {
        ;(w._SwayChat!.q = w._SwayChat!.q || []).push(args)
      }
    const c = document.createElement('script')
    c.async = true
    c.src = '//cdn.swaychat.com/v2/widget/assets/widget.js'
    document.head.appendChild(c)
    w._SwayChat!(
      'create',
      'c820e800-0c08-5b7f-889c-2c260df897ed',
      props.swaychatWidgetId,
    )
  }
})
</script>

<template><span class="hidden" aria-hidden="true" /></template>
