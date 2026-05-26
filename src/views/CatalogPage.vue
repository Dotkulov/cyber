<template>
  <div class="products-page">
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
    <div v-if="searchQuery && searchResults.length > 0" class="search-overlay" @click="clearSearch">
      <div class="search-results" @click.stop>
        <h3>Search Results ({{ searchResults.length }})</h3>
        <div v-for="product in searchResults" :key="product.id" class="search-result-item" @click="selectProduct(product)">
          <img :src="product.image" :alt="product.name" class="search-result-img">
          <div class="search-result-info">
            <p class="search-result-name">{{ product.name }}</p>
            <span class="search-result-price">${{ product.price }}</span>
          </div>
        </div>
        <div v-if="searchResults.length === 0 && searchQuery" class="no-results">
          No products found for "{{ searchQuery }}"
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="content-wrapper">
      <div class="content-row">

        <!-- FILTERS -->
        <div class="filters">
          <div class="filters-container">
            
            <!-- Search Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('search')">
                <span class="filter-title">Product Search</span>
                <div :class="['filter-icon', { expanded: openFilters.search }]"></div>
              </div>
              <div v-show="openFilters.search" class="filter-content">
                <div class="filter-search">
                  <div class="filter-search-icon"></div>
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    class="filter-search-input" 
                    v-model="filterSearchQuery"
                    @input="filterSearch"
                  >
                </div>
              </div>
            </div>

            <!-- Brand Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('brand')">
                <span class="filter-title">Brand</span>
                <div :class="['filter-icon', { expanded: openFilters.brand }]"></div>
              </div>
              <div v-show="openFilters.brand" class="filter-content">
                <div class="search-brands">
                  <div class="filter-search">
                    <div class="filter-search-icon"></div>
                    <input type="text" placeholder="Search brand" class="filter-search-input" v-model="brandSearch">
                  </div>
                  <div class="brands-list">
                    <div 
                      v-for="brand in filteredBrands" 
                      :key="brand.name" 
                      class="checkbox-field"
                      @click="toggleBrand(brand.name)"
                    >
                      <div :class="['checkbox', { checked: brand.selected }]"></div>
                      <span>{{ brand.name }} ({{ brand.count }})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Price Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('price')">
                <span class="filter-title">Price</span>
                <div :class="['filter-icon', { expanded: openFilters.price }]"></div>
              </div>
              <div v-show="openFilters.price" class="filter-content">
                <div class="price-range">
                  <div class="price-inputs">
                    <input type="number" v-model.number="priceMin" placeholder="Min" class="price-input">
                    <span>-</span>
                    <input type="number" v-model.number="priceMax" placeholder="Max" class="price-input">
                  </div>
                  <div class="price-values">
                    <span>${{ priceMin }}</span>
                    <span>${{ priceMax }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Battery capacity Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('battery')">
                <span class="filter-title">Battery capacity</span>
                <div :class="['filter-icon', { expanded: openFilters.battery }]"></div>
              </div>
              <div v-show="openFilters.battery" class="filter-content">
                <div class="filter-options">
                  <div v-for="battery in batteryOptions" :key="battery.value" class="checkbox-field" @click="toggleBattery(battery.value)">
                    <div :class="['checkbox', { checked: selectedBattery === battery.value }]"></div>
                    <span>{{ battery.label }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Screen type Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('screenType')">
                <span class="filter-title">Screen type</span>
                <div :class="['filter-icon', { expanded: openFilters.screenType }]"></div>
              </div>
              <div v-show="openFilters.screenType" class="filter-content">
                <div class="filter-options">
                  <div v-for="type in screenTypes" :key="type" class="checkbox-field" @click="toggleScreenType(type)">
                    <div :class="['checkbox', { checked: selectedScreenTypes.includes(type) }]"></div>
                    <span>{{ type }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Screen diagonal Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('diagonal')">
                <span class="filter-title">Screen diagonal</span>
                <div :class="['filter-icon', { expanded: openFilters.diagonal }]"></div>
              </div>
              <div v-show="openFilters.diagonal" class="filter-content">
                <div class="filter-options">
                  <div v-for="diag in diagonalOptions" :key="diag" class="checkbox-field" @click="toggleDiagonal(diag)">
                    <div :class="['checkbox', { checked: selectedDiagonals.includes(diag) }]"></div>
                    <span>{{ diag }}"</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Protection class Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('protection')">
                <span class="filter-title">Protection class</span>
                <div :class="['filter-icon', { expanded: openFilters.protection }]"></div>
              </div>
              <div v-show="openFilters.protection" class="filter-content">
                <div class="filter-options">
                  <div v-for="prot in protectionOptions" :key="prot" class="checkbox-field" @click="toggleProtection(prot)">
                    <div :class="['checkbox', { checked: selectedProtections.includes(prot) }]"></div>
                    <span>{{ prot }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Built-in memory Filter -->
            <div class="filter-item">
              <div class="filter-header" @click="toggleFilter('memory')">
                <span class="filter-title">Built-in memory</span>
                <div :class="['filter-icon', { expanded: openFilters.memory }]"></div>
              </div>
              <div v-show="openFilters.memory" class="filter-content">
                <div class="filter-options">
                  <div v-for="mem in memoryOptions" :key="mem" class="checkbox-field" @click="toggleMemory(mem)">
                    <div :class="['checkbox', { checked: selectedMemory.includes(mem) }]"></div>
                    <span>{{ mem }} GB</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- PRODUCTS -->
        <div class="products-container">
          <div class="products-wrapper">

            <div class="top-part">
              <div class="left-side">
                <span class="selected-text">Selected Products:</span>
                <span class="selected-number">{{ filteredProducts.length }}</span>
              </div>
              <div class="dropdown" @click="toggleSortMenu">
                <span class="dropdown-text">{{ sortLabel }}</span>
                <div class="dropdown-icon"></div>
                <div v-if="showSortMenu" class="sort-menu">
                  <div @click.stop="setSort('rating')">By rating</div>
                  <div @click.stop="setSort('price-asc')">Price: Low to High</div>
                  <div @click.stop="setSort('price-desc')">Price: High to Low</div>
                  <div @click.stop="setSort('name')">By name</div>
                </div>
              </div>
            </div>

            <div class="products-grid">
              <div v-for="(row, rowIndex) in productRows" :key="rowIndex" class="product-row">
                <div v-for="product in row" :key="product.id" class="product-card">
                  <div 
                    class="like-icon" 
                    :class="{ liked: isFavorite(product.id) }"
                    @click="toggleFavorite(product)"
                  ></div>
                  <img :src="product.image" :alt="product.name" class="product-img" @click="$router.push(`/product/${product.id}`)">
                  <div class="product-info">
                    <p class="product-title">{{ highlightSearchTerm(product.name) }}</p>
                    <span class="product-price">${{ product.price }}</span>
                  </div>
                  <button class="btn-buy" @click="addToCart(product)">Buy Now</button>
                </div>
              </div>
            </div>

            <div class="pagination" v-if="totalPages > 1">
              <div class="arrow-left-page" @click="prevPage">&lt;</div>
              <div class="page-numbers">
                <div 
                  v-for="page in visiblePages" 
                  :key="page"
                  :class="['page', { active: currentPage === page }]"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </div>
                <div v-if="showDots" class="page-dots">...</div>
              </div>
              <div class="arrow-right-page" @click="nextPage">&gt;</div>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import { useFavoritesStore } from '../stores/favoritesStore'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const allProducts = computed(() => productsStore.getAllProducts)
const cartCount = computed(() => cartStore.itemCount)

// Поиск
const searchQuery = ref('')
const filterSearchQuery = ref('')
const searchResults = ref([])
const searchInput = ref(null)

// Состояние открытых фильтров
const openFilters = ref({
  brand: true,
  price: false,
  battery: false,
  screenType: false,
  diagonal: false,
  protection: false,
  memory: false,
  search: false
})

// Brand filter
const brandSearch = ref('')
const brands = ref([
  { name: 'Apple', count: 110, selected: false },
  { name: 'Samsung', count: 125, selected: false },
  { name: 'Xiaomi', count: 68, selected: false },
  { name: 'Poco', count: 44, selected: false },
  { name: 'OPPO', count: 36, selected: false },
  { name: 'Honor', count: 10, selected: false },
  { name: 'Motorola', count: 34, selected: false },
  { name: 'Nokia', count: 22, selected: false },
  { name: 'Realme', count: 35, selected: false }
])

const filteredBrands = computed(() => {
  if (!brandSearch.value) return brands.value
  return brands.value.filter(b => b.name.toLowerCase().includes(brandSearch.value.toLowerCase()))
})

// Price filter
const priceMin = ref(0)
const priceMax = ref(3000)

// Battery filter
const batteryOptions = ref([
  { value: 'under4000', label: 'Under 4000 mAh' },
  { value: '4000-5000', label: '4000 - 5000 mAh' },
  { value: 'over5000', label: 'Over 5000 mAh' }
])
const selectedBattery = ref('')

// Screen type filter
const screenTypes = ref(['OLED', 'AMOLED', 'IPS LCD', 'Retina'])
const selectedScreenTypes = ref([])

// Screen diagonal filter
const diagonalOptions = ref([5.4, 6.1, 6.7, 6.9])
const selectedDiagonals = ref([])

// Protection class filter
const protectionOptions = ref(['IP67', 'IP68', 'Gorilla Glass', 'Ceramic Shield'])
const selectedProtections = ref([])

// Built-in memory filter
const memoryOptions = ref([64, 128, 256, 512, 1024])
const selectedMemory = ref([])

// Сортировка
const sortBy = ref('rating')
const sortLabel = ref('By rating')
const showSortMenu = ref(false)

// Пагинация
const currentPage = ref(1)
const itemsPerPage = 9

// Поиск товаров
const onSearch = () => {
  if (searchQuery.value.trim()) {
    searchResults.value = allProducts.value.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  } else {
    searchResults.value = []
  }
}

const filterSearch = () => {
  currentPage.value = 1
}

const focusSearch = () => {
  searchInput.value?.focus()
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
}

const selectProduct = (product) => {
  searchQuery.value = ''
  searchResults.value = []
  window.location.href = `/product/${product.id}`
}

const highlightSearchTerm = (text) => {
  if (!filterSearchQuery.value && !searchQuery.value) return text
  const term = filterSearchQuery.value || searchQuery.value
  if (!term) return text
  const regex = new RegExp(`(${term})`, 'gi')
  return text.replace(regex, '<mark class="search-highlight">$1</mark>')
}

// Фильтрация товаров
const filteredProducts = computed(() => {
  let products = [...allProducts.value]
  
  // Поиск по тексту
  if (filterSearchQuery.value) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(filterSearchQuery.value.toLowerCase())
    )
  }
  
  // Фильтр по брендам
  const activeBrands = brands.value.filter(b => b.selected).map(b => b.name)
  if (activeBrands.length > 0) {
    products = products.filter(p => activeBrands.some(brand => p.name.includes(brand)))
  }
  
  // Фильтр по цене
  products = products.filter(p => p.price >= priceMin.value && p.price <= priceMax.value)
  
  // Фильтр по батарее
  if (selectedBattery.value === 'under4000') {
    products = products.filter(p => p.battery < 4000)
  } else if (selectedBattery.value === '4000-5000') {
    products = products.filter(p => p.battery >= 4000 && p.battery <= 5000)
  } else if (selectedBattery.value === 'over5000') {
    products = products.filter(p => p.battery > 5000)
  }
  
  // Фильтр по типу экрана
  if (selectedScreenTypes.value.length > 0) {
    products = products.filter(p => selectedScreenTypes.value.includes(p.screenType))
  }
  
  // Фильтр по диагонали
  if (selectedDiagonals.value.length > 0) {
    products = products.filter(p => selectedDiagonals.value.includes(p.diagonal))
  }
  
  // Фильтр по защите
  if (selectedProtections.value.length > 0) {
    products = products.filter(p => selectedProtections.value.some(prot => p.protection?.includes(prot)))
  }
  
  // Фильтр по памяти
  if (selectedMemory.value.length > 0) {
    products = products.filter(p => selectedMemory.value.includes(p.memory))
  }
  
  // Сортировка
  if (sortBy.value === 'rating') {
    products.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sortBy.value === 'price-asc') {
    products.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    products.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name))
  }
  
  return products
})

