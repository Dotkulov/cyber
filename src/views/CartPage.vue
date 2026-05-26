<template>
  <div class="cart-page">
    <!-- HEADER TOP -->
    <div class="header-top">
      <div class="logo" @click="$router.push('/')">
        <img src="/images/logoblack.png" alt="7cyber" class="logo-img">
      </div>
      <div class="search-field" @click="focusSearch">
        <div class="search-icon"></div>
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search" 
          v-model="searchQuery"
          @input="onSearch"
          @focus="showSearchResults = true"
          ref="searchInput"
        >
      </div>
      <div class="header-icons">
        <div class="icon-favorite" @click="$router.push('/favorite')"></div>
        <div class="icon-cart" @click="$router.push('/cart')">
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </div>
      </div>
    </div>

    <!-- Search Results Overlay -->
    <div v-if="showSearchResults && searchQuery" class="search-overlay" @click="showSearchResults = false">
      <div class="search-results" @click.stop>
        <div class="search-results-header">
          <h3>Search Results ({{ searchResults.length }})</h3>
          <button class="close-search" @click="showSearchResults = false">✕</button>
        </div>
        <div v-if="searchResults.length > 0" class="search-results-list">
          <div v-for="product in searchResults.slice(0, 5)" :key="product.id" class="search-result-item" @click="goToProduct(product.id)">
            <img :src="product.image" :alt="product.name" class="search-result-img">
            <div class="search-result-info">
              <p class="search-result-name">{{ product.name }}</p>
              <span class="search-result-price">${{ product.price }}</span>
            </div>
          </div>
          <div v-if="searchResults.length > 5" class="view-all-results" @click="$router.push('/catalog')">
            View all {{ searchResults.length }} results →
          </div>
        </div>
        <div v-else class="no-results">
          <p>No products found for "{{ searchQuery }}"</p>
          <button class="browse-catalog" @click="$router.push('/catalog')">Browse Catalog</button>
        </div>
      </div>
    </div>

    <!-- SHOPPING CART CONTENT -->
    <div class="cart-content">
      <div class="cart-wrapper">

        <!-- LEFT SIDE - Products -->
        <div class="cart-left">
          <h1 class="cart-title">Shopping Cart</h1>
          <div class="cart-products">
            <div v-if="cartItems.length === 0" class="empty-cart">
              <div class="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <button class="continue-shopping" @click="$router.push('/catalog')">Continue Shopping</button>
            </div>
            <template v-else>
              <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
                <div class="product-image">
                  <img :src="item.image" :alt="item.name">
                </div>
                <div class="product-details">
                  <div class="product-info">
                    <p class="product-name">{{ item.name }}</p>
                    <p class="product-sku">{{ item.sku || '#123456' }}</p>
                  </div>
                  <div class="product-actions">
                    <div class="quantity-control">
                      <button class="qty-minus" @click="decrementQuantity(item)">−</button>
                      <span class="qty-number">{{ item.quantity }}</span>
                      <button class="qty-plus" @click="incrementQuantity(item)">+</button>
                    </div>
                    <span class="product-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                    <button class="remove-item" @click="removeItem(item.id)">✕</button>
                  </div>
                </div>
              </div>
              <div v-for="i in cartItems.length - 1" :key="'divider-' + i" class="divider"></div>
            </template>
          </div>
        </div>

        <!-- RIGHT SIDE - Order Summary -->
        <div class="cart-right">
          <div class="order-summary">
            <h2 class="summary-title">Order Summary</h2>
            <div class="summary-content">
              <div class="summary-fields">
                <!-- Discount code field -->
                <div class="field-group">
                  <label class="field-label">Discount code / Promo code</label>
                  <div class="field-input">
                    <input type="text" placeholder="Code" class="input-text" v-model="discountCode">
                  </div>
                </div>
                <!-- Bonus card field -->
                <div class="field-group">
                  <label class="field-label">Your bonus card number</label>
                  <div class="field-input-with-btn">
                    <input type="text" placeholder="Enter Card Number" class="input-text" v-model="bonusCard">
                    <button class="apply-btn" @click="applyBonusCard">Apply</button>
                  </div>
                </div>
              </div>
              <div class="prices">
                <div class="price-row">
                  <span>Subtotal</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="price-row">
                  <span>Estimated Tax</span>
                  <span>${{ estimatedTax.toFixed(2) }}</span>
                </div>
                <div class="price-row">
                  <span>Estimated shipping & Handling</span>
                  <span>${{ estimatedShipping.toFixed(2) }}</span>
                </div>
                <div class="price-row discount-row" v-if="discountAmount > 0">
                  <span>Discount</span>
                  <span class="discount-value">-${{ discountAmount.toFixed(2) }}</span>
                </div>
                <div class="price-row total">
                  <span>Total</span>
                  <span>${{ total.toFixed(2) }}</span>
                </div>
              </div>
              <button class="checkout-btn" @click="checkout">Checkout</button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-info">
        <div class="footer-logo-text">
          <div class="footer-logo">
            <img src="/images/LODOFOOTER.png" alt="7cyber" class="footer-logo-img">
          </div>
          <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than ...</p>
        </div>
        <div class="footer-nav">
          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              <li>Bonus program</li>
              <li>Gift cards</li>
              <li>Credit and payment</li>
              <li>Service contracts</li>
              <li>Non-cash account</li>
              <li>Payment</li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Assistance to the buyer</h4>
            <ul>
              <li>Find an order</li>
              <li>Terms of delivery</li>
              <li>Exchange and return of goods</li>
              <li>Guarantee</li>
              <li>Frequently asked questions</li>
              <li>Terms of use of the site</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="social-icons">
        <div class="social twitter"><img src="/images/TWITER.png" alt="Twitter" class="social-icon"></div>
        <div class="social facebook"><img src="/images/FACEBOOK.png" alt="Facebook" class="social-icon"></div>
        <div class="social tiktok"><img src="/images/TIKTOK.png" alt="TikTok" class="social-icon"></div>
        <div class="social instagram"><img src="/images/INSTA.png" alt="Instagram" class="social-icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'

