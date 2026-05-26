<template>
  <div class="cart-right">
    <div class="order-summary">
      <h2 class="summary-title">Order Summary</h2>
      <div class="summary-content">
        <div class="summary-fields">
          <div class="field-group">
            <label class="field-label">Discount code / Promo code</label>
            <div class="field-input">
              <input type="text" placeholder="Code" class="input-text" v-model="discountCode">
            </div>
          </div>
          <div class="field-group">
            <label class="field-label">Your bonus card number</label>
            <div class="field-input-with-btn">
              <input type="text" placeholder="Enter Card Number" class="input-text" v-model="bonusCard">
              <button class="apply-btn">Apply</button>
            </div>
          </div>
        </div>
        <div class="prices">
          <div class="price-row">
            <span>Subtotal</span>
            <span>${{ subtotal }}</span>
          </div>
          <div class="price-row">
            <span>Estimated Tax</span>
            <span>$50</span>
          </div>
          <div class="price-row">
            <span>Estimated shipping & Handling</span>
            <span>$29</span>
          </div>
          <div class="price-row total">
            <span>Total</span>
            <span>${{ total }}</span>
          </div>
        </div>
        <button class="checkout-btn">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const discountCode = ref('')
const bonusCard = ref('')

const subtotal = computed(() => cartStore.subtotal)
const total = computed(() => cartStore.total)
</script>