<template>
  <div class="product-details-page">
    <!-- HEADER TOP -->
    <div class="header-top">
      <div class="logo" @click="$router.push('/')">
        <img src="/images/logoblack.png" alt="7cyber" class="logo-img">
      </div>
      <div class="search-field" @click="focusSearch">
        <div class="search-icon"></div>
        <input type="text" class="search-input" placeholder="Search" v-model="searchQuery" @input="onSearch" @focus="showSearchResults = true" ref="searchInput">
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

    <!-- MAIN INFO -->
    <div class="main-info">
      <div class="images-section">
        <div class="thumbnails">
          <img v-for="(img, idx) in productImages" :key="idx" :src="img" :class="['thumbnail', { active: currentImage === img }]" @click="currentImage = img">
        </div>
        <div class="main-image">
          <img :src="currentImage" :alt="product?.name">
        </div>
      </div>
      <div class="info-section">
        <div class="product-title-block">
          <h1>{{ product?.name }}</h1>
          <div class="price-block">
            <span class="current-price">${{ product?.price }}</span>
            <span v-if="product?.oldPrice" class="old-price">${{ product?.oldPrice }}</span>
            <span v-if="product?.discount" class="discount-badge">-{{ product.discount }}%</span>
          </div>
          <div class="rating" v-if="product?.rating">
            <span class="stars">★★★★★</span>
            <span class="rating-value">{{ product.rating }}</span>
            <span class="reviews-count">(125 reviews)</span>
          </div>
        </div>

        <div class="specs-grid">
          <div class="spec-item">
            <div class="spec-icon"><img src="/images/icon1.png" class="spec-icon-img"></div>
            <span class="spec-label">Screen size<br>6.7"</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon"><img src="/images/icon3.png" class="spec-icon-img"></div>
            <span class="spec-label">CPU<br>Apple A16 Bionic</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon"><img src="/images/icon5.png" class="spec-icon-img"></div>
            <span class="spec-label">Number of Cores<br>6</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon"><img src="/images/icon2.png" class="spec-icon-img"></div>
            <span class="spec-label">Main camera<br>48-12 MP</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon"><img src="/images/icon4.png" class="spec-icon-img"></div>
            <span class="spec-label">Front-camera<br>12 MP</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon"><img src="/images/icon6.png" class="spec-icon-img"></div>
            <span class="spec-label">Battery capacity<br>4323 mAh</span>
          </div>
        </div>

        <div class="color-selection">
          <span class="selection-label">Color:</span>
          <div class="color-options">
            <div class="color-option" :class="{ active: selectedColor === 'purple' }" style="background: #6B3FA0;" @click="selectedColor = 'purple'"></div>
            <div class="color-option" :class="{ active: selectedColor === 'gold' }" style="background: #F5D76E;" @click="selectedColor = 'gold'"></div>
            <div class="color-option" :class="{ active: selectedColor === 'black' }" style="background: #1A1A1A;" @click="selectedColor = 'black'"></div>
            <div class="color-option" :class="{ active: selectedColor === 'silver' }" style="background: #C0C0C0;" @click="selectedColor = 'silver'"></div>
          </div>
        </div>

        <div class="memory-selection">
          <span class="selection-label">Storage:</span>
          <div class="memory-options">
            <div class="memory-option" :class="{ active: selectedMemory === '128GB' }" @click="selectedMemory = '128GB'">128GB</div>
            <div class="memory-option" :class="{ active: selectedMemory === '256GB' }" @click="selectedMemory = '256GB'">256GB</div>
            <div class="memory-option" :class="{ active: selectedMemory === '512GB' }" @click="selectedMemory = '512GB'">512GB</div>
            <div class="memory-option" :class="{ active: selectedMemory === '1TB' }" @click="selectedMemory = '1TB'">1TB</div>
          </div>
        </div>

        <p class="product-description">Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos in weak, yes and in bright lighting the new system with two cameras more...</p>

        <div class="action-buttons">
          <button class="btn-wishlist" @click="toggleFavorite">
            <span>❤️</span> Add to Wishlist
          </button>
          <button class="btn-add-to-card" @click="addToCart">
            <span>🛒</span> Add to Cart
          </button>
        </div>

        <div class="features">
          <div class="feature">
            <div class="feature-icon"><img src="/images/icon-7.png" class="feature-icon-img"></div>
            <span>Free Delivery<br>1-2 day</span>
          </div>
          <div class="feature">
            <div class="feature-icon"><img src="/images/icon-8.png" class="feature-icon-img"></div>
            <span>In Stock Today</span>
          </div>
          <div class="feature">
            <div class="feature-icon"><img src="/images/icon-9.png" class="feature-icon-img"></div>
            <span>Guaranteed<br>1 year</span>
          </div>
        </div>
      </div>
    </div>

    <!-- DETAILS SECTION -->
    <div class="details-section">
      <div class="details-container">
        <h2>Details</h2>
        <p class="details-text">Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.</p>
        <div class="specs-table">
          <div class="spec-row"><span class="spec-name">Screen diagonal</span><span class="spec-value">6.7"</span></div>
          <div class="spec-row"><span class="spec-name">The screen resolution</span><span class="spec-value">2796x1290</span></div>
          <div class="spec-row"><span class="spec-name">The screen refresh rate</span><span class="spec-value">120 Hz</span></div>
          <div class="spec-row"><span class="spec-name">The pixel density</span><span class="spec-value">460 ppi</span></div>
          <div class="spec-row"><span class="spec-name">Screen type</span><span class="spec-value">OLED</span></div>
          <div class="spec-row"><span class="spec-name">Additionally</span><span class="spec-value">Dynamic Island<br>Always-On display<br>HDR display<br>True Tone<br>Wide color (P3)</span></div>
          <div class="spec-row"><span class="spec-name">CPU</span><span class="spec-value">A16 Bionic</span></div>
          <div class="spec-row"><span class="spec-name">RAM</span><span class="spec-value">6GB</span></div>
        </div>
      </div>
    </div>

    <!-- REVIEWS SECTION -->
    <div class="reviews-section">
      <div class="reviews-container">
        <div class="rating-block">
          <div class="rating-number">4.8</div>
          <div class="rating-stars">★★★★★</div>
          <div class="rating-count">of 125 reviews</div>
        </div>
        <div class="reviews-list">
          <div class="review-item">
            <div class="reviewer">
              <span class="reviewer-name">John D.</span>
              <span class="review-date">Verified Purchase</span>
            </div>
            <div class="review-stars">★★★★★</div>
            <p class="review-text">Amazing phone! The battery life is incredible and the camera quality is outstanding.</p>
          </div>
          <div class="review-item">
            <div class="reviewer">
              <span class="reviewer-name">Sarah M.</span>
              <span class="review-date">Verified Purchase</span>
            </div>
            <div class="review-stars">★★★★☆</div>
            <p class="review-text">Great phone, but a bit expensive. The display is beautiful though.</p>
          </div>
          <div class="review-item">
            <div class="reviewer">
              <span class="reviewer-name">Mike R.</span>
              <span class="review-date">Verified Purchase</span>
            </div>
            <div class="review-stars">★★★★★</div>
            <p class="review-text">Best iPhone yet! Fast, smooth, and the camera is amazing.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- RELATED PRODUCTS -->
    <div class="related-products">
      <h2>Related Products</h2>
      <div class="related-grid">
        <div v-for="related in relatedProducts" :key="related.id" class="product-card" @click="goToProduct(related.id)">
          <div class="like-icon" :class="{ liked: isFavorite(related.id) }" @click.stop="toggleFavorite(related)"></div>
          <img :src="related.image" :alt="related.name" class="product-img">
          <div class="product-info">
            <p class="product-title">{{ related.name }}</p>
            <span class="product-price">${{ related.price }}</span>
          </div>
          <button class="btn-buy" @click.stop="addToCart(related)">Buy Now</button>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import { useFavoritesStore } from '../stores/favoritesStore'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