// Добавляем дополнительные данные к товарам
const enrichProducts = () => {
  allProducts.value.forEach(product => {
    if (product.name.includes('iPhone')) {
      product.battery = 4323
      product.screenType = 'OLED'
      product.diagonal = 6.7
      product.protection = 'Ceramic Shield, IP68'
      product.memory = parseInt(product.name.match(/\d+GB/)?.[0] || 128)
      product.rating = 4.8
    } else if (product.name.includes('Samsung') || product.name.includes('Galaxy')) {
      product.battery = 5000
      product.screenType = 'AMOLED'
      product.diagonal = 6.8
      product.protection = 'Gorilla Glass, IP68'
      product.memory = parseInt(product.name.match(/\d+GB/)?.[0] || 256)
      product.rating = 4.7
    } else if (product.name.includes('Watch')) {
      product.battery = 300
      product.screenType = 'Retina'
      product.diagonal = 1.8
      product.protection = 'IP68'
      product.memory = 32
      product.rating = 4.9
    } else if (product.name.includes('AirPods')) {
      product.battery = 500
      product.screenType = null
      product.diagonal = null
      product.protection = 'IP54'
      product.memory = null
      product.rating = 4.7
    } else if (product.name.includes('iPad')) {
      product.battery = 8000
      product.screenType = 'Retina'
      product.diagonal = 10.2
      product.protection = 'Aluminum'
      product.memory = 64
      product.rating = 4.8
    } else {
      product.battery = 4000
      product.screenType = 'AMOLED'
      product.diagonal = 6.5
      product.protection = 'Standard'
      product.memory = 128
      product.rating = 4.5
    }
  })
}

