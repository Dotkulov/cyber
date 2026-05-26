<template>
  <div class="home-container">
    <div class="parent">
      <!-- HEADER TOP -->
      <div class="div2 header-top">
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

      <!-- БАННЕР IPhone 14 Pro -->
      <div class="div3 banner-main">
        <div class="banner-content">
          <div class="titles-block">
            <div class="pro-beyond">Pro.Beyond.</div>
            <h1 class="iphone-title">IPhone 14 Pro</h1>
            <p class="banner-desc">Created to change everything for the better. For everyone</p>
          </div>
          <button class="btn-outline-light" @click="$router.push('/catalog')">Shop Now</button>
        </div>
        <div class="banner-iphone-img">
          <img src="/images/iphone-image.png" alt="iPhone 14 Pro">
        </div>
      </div>

      <!-- Macbook Air -->
      <div class="div4 macbook-air-block">
        <div class="square-text">
          <div class="title-text-block">
            <h2>Macbook Air</h2>
            <p>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
          </div>
          <button class="btn-small-outline" @click="$router.push('/catalog')">Shop Now</button>
        </div>
        <img src="/images/macbookbanner.png" alt="MacBook Air">
      </div>

      <!-- Playstation 5 -->
      <div class="div5 playstation-block">
        <div class="square-text-dark">
          <h2>Playstation 5</h2>
          <p>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
        </div>
        <img src="/images/PlayStation.png" alt="PlayStation 5">
      </div>

      <!-- Apple AirPods Max -->
      <div class="div6 airpods-block">
        <div class="square-text-light">
          <h3>Apple AirPods Max</h3>
          <p>Computational audio. Listen, it's powerful!</p>
        </div>
        <img src="/images/hero__gnfk5g59t0qe_xlarge_2x-1.png" alt="AirPods Max">
      </div>

      <!-- Apple Vision Pro -->
      <div class="div7 vision-block">
        <div class="square-text-light">
          <h3>Apple Vision Pro</h3>
          <p>An immersive way to experience entertainment.</p>
        </div>
        <img src="/images/image-36.png" alt="Vision Pro">
      </div>

      <CategorySection />
      <ProductsSection />
      <BannersRow />
      <DiscountSection />
      <SummerBanner />
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import { useFavoritesStore } from '../stores/favoritesStore'
import CategorySection from '../components/CategorySection.vue'
import ProductsSection from '../components/ProductsSection.vue'
import BannersRow from '../components/BannersRow.vue'
import DiscountSection from '../components/DiscountSection.vue'
import SummerBanner from '../components/SummerBanner.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const allProducts = computed(() => productsStore.getAllProducts)
const cartCount = computed(() => cartStore.itemCount)

// Товары со скидкой
const discountedProducts = computed(() => {
  const withOriginalDiscount = allProducts.value.filter(p => p.oldPrice)
  if (withOriginalDiscount.length >= 4) {
    return withOriginalDiscount.slice(0, 4)
  }
  return allProducts.value.slice(0, 4).map(p => ({
    ...p,
    oldPrice: p.oldPrice || Math.round(p.price * 1.3)
  }))
})

// Табы
const activeTab = ref('new')

// Баннеры
const banners = ref([
  { title: 'Popular Products', description: 'iPad combines a magnificent 10.2-inch Retina display...', image: '/images/Popular-Products.png', bgColor: '#FFFFFF', whiteText: false },
  { title: 'iPad Pro', description: 'iPad combines a magnificent 10.2-inch Retina display...', image: '/images/Ipad-Pro.png', bgColor: '#F9F9F9', whiteText: false },
  { title: 'Samsung Galaxy', description: 'iPad combines a magnificent 10.2-inch Retina display...', image: '/images/Samsung-Galaxy-.png', bgColor: '#EAEAEA', whiteText: false },
  { title: 'Macbook Pro', description: 'iPad combines a magnificent 10.2-inch Retina display...', image: '/images/Macbook-Pro.png', bgColor: '#2C2C2C', whiteText: true }
])

// Товары для отображения в зависимости от таба
const displayProductsData = computed(() => {
  if (activeTab.value === 'new') {
    return allProducts.value.slice(0, 8)
  } else if (activeTab.value === 'bestseller') {
    return [...allProducts.value].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8)
  } else {
    return [...allProducts.value].slice(0, 8)
  }
})

const displayProducts = computed(() => {
  const rows = []
  for (let i = 0; i < displayProductsData.value.length; i += 4) {
    rows.push(displayProductsData.value.slice(i, i + 4))
  }
  return rows
})

// Поиск
const searchQuery = ref('')
const searchResults = ref([])
const showSearchResults = ref(false)
const searchInput = ref(null)
const categoriesContainer = ref(null)