const router = useRouter()
const cartStore = useCartStore()
const productsStore = useProductsStore()

const cartItems = computed(() => cartStore.cartItems)
const cartCount = computed(() => cartStore.itemCount)

// Цены
const subtotal = computed(() => cartStore.subtotal)
const estimatedTax = computed(() => subtotal.value * 0.1) // 10% tax
const estimatedShipping = computed(() => subtotal.value > 100 ? 0 : 29) // Free shipping over $100

// Скидки
const discountCode = ref('')
const bonusCard = ref('')
const discountAmount = ref(0)
const appliedDiscount = ref(null)

// Поиск
const searchQuery = ref('')
const searchResults = ref([])
const showSearchResults = ref(false)
const searchInput = ref(null)

// Методы корзины
const incrementQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  } else {
    cartStore.removeItem(item.id)
  }
}

const removeItem = (id) => {
  cartStore.removeItem(id)
}

// Скидки
const applyBonusCard = () => {
  if (bonusCard.value.length === 8) {
    discountAmount.value = subtotal.value * 0.05 // 5% discount
    alert('Bonus card applied! 5% discount')
  } else {
    alert('Invalid bonus card number. Please enter 8 digits.')
  }
}

// Применение промокода
const applyPromoCode = () => {
  const promoCodes = {
    'SAVE10': 0.1,
    'SAVE20': 0.2,
    'WELCOME': 0.15
  }
  
  if (promoCodes[discountCode.value.toUpperCase()]) {
    discountAmount.value = subtotal.value * promoCodes[discountCode.value.toUpperCase()]
    appliedDiscount.value = discountCode.value.toUpperCase()
    alert(`Promo code ${discountCode.value} applied!`)
  } else if (discountCode.value) {
    alert('Invalid promo code')
  }
}

// Общая сумма
const total = computed(() => {
  return subtotal.value + estimatedTax.value + estimatedShipping.value - discountAmount.value
})

// Checkout
const checkout = () => {
  if (cartItems.value.length === 0) {
    alert('Your cart is empty!')
    return
  }
  alert(`Order placed successfully! Total: $${total.value.toFixed(2)}`)
  cartStore.clearCart()
  discountAmount.value = 0
  discountCode.value = ''
  bonusCard.value = ''
}

// Поиск
const onSearch = () => {
  if (searchQuery.value.trim()) {
    searchResults.value = productsStore.getAllProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  } else {
    searchResults.value = []
  }
}

const focusSearch = () => {
  searchInput.value?.focus()
}