// Методы для фильтров
const toggleFilter = (filterName) => {
  openFilters.value[filterName] = !openFilters.value[filterName]
}

const toggleBrand = (brandName) => {
  const brand = brands.value.find(b => b.name === brandName)
  if (brand) {
    brand.selected = !brand.selected
    currentPage.value = 1
  }
}

const toggleBattery = (value) => {
  selectedBattery.value = selectedBattery.value === value ? '' : value
  currentPage.value = 1
}

const toggleScreenType = (type) => {
  const index = selectedScreenTypes.value.indexOf(type)
  if (index > -1) {
    selectedScreenTypes.value.splice(index, 1)
  } else {
    selectedScreenTypes.value.push(type)
  }
  currentPage.value = 1
}

const toggleDiagonal = (diag) => {
  const index = selectedDiagonals.value.indexOf(diag)
  if (index > -1) {
    selectedDiagonals.value.splice(index, 1)
  } else {
    selectedDiagonals.value.push(diag)
  }
  currentPage.value = 1
}

const toggleProtection = (prot) => {
  const index = selectedProtections.value.indexOf(prot)
  if (index > -1) {
    selectedProtections.value.splice(index, 1)
  } else {
    selectedProtections.value.push(prot)
  }
  currentPage.value = 1
}

const toggleMemory = (mem) => {
  const index = selectedMemory.value.indexOf(mem)
  if (index > -1) {
    selectedMemory.value.splice(index, 1)
  } else {
    selectedMemory.value.push(mem)
  }
  currentPage.value = 1
}

