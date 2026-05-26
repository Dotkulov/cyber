<template>
  <div class="div12 banners-row">
    <div class="big-banner-card" style="background:#FFFFFF;">
      <img src="/images/Popular-Products.png" class="banner-top-img">
      <div class="banner-text-block">
        <h2>Popular Products</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display...</p>
        <button class="btn-outline-dark" @click="goToCatalog">Shop Now</button>
      </div>
    </div>
    <div class="big-banner-card" style="background:#F9F9F9;">
      <img src="/images/Ipad-Pro.png" class="banner-top-img">
      <div class="banner-text-block">
        <h2>iPad Pro</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display...</p>
        <button class="btn-outline-dark" @click="goToCatalog">Shop Now</button>
      </div>
    </div>
    <div class="big-banner-card" style="background:#EAEAEA;">
      <img src="/images/Samsung-Galaxy-.png" class="banner-top-img">
      <div class="banner-text-block">
        <h2>Samsung Galaxy</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display...</p>
        <button class="btn-outline-dark" @click="goToCatalog">Shop Now</button>
      </div>
    </div>
    <div class="big-banner-card" style="background:#2C2C2C;">
      <img src="/images/Macbook-Pro.png" class="banner-top-img">
      <div class="banner-text-block white-text">
        <h2>Macbook Pro</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display...</p>
        <button class="btn-outline-light" @click="goToCatalog">Shop Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goToCatalog = () => router.push('/catalog')
</script>