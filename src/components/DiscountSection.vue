<template>
  <div class="div13 discount-section">
    <h2>Discounts up to -50%</h2>
    <div class="discount-grid">
      <ProductCard v-for="product in discountProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProductsStore } from '../stores/productsStore'

const productsStore = useProductsStore()
const discountProducts = computed(() => productsStore.getDiscountedProducts)
</script>