const toggleSortMenu = () => {
  showSortMenu.value = !showSortMenu.value
}

const setSort = (type) => {
  if (type === 'rating') sortLabel.value = 'By rating'
  else if (type === 'price-asc') sortLabel.value = 'Price: Low to High'
  else if (type === 'price-desc') sortLabel.value = 'Price: High to Low'
  else if (type === 'name') sortLabel.value = 'By name'
  sortBy.value = type
  showSortMenu.value = false
  currentPage.value = 1
}

const isFavorite = (id) => {
  return favoritesStore.isFavorite(id)
}

const toggleFavorite = (product) => {
  favoritesStore.toggleItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    sku: product.sku
  })
}

const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    sku: product.sku
  })
}

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const productRows = computed(() => {
  const rows = []
  for (let i = 0; i < paginatedProducts.value.length; i += 3) {
    rows.push(paginatedProducts.value.slice(i, i + 3))
  }
  return rows
})

const visiblePages = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }
  if (currentPage.value <= 3) {
    return [1, 2, 3, 4, 5]
  }
  if (currentPage.value >= totalPages.value - 2) {
    return Array.from({ length: 5 }, (_, i) => totalPages.value - 4 + i)
  }
  return Array.from({ length: 5 }, (_, i) => currentPage.value - 2 + i)
})

const showDots = computed(() => {
  return totalPages.value > 5 && currentPage.value < totalPages.value - 2
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page) => {
  currentPage.value = page
}

// Закрыть меню сортировки при клике вне
const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown')) {
    showSortMenu.value = false
  }
}