const onSearch = () => {
  if (searchQuery.value.trim()) {
    searchResults.value = allProducts.value.filter(product =>
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

const scrollCategories = (direction) => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollLeft += direction * 200
  }
}

// Избранное
const isFavorite = (id) => favoritesStore.isFavorite(id)

const toggleFavorite = (product) => {
  favoritesStore.toggleItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    sku: product.sku
  })
}

// Корзина
const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    sku: product.sku
  })
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
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.parent {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(35, auto);
  gap: 0px;
  max-width: 1440px;
  margin: 0 auto;
  background: #FFFFFF;
  width: 100%;
}

.div2 { grid-column: span 4 / span 4; }
.div3 { grid-column: span 4 / span 4; grid-row: span 6 / span 6; grid-row-start: 2; }
.div4 { grid-column: span 2 / span 2; grid-row: span 4 / span 4; grid-column-start: 3; grid-row-start: 8; }
.div5 { grid-column: span 2 / span 2; grid-row: span 2 / span 2; grid-column-start: 1; grid-row-start: 8; }
.div6 { grid-row: span 2 / span 2; grid-row-start: 10; }
.div7 { grid-row: span 2 / span 2; grid-row-start: 10; }
.div10 { grid-column: span 4 / span 4; grid-row: span 2 / span 2; grid-row-start: 12; }
.div11 { grid-column: span 4 / span 4; grid-row: span 7 / span 7; grid-row-start: 14; }
.div12 { grid-column: span 4 / span 4; grid-row: span 4 / span 4; grid-row-start: 21; }
.div13 { grid-column: span 4 / span 4; grid-row: span 3 / span 3; grid-row-start: 25; }
.div14 { grid-column: span 4 / span 4; grid-row: span 3 / span 3; grid-row-start: 28; }
.div15 { grid-column: span 4 / span 4; grid-row: span 4 / span 4; grid-row-start: 31; }

/* ===== HEADER ===== */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 160px;
  background: #FFFFFF;
  border-bottom: 1px solid #B5B5B5;
}

.logo-img { height: 45px; cursor: pointer; }

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
}

