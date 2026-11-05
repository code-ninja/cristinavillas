<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination'
import 'photoswipe/style.css'

const props = defineProps<{
  images: { url: string; title?: string }[]
  apiBase: string
}>()

const root = ref<HTMLElement | null>(null)
const imgs: { src: string; alt: string; width?: number; height?: number }[] = []

onMounted(() => {
  if (!root.value) return
  new Swiper(root.value, {
    modules: [Pagination],
    loop: false,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 0,
    pagination: {
      el: root.value.querySelector('.swiper-pagination') as HTMLElement,
      dynamicBullets: true,
      clickable: true,
    },
  })

  for (const image of props.images) {
    const item: (typeof imgs)[number] = { src: props.apiBase + image.url, alt: image.title || '' }
    const img = new Image()
    img.onload = () => {
      item.width = img.naturalWidth
      item.height = img.naturalHeight
    }
    img.src = item.src
    imgs.push(item)
  }
})

async function open(index: number) {
  const { default: PhotoSwipe } = await import('photoswipe')
  const pswp = new PhotoSwipe({
    dataSource: imgs.map((item) => ({
      ...item,
      width: item.width || 1600,
      height: item.height || 1067,
    })),
    index,
    showAnimationDuration: 0,
    hideAnimationDuration: 0,
  })
  pswp.init()
}
</script>

<template>
  <div ref="root" class="swiper swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(image, index) in images" :key="index" class="swiper-slide preview-img-item">
        <img
          :src="apiBase + image.url"
          :alt="image.title ? image.title : 'Slider Image' + (index ? ' ' + index : '')"
          loading="lazy"
          @click="open(index)"
        />
        <div v-if="image.title" class="slider-caption">{{ image.title }}</div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