const goToProduct = (id) => {
  showSearchResults.value = false
  searchQuery.value = ''
  router.push(`/product/${id}`)
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.search-field') && !event.target.closest('.search-overlay')) {
    showSearchResults.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.cart-page {
  max-width: 1440px;
  margin: 0 auto;
  background: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 160px;
  background: #FFFFFF;
  border-bottom: 1px solid #B5B5B5;
}

.logo-img {
  height: 45px;
  cursor: pointer;
}

.search-field {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  width: 320px;
  height: 48px;
  background: #F5F5F5;
  border-radius: 8px;
  gap: 8px;
  cursor: pointer;
}

.search-icon {
  width: 20px;
  height: 20px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="%23989898"/></svg>');
  background-size: contain;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  color: #656565;
}

.header-icons {
  display: flex;
  gap: 20px;
}

.icon-favorite, .icon-cart {
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.icon-favorite { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M16 28.7l-1.45-1.32C7.8 21.2 4 17.6 4 13.1 4 9.5 6.5 7 10.1 7c2.2 0 4.3 1.1 5.9 2.9C17.6 8.1 19.7 7 21.9 7c3.6 0 6.1 2.5 6.1 6.1 0 4.5-3.8 8.1-10.55 14.28L16 28.7z" fill="black"/></svg>'); }
.icon-cart { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M8 10h16l-2 12H10L8 10z" stroke="black" fill="none" stroke-width="1.5"/><circle cx="12" cy="24" r="1.5" fill="black"/><circle cx="20" cy="24" r="1.5" fill="black"/></svg>'); position: relative; }

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #FF4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Search Overlay */
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding-top: 80px;
}

.search-results {
  background: white;
  width: 500px;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.search-results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.search-results-header h3 {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 18px;
  margin: 0;
}

.close-search {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.search-result-item {
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
}

.search-result-item:hover {
  background: #f5f5f5;
}

.search-result-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.search-result-name {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
}

.search-result-price {
  font-family: 'Abel';
  font-size: 16px;
  font-weight: bold;
}

/* Cart Content */
.cart-content {
  flex: 1;
  padding: 112px 160px;
}

.cart-wrapper {
  display: flex;
  gap: 48px;
}

.cart-left {
  flex: 1;
}

.cart-title {
  font-family: 'Abel';
  font-size: 24px;
  margin-bottom: 40px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  gap: 15px;
}

.product-image {
  width: 90px;
  height: 90px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-details {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.product-info {
  min-width: 200px;
}

.product-name {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 16px;
  margin-bottom: 8px;
}

.product-sku {
  font-family: 'Abel';
  font-size: 14px;
  color: #666;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-minus, .qty-plus {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.qty-number {
  width: 42px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #D9D9D9;
  border-radius: 4px;
}

.product-price {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 20px;
  min-width: 80px;
  text-align: right;
}

.remove-item {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.divider {
  width: 100%;
  height: 0.5px;
  background: #A3A3A3;
  margin: 8px 0;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-cart p {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping {
  background: #000;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'ABeeZee';
  font-style: italic;
}

/* Order Summary */
.cart-right {
  width: 400px;
}

.order-summary {
  border: 1px solid #EBEBEB;
  border-radius: 10px;
  padding: 32px;
}

.summary-title {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 20px;
  margin-bottom: 24px;
}

.summary-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  color: #545454;
}

.field-input input,
.field-input-with-btn input {
  width: 100%;
  padding: 12px;
  border: 0.5px solid #9F9F9F;
  border-radius: 7px;
  outline: none;
}

.field-input-with-btn {
  display: flex;
}

.field-input-with-btn input {
  flex: 1;
  border-radius: 7px 0 0 7px;
}

.apply-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #000;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  font-family: 'ABeeZee';
  font-style: italic;
}

.prices {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 16px;
}

.price-row.total {
  font-weight: 600;
  font-size: 18px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.discount-row {
  color: #00aa00;
}

.discount-value {
  color: #00aa00;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background: #000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 16px;
}

.checkout-btn:hover {
  background: #333;
}

/* Footer */
.footer {
  background: #000000;
  padding: 80px 160px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: #CFCFCF;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  gap: 80px;
  flex-wrap: wrap;
}

.footer-logo-text {
  max-width: 320px;
}

.footer-logo-img {
  height: 32px;
  margin-bottom: 24px;
}

.footer-nav {
  display: flex;
  gap: 60px;
}

.footer-col h4 {
  color: #FFF;
  margin-bottom: 20px;
}

.footer-col ul {
  list-style: none;
}

.footer-col li {
  margin-bottom: 10px;
  cursor: pointer;
}

.social-icons {
  display: flex;
  gap: 20px;
}

.social {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.social-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Responsive */
@media (max-width: 1200px) {
  .header-top, .cart-content, .footer {
    padding: 16px 40px;
  }
  .cart-content {
    padding: 40px;
  }
  .cart-wrapper {
    flex-direction: column;
  }
  .cart-right {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
  }
  .product-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .product-actions {
    width: 100%;
    justify-content: space-between;
  }
  .header-top {
    flex-wrap: wrap;
    justify-content: center;
  }
  .search-field {
    width: 100%;
    order: 3;
  }
  .footer-info {
    flex-direction: column;
    gap: 40px;
  }
  .footer-nav {
    flex-direction: column;
    gap: 30px;
  }
  .search-results {
    width: 90%;
  }
}
</style>