.header-icons { display: flex; gap: 20px; }
.icon-favorite, .icon-cart { width: 28px; height: 28px; cursor: pointer; position: relative; }
.icon-favorite { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M16 28.7l-1.45-1.32C7.8 21.2 4 17.6 4 13.1 4 9.5 6.5 7 10.1 7c2.2 0 4.3 1.1 5.9 2.9C17.6 8.1 19.7 7 21.9 7c3.6 0 6.1 2.5 6.1 6.1 0 4.5-3.8 8.1-10.55 14.28L16 28.7z" fill="black"/></svg>'); }
.icon-cart { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M8 10h16l-2 12H10L8 10z" stroke="black" fill="none" stroke-width="1.5"/><circle cx="12" cy="24" r="1.5" fill="black"/><circle cx="20" cy="24" r="1.5" fill="black"/></svg>'); }
.cart-badge { position: absolute; top: -8px; right: -8px; background: #FF4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; display: flex; align-items: center; justify-content: center; }

/* ===== БАННЕР ===== */
.banner-main {
  background: linear-gradient(90.7deg, #211C24 0.64%, #211C24 101%);
  padding: 60px 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 520px;
  position: relative;
  overflow: hidden;
}
.banner-content { max-width: 600px; z-index: 2; }
.pro-beyond { font-size: 22px; color: #FFF; opacity: 0.4; }
.iphone-title { font-size: 72px; color: #FFF; font-family: 'Abel'; margin: 16px 0; }
.banner-desc { font-size: 16px; color: #919191; margin: 20px 0 32px; }
.btn-outline-light { background: transparent; border: 1px solid #FFF; border-radius: 6px; padding: 14px 48px; color: #FFF; cursor: pointer; }
.banner-iphone-img { position: absolute; right: 0; top: 0; width: 55%; height: 100%; display: flex; align-items: flex-end; }
.banner-iphone-img img { height: 150%; position: relative; right: -60px; bottom: -340px; }

/* ===== MACBOOK AIR ===== */
.macbook-air-block {
  background: #EDEDED;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  gap: 20px;
  overflow: hidden;
}
.macbook-air-block .square-text { flex: 1; text-align: left; }
.macbook-air-block h2 { font-size: 36px; margin-bottom: 16px; font-weight: 400; }
.macbook-air-block p { font-size: 16px; line-height: 1.5; color: #919191; margin-bottom: 20px; }
.macbook-air-block img { width: 700px; height: auto; position: relative; right: -280px; flex-shrink: 0; }

/* ===== PLAYSTATION ===== */
.playstation-block {
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding: 0;
  gap: 0;
  overflow: hidden;
}
.playstation-block .square-text-dark { max-width: 280px; text-align: right; padding: 20px 32px; }
.playstation-block h2 { font-size: 36px; margin-bottom: 16px; font-weight: 400; }
.playstation-block p { font-size: 16px; line-height: 1.5; color: #919191; }
.playstation-block img { width: 360px; height: auto; margin-left: -60px; }

/* ===== AIRPODS ===== */
.airpods-block {
  background: #EDEDED;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  padding: 24px 32px;
  gap: 16px;
  overflow: hidden;
}
.airpods-block .square-text-light { max-width: 220px; z-index: 2; }
.airpods-block h3 { font-size: 24px; font-weight: 400; margin-bottom: 10px; color: #000000; }
.airpods-block p { font-size: 14px; line-height: 1.4; color: #919191; }
.airpods-block img { width: 220px; height: auto; margin-left: -160px; }

/* ===== VISION PRO ===== */
.vision-block {
  background: #353535;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  padding: 24px 32px;
  gap: 16px;
  overflow: hidden;
}
.vision-block .square-text-light { max-width: 160px; z-index: 2; }
.vision-block h3 { font-size: 24px; font-weight: 400; margin-bottom: 10px; color: #ffffff; }
.vision-block p { font-size: 14px; line-height: 1.4; color: #919191; }
.vision-block img { width: 220px; height: auto; margin-left: -100px; }

.btn-small-outline { background: transparent; border: 1px solid #000; padding: 10px 32px; border-radius: 6px; margin-top: 16px; cursor: pointer; }

/* ===== КАТЕГОРИИ ===== */
.category-section { padding: 80px 160px; background: #FAFAFA; }
.category-header { display: flex; justify-content: space-between; margin-bottom: 32px; }
.category-header h2 { font-size: 24px; font-family: 'ABeeZee'; font-style: italic; }
.arrows { display: flex; gap: 16px; }
.arrow-left, .arrow-right { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 28px; background: transparent; border: 1px solid #ddd; border-radius: 50%; }
.categories-grid { display: flex; gap: 32px; overflow-x: auto; scroll-behavior: smooth; padding-bottom: 8px; }
.category-card { background: #EDEDED; border-radius: 15px; width: 140px; height: 128px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; cursor: pointer; flex-shrink: 0; transition: transform 0.3s; }
.category-card:hover { transform: translateY(-5px); }
.cat-icon-img { width: 48px; height: 48px; }

/* ===== ТОВАРЫ ===== */
.products-section { padding: 56px 160px; background: #FFFFFF; }
.product-tabs { display: flex; gap: 32px; margin-bottom: 32px; }
.product-tabs span { font-size: 18px; cursor: pointer; color: #8B8B8B; transition: color 0.3s; }
.product-tabs span:hover { color: #000; }
.tab-active { color: #000000 !important; border-bottom: 2px solid #000000; }
.products-grid { display: flex; flex-direction: column; gap: 16px; }
.products-row { display: flex; gap: 16px; flex-wrap: wrap; }
.product-card { background: #F7F7F7; border-radius: 9px; padding: 24px 16px; flex: 1; min-width: 200px; display: flex; flex-direction: column; align-items: center; gap: 16px; cursor: pointer; position: relative; transition: transform 0.3s, box-shadow 0.3s; }
.product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
.like-icon { width: 32px; height: 32px; position: relative; margin-left: auto; cursor: pointer; }
.like-icon::before { content: "♡"; position: absolute; font-size: 34px; color: rgba(145,145,145,0.77); }
.like-icon.liked::before { content: "♥"; color: #ff0000; }
.product-img { width: 160px; height: 160px; object-fit: contain; cursor: pointer; }
.product-title { font-size: 16px; font-family: 'ABeeZee'; font-style: italic; text-align: center; }
.product-price { font-size: 24px; font-family: 'Abel'; }
.btn-black { background: #000; color: #fff; padding: 12px 0; width: 186px; border: none; border-radius: 8px; cursor: pointer; transition: background 0.3s; }
.btn-black:hover { background: #333; }

/* ===== СКИДКИ ===== */
.discount-section { padding: 60px 160px; background: #FFF; }
.discount-section h2 { font-size: 32px; margin-bottom: 40px; font-family: 'ABeeZee'; font-style: italic; }
.discount-grid { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
.price-wrapper { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.product-old-price { font-size: 14px; color: #999; text-decoration: line-through; font-family: 'Abel'; }

/* ===== БАННЕРЫ ===== */
.banners-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.big-banner-card { padding: 32px 28px 48px; min-height: 520px; text-align: center; transition: transform 0.3s; cursor: pointer; }
.big-banner-card:hover { transform: translateY(-5px); }
.banner-top-img { width: 280px; margin-bottom: 24px; }
.banner-text-block h2 { font-size: 28px; margin-bottom: 16px; }
.banner-text-block p { font-size: 13px; color: #666; margin-bottom: 24px; }
.white-text h2, .white-text p { color: #FFF; }
.btn-outline-dark { border: 1px solid #000; background: transparent; padding: 12px 36px; border-radius: 6px; cursor: pointer; transition: all 0.3s; }
.btn-outline-dark:hover { background: #000; color: #fff; }

/* ===== ЛЕТНИЙ БАННЕР ===== */
.summer-banner { background: linear-gradient(100.23deg, #2E2E2E 42.36%, #000000 98.65%); min-height: 448px; position: relative; overflow: hidden; }
.summer-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 480px; z-index: 10; }
.summer-content h2 { font-size: 72px; color: #FFF; margin-bottom: 16px; }
.summer-content p { font-size: 16px; color: #787878; margin-bottom: 32px; }
.summer-img { position: absolute; z-index: 1; }
.img-6 { left: 3.49%; top: 10%; max-width: 230px; z-index: 5; }
.img-8 { left: 87.25%; top: -0.26%; transform: matrix(0.85, -0.52, 0.52, 0.85, 0, 0); max-width: 180px; z-index: 2; }
.img-jbl { left: 0%; top: 57.39%; transform: matrix(-2, 0, 0, 2, 0, 0); max-width: 220px; z-index: 1; }
.img-7 { left: 72.43%; top: 55.13%; max-width: 300px; z-index: 2; }
.img-18 { left: 15.71%; top: -30.67%; max-width: 250px; z-index: 3; }

/* ===== SEARCH OVERLAY ===== */
.search-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; justify-content: center; padding-top: 80px; }
.search-results { background: white; width: 500px; max-height: 500px; overflow-y: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
.search-results-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #eee; }
.close-search { background: none; border: none; font-size: 20px; cursor: pointer; }
.search-result-item { display: flex; gap: 12px; padding: 12px 20px; cursor: pointer; transition: background 0.2s; }
.search-result-item:hover { background: #f5f5f5; }
.search-result-img { width: 50px; height: 50px; object-fit: contain; }
.view-all-results { padding: 12px 20px; text-align: center; cursor: pointer; color: #0066cc; border-top: 1px solid #eee; }
.no-results { text-align: center; padding: 40px; }
.browse-catalog { background: #000; color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; }

/* ===== АДАПТАЦИЯ ===== */
@media (max-width: 1200px) {
  .header-top, .banner-main, .category-section, .products-section, .discount-section {
    padding: 16px 40px;
  }
  .banner-main { padding: 40px; }
  .iphone-title { font-size: 52px; }
  .macbook-air-block img { width: 400px; right: -150px; }
  .playstation-block img { width: 280px; margin-left: -40px; }
  .airpods-block img, .vision-block img { width: 160px; }
  .banners-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .parent { display: block; }
  .header-top { flex-wrap: wrap; justify-content: center; padding: 16px 20px; }
  .search-field { width: 100%; order: 3; }
  .banner-main { flex-direction: column; text-align: center; padding: 40px 20px; }
  .iphone-title { font-size: 42px; }
  .banner-iphone-img { position: relative; width: 100%; margin-top: 30px; }
  .banner-iphone-img img { width: 200px; margin: 0 auto; right: auto; bottom: auto; height: auto; }
  .macbook-air-block, .playstation-block, .airpods-block, .vision-block {
    flex-direction: column !important;
    text-align: center;
    padding: 32px 20px !important;
  }
  .macbook-air-block .square-text, .playstation-block .square-text-dark,
  .airpods-block .square-text-light, .vision-block .square-text-light {
    text-align: center;
    max-width: 100%;
  }
  .macbook-air-block img, .playstation-block img,
  .airpods-block img, .vision-block img {
    width: 70% !important;
    margin: 0 auto !important;
    position: static !important;
  }
  .products-row { flex-direction: column; }
  .discount-grid { flex-direction: column; align-items: center; }
  .banners-row { grid-template-columns: 1fr; }
  .category-section, .products-section, .discount-section { padding: 40px 20px; }
  .summer-content { width: 90%; position: relative; top: auto; left: auto; transform: none; padding: 60px 20px; margin: 0 auto; }
  .summer-content h2 { font-size: 40px; }
  .summer-img { opacity: 0.3; max-width: 120px; }
  .search-results { width: 90%; }
}
</style>