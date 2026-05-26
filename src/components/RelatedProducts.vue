<template>
  <div class="related-products">
    <h2>Related Products</h2>
    <div class="related-grid">
      <ProductCard v-for="product in relatedProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProductsStore } from '../stores/productsStore'

const productsStore = useProductsStore()
const relatedProducts = computed(() => productsStore.getAllProducts.slice(0, 4))
</script>