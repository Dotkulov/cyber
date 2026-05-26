<template>
  <div class="cart-item">
    <div class="product-image">
      <img :src="item.image" :alt="item.name">
    </div>
    <div class="product-details">
      <div class="product-info">
        <p class="product-name">{{ item.name }}</p>
        <p class="product-sku">#{{ item.sku || '123456' }}</p>
      </div>
      <div class="product-actions">
        <div class="quantity-control">
          <button class="qty-minus" @click="decrement">−</button>
          <span class="qty-number">{{ item.quantity }}</span>
          <button class="qty-plus" @click="increment">+</button>
        </div>
        <span class="product-price">${{ item.price * item.quantity }}</span>
        <button class="remove-item" @click="remove">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const increment = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1)
}

const decrement = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity - 1)
}

const remove = () => {
  cartStore.removeItem(props.item.id)
}
</script>