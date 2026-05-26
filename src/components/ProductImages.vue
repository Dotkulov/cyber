<template>
  <div class="images-section">
    <div class="thumbnails">
      <img 
        v-for="(img, index) in images" 
        :key="index"
        :src="img" 
        :alt="`thumbnail ${index + 1}`"
        :class="['thumbnail', { active: currentImage === img }]"
        @click="currentImage = img"
      >
    </div>
    <div class="main-image">
      <img :src="currentImage" :alt="productName">
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  productName: {
    type: String,
    default: 'Product'
  }
})

const currentImage = ref(props.images[0] || '')

// Если images меняются извне, обновляем currentImage
watch(() => props.images, (newImages) => {
  if (newImages && newImages.length > 0) {
    currentImage.value = newImages[0]
  }
}, { immediate: true })
</script>

<style scoped>
/* Стили уже в style-product-details.css */
.images-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 48px;
  width: 536px;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.thumbnail {
  width: 75px;
  height: 93px;
  background: transparent;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.thumbnail.active {
  opacity: 1;
}

.thumbnail:hover {
  opacity: 0.8;
}

.main-image {
  width: 413px;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}
</style>