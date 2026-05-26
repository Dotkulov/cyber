<template>
  <div class="div10 category-section">
    <div class="category-header">
      <h2>Browse By Category</h2>
      <div class="arrows">
        <div class="arrow-left" @click="scrollCategories(-1)">&lt;</div>
        <div class="arrow-right" @click="scrollCategories(1)">&gt;</div>
      </div>
    </div>
    <div class="categories-grid" ref="categoriesContainer">
      <div class="category-card" @click="$router.push('/catalog')">
        <div class="cat-icon"><img src="/images/icon-phones.png" class="cat-icon-img"></div>
        <span>Phones</span>
      </div>
      <div class="category-card" @click="$router.push('/catalog')">
        <div class="cat-icon"><img src="/images/icon-watches.png" class="cat-icon-img"></div>
        <span>Smart Watches</span>
      </div>
      <div class="category-card" @click="$router.push('/catalog')">
        <div class="cat-icon"><img src="/images/icon-cameras.png" class="cat-icon-img"></div>
        <span>Cameras</span>
      </div>
      <div class="category-card" @click="$router.push('/catalog')">
        <div class="cat-icon"><img src="/images/icon-headphones.png" class="cat-icon-img"></div>
        <span>Headphones</span>
      </div>
      <div class="category-card" @click="$router.push('/catalog')">
        <div class="cat-icon"><img src="/images/icon-computers.png" class="cat-icon-img"></div>
        <span>Computers</span>
      </div>
      <div class="category-card" @click="$router.push('/catalog')">
        <div class="cat-icon"><img src="/images/icon-gaming.png" class="cat-icon-img"></div>
        <span>Gaming</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categoriesContainer = ref(null)

const scrollCategories = (direction) => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollLeft += direction * 200
  }
}
</script>