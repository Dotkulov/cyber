<template>
  <div class="div11 products-section">
    <div class="product-tabs">
      <span :class="{ 'tab-active': activeTab === 'new' }" @click="activeTab = 'new'">New Arrival</span>
      <span @click="activeTab = 'bestseller'">Bestseller</span>
      <span @click="activeTab = 'featured'">Featured Products</span>
    </div>
    <div class="products-grid">
      <div v-for="(row, idx) in productRows" :key="idx" class="products-row">
        <ProductCard v-for="product in row" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProductsStore } from '../stores/productsStore'

const productsStore = useProductsStore()
const allProducts = computed(() => productsStore.getAllProducts)

const activeTab = ref('new')

const displayProductsData = computed(() => {
  if (activeTab.value === 'new') {
    return allProducts.value.slice(0, 8)
  } else if (activeTab.value === 'bestseller') {
    return [...allProducts.value].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8)
  } else {
    return [...allProducts.value].slice(0, 8)
  }
})

const productRows = computed(() => {
  const rows = []
  for (let i = 0; i < displayProductsData.value.length; i += 4) {
    rows.push(displayProductsData.value.slice(i, i + 4))
  }
  return rows
})
</script>