// Товар
const product = computed(() => productsStore.getProductById(parseInt(route.params.id)))
const cartCount = computed(() => cartStore.itemCount)

// Изображения - динамически для каждого товара
const productImages = computed(() => {
  if (!product.value) return []
  return [product.value.image]
})

const currentImage = ref('')

// Следить за изменением товара
watch(product, (newProduct) => {
  if (newProduct && productImages.value.length > 0) {
    currentImage.value = productImages.value[0]
  }
}, { immediate: true })

// Выбор опций
const selectedColor = ref('purple')
const selectedMemory = ref('256GB')

// Поиск
const searchQuery = ref('')
const searchResults = ref([])
const showSearchResults = ref(false)
const searchInput = ref(null)

// Related Products
const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.getAllProducts
    .filter(p => p.id !== product.value.id && p.category === product.value.category)
    .slice(0, 4)
})

// Методы
const isFavorite = (id) => {
  return favoritesStore.isFavorite(id)
}

const toggleFavorite = (item) => {
  const productToToggle = item || product.value
  if (productToToggle) {
    favoritesStore.toggleItem({
      id: productToToggle.id,
      name: productToToggle.name,
      price: productToToggle.price,
      image: productToToggle.image,
      sku: productToToggle.sku
    })
  }
}

const addToCart = (item) => {
  const productToAdd = item || product.value
  if (productToAdd) {
    cartStore.addItem({
      id: productToAdd.id,
      name: productToAdd.name,
      price: productToAdd.price,
      image: productToAdd.image,
      sku: productToAdd.sku,
      quantity: 1
    })
  }
}

