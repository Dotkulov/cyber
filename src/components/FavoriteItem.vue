<template>
  <div class="favorite-item">
    <div class="product-image">
      <img :src="item.image" :alt="item.name">
    </div>
    <div class="product-details">
      <div class="product-info">
        <p class="product-name">{{ item.name }}</p>
        <p class="product-sku">#{{ item.sku || '123456' }}</p>
      </div>
      <div class="product-actions">
        <button class="remove-item" @click="remove">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '../stores/favoritesStore'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const favoritesStore = useFavoritesStore()

const remove = () => {
  favoritesStore.removeItem(props.item.id)
}
</script>