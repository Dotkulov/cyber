<template>
  <div class="product-card">
    <div class="like-icon" :class="{ liked: isFavorite }" @click.stop="toggleFavorite"></div>
    <img :src="product.image" :alt="product.name" class="product-img" @click="goToProduct">
    <div class="product-info">
      <p class="product-title">{{ product.name }}</p>
      <span class="product-price">${{ product.price }}</span>
    </div>
    <button class="btn-black" @click.stop="addToCart">Buy Now</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useFavoritesStore } from '../stores/favoritesStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.product.id))

const toggleFavorite = () => {
  favoritesStore.toggleItem(props.product)
}

const addToCart = () => {
  cartStore.addItem({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    sku: props.product.sku
  })
}

const goToProduct = () => {
  router.push(`/product/${props.product.id}`)
}
</script>