onMounted(() => {
  enrichProducts()
  document.addEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Добавьте стили для поиска */
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

.search-input::placeholder {
  color: #656565;
  opacity: 0.5;
}

.search-field {
  cursor: pointer;
}

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
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.search-results h3 {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 18px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.search-result-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
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

.search-result-info {
  flex: 1;
}

.search-result-name {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
  color: #000;
  margin-bottom: 4px;
}

.search-result-price {
  font-family: 'Abel';
  font-size: 16px;
  color: #000;
  font-weight: bold;
}

.no-results {
  text-align: center;
  padding: 40px;
  font-family: 'ABeeZee';
  font-style: italic;
  color: #666;
}

.search-highlight {
  background: #ffeb3b;
  padding: 0 2px;
  border-radius: 3px;
}

/* Остальные стили */
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

.icon-cart {
  position: relative;
}

.like-icon.liked::before {
  content: "♥";
  color: #ff0000;
}

.product-img {
  cursor: pointer;
}

.filter-search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'ABeeZee';
  font-size: 14px;
}

.filter-icon {
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.filter-icon::before {
  content: "▼";
  font-size: 12px;
  color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.filter-icon.expanded::before {
  content: "▲";
}

.filter-content {
  margin-top: 12px;
  padding-bottom: 8px;
}

.price-inputs {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}

.price-input {
  width: 80px;
  padding: 6px 8px;
  border: 0.5px solid #D4D4D4;
  border-radius: 6px;
}

.price-values {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
}

.filter-options {
  max-height: 200px;
  overflow-y: auto;
}

.filter-header {
  cursor: pointer;
}

/* Базовые стили */
.products-page {
  max-width: 1440px;
  margin: 0 auto;
  background: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 160px;
  background: #FFFFFF;
  border-bottom: 1px solid #B5B5B5;
}

.logo-img { height: 45px; cursor: pointer; }

.content-wrapper { flex: 1; padding: 24px 160px 56px; }
.content-row { display: flex; gap: 32px; }
.filters { width: 280px; flex-shrink: 0; }
.filters-container { display: flex; flex-direction: column; gap: 16px; }
.filter-item { border-bottom: 0.5px solid #B5B5B5; padding: 12px 0; }
.filter-title { font-family: 'ABeeZee'; font-style: italic; font-size: 16px; }

.checkbox-field { display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 8px; }
.checkbox { width: 16px; height: 16px; border: 0.5px solid #D3D3D3; border-radius: 3px; }
.checkbox.checked { background: #000; position: relative; }
.checkbox.checked::after { content: ""; position: absolute; left: 4px; top: 1px; width: 6px; height: 10px; border: 1px solid #fff; border-left: none; border-top: none; transform: rotate(45deg); }

.products-container { flex: 1; }
.products-grid { display: flex; flex-direction: column; gap: 24px; }
.product-row { display: flex; gap: 16px; flex-wrap: wrap; }
.product-card { flex: 1; min-width: 200px; background: #F7F7F7; border-radius: 9px; padding: 24px 16px; text-align: center; transition: 0.3s; }
.product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
.like-icon { width: 32px; height: 32px; position: relative; margin-left: auto; cursor: pointer; }
.like-icon::before { content: "♡"; position: absolute; font-size: 28px; color: rgba(145,145,145,0.77); }
.product-img { width: 160px; height: 160px; object-fit: contain; cursor: pointer; }
.product-title { font-family: 'ABeeZee'; font-style: italic; font-size: 14px; }
.product-price { font-family: 'Abel'; font-size: 20px; }
.btn-buy { background: #000; color: #fff; padding: 10px 0; width: 140px; border: none; border-radius: 8px; cursor: pointer; }

.pagination { display: flex; justify-content: center; gap: 16px; margin-top: 32px; }
.page { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 4px; }
.page.active { background: #000; color: #fff; }

.footer { background: #000; padding: 80px 160px; color: #CFCFCF; }

@media (max-width: 1200px) {
  .header-top, .content-wrapper, .footer { padding: 16px 40px; }
}
@media (max-width: 768px) {
  .content-row { flex-direction: column; }
  .filters { width: 100%; }
  .header-top { flex-wrap: wrap; }
  .search-field { width: 100%; order: 3; }
  .search-results { width: 90%; margin: 0 16px; }
}
</style>