const goToProduct = (id) => {
  router.push(`/product/${id}`)
  window.scrollTo(0, 0)
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

const handleClickOutside = (event) => {
  if (!event.target.closest('.search-field') && !event.target.closest('.search-overlay')) {
    showSearchResults.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (product.value) {
    document.title = `${product.value.name} | 7cyber`
  }
})
</script>

<style scoped>
.product-details-page {
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
  transition: background 0.2s;
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

.view-all-results {
  padding: 12px 20px;
  text-align: center;
  cursor: pointer;
  color: #0066cc;
  border-top: 1px solid #eee;
}

.no-results {
  text-align: center;
  padding: 40px;
}

.browse-catalog {
  background: #000;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}

/* MAIN INFO */
.main-info {
  flex: 1;
  display: flex;
  padding: 112px 160px;
  gap: 48px;
}

.images-section {
  display: flex;
  gap: 48px;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.thumbnail {
  width: 75px;
  height: 93px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
  border-radius: 8px;
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #000;
}

.main-image {
  width: 413px;
}

.main-image img {
  width: 100%;
  height: auto;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 536px;
}

.product-title-block h1 {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 40px;
  margin-bottom: 16px;
}

.price-block {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.current-price {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 32px;
  font-weight: bold;
}

.old-price {
  font-family: 'Abel';
  font-size: 24px;
  text-decoration: line-through;
  color: #A0A0A0;
}

.discount-badge {
  background: #ff0000;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #FFB547;
  font-size: 18px;
}

.rating-value {
  font-family: 'ABeeZee';
  font-size: 14px;
}

.reviews-count {
  font-family: 'ABeeZee';
  font-size: 14px;
  color: #666;
}

.specs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.spec-item {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;
  width: 168px;
  background: #F4F4F4;
  border-radius: 7px;
}

.spec-icon-img {
  width: 24px;
  height: 24px;
}

.spec-label {
  font-family: 'Abel';
  font-size: 14px;
  color: #A7A7A7;
}

.color-selection, .memory-selection {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.selection-label {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  font-weight: bold;
}

.color-options {
  display: flex;
  gap: 12px;
}

.color-option {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.color-option.active {
  border-color: #000;
  transform: scale(1.1);
}

.memory-options {
  display: flex;
  gap: 12px;
}

.memory-option {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  transition: all 0.3s;
}

.memory-option.active {
  background: #000;
  color: white;
  border-color: #000;
}

.product-description {
  font-family: 'Abel';
  font-size: 14px;
  line-height: 24px;
  color: #6C6C6C;
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.btn-wishlist, .btn-add-to-card {
  flex: 1;
  padding: 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-wishlist {
  background: transparent;
  border: 1px solid #000;
  color: #000;
}

.btn-add-to-card {
  background: #000;
  border: none;
  color: #fff;
}

.features {
  display: flex;
  gap: 32px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.feature-icon {
  width: 56px;
  height: 56px;
  background: #F6F6F6;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon-img {
  width: 40px;
  height: 40px;
}

.feature span {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  color: #717171;
}

/* DETAILS SECTION */
.details-section {
  background: #FAFAFA;
  padding: 80px 160px;
}

.details-container {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 48px 40px;
}

.details-container h2 {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 24px;
  margin-bottom: 32px;
}

.details-text {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  line-height: 24px;
  color: #9D9D9D;
  margin-bottom: 40px;
}

.specs-table {
  display: flex;
  flex-direction: column;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 0.5px solid #CDCDCD;
}

.spec-name {
  font-family: 'Abel';
  font-size: 16px;
  font-weight: bold;
}

.spec-value {
  font-family: 'Abel';
  font-size: 15px;
  text-align: right;
}

/* REVIEWS SECTION */
.reviews-section {
  padding: 88px 160px;
}

.reviews-container {
  display: flex;
  gap: 48px;
}

.rating-block {
  background: #FAFAFA;
  border-radius: 25px;
  padding: 32px;
  text-align: center;
  width: 200px;
}

.rating-number {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 56px;
}

.rating-stars {
  font-size: 24px;
  color: #FFB547;
  margin: 16px 0 8px;
}

.reviews-list {
  flex: 1;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.reviewer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.reviewer-name {
  font-family: 'ABeeZee';
  font-style: italic;
  font-weight: bold;
}

.review-date {
  font-family: 'Abel';
  font-size: 12px;
  color: #666;
}

.review-stars {
  color: #FFB547;
  margin-bottom: 8px;
}

.review-text {
  font-family: 'Abel';
  font-size: 14px;
  color: #666;
}

/* RELATED PRODUCTS */
.related-products {
  padding: 80px 160px;
  background: #FFFFFF;
}

.related-products h2 {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 24px;
  margin-bottom: 32px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.product-card {
  background: #F7F7F7;
  border-radius: 9px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

.like-icon {
  width: 32px;
  height: 32px;
  position: relative;
  margin-left: auto;
  cursor: pointer;
}

.like-icon::before {
  content: "♡";
  position: absolute;
  font-size: 28px;
  color: rgba(145,145,145,0.77);
}

.like-icon.liked::before {
  content: "♥";
  color: #ff0000;
}

.product-img {
  width: 160px;
  height: 160px;
  object-fit: contain;
}

.product-title {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  margin: 16px 0 8px;
}

.product-price {
  font-family: 'Abel';
  font-size: 20px;
  font-weight: bold;
}

.btn-buy {
  background: #000;
  color: #fff;
  padding: 10px 0;
  width: 140px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
}

/* FOOTER */
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

/* Responsive */
@media (max-width: 1200px) {
  .header-top, .main-info, .details-section, .reviews-section, .related-products, .footer {
    padding: 16px 40px;
  }
  .main-info {
    padding: 40px;
    flex-direction: column;
  }
  .info-section {
    width: 100%;
  }
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .reviews-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .images-section {
    flex-direction: column-reverse;
    align-items: center;
  }
  .thumbnails {
    flex-direction: row;
  }
  .main-image {
    width: 100%;
  }
  .action-buttons {
    flex-direction: column;
  }
  .features {
    flex-wrap: wrap;
  }
  .related-grid {
    grid-template-columns: 1fr;
  }
  .header-top {
    flex-wrap: wrap;
    justify-content: center;
  }
  .search-field {
    width: 100%;
    order: 3;
  }
  .search-results {
    width: 90%;
  }
  .details-section, .reviews-section {
    padding: 40px 20px;
  }
}
</style>