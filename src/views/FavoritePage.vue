<template>
  <div class="favorite-page">
    <div class="header-top">
      <div class="logo" @click="$router.push('/')">
        <img src="/images/logoblack.png" alt="7cyber" class="logo-img">
      </div>
      <div class="search-field">
        <div class="search-icon"></div>
        <span class="search-text">Search</span>
      </div>
      <div class="header-icons">
        <div class="icon-favorite" @click="$router.push('/favorite')"></div>
        <div class="icon-cart" @click="$router.push('/cart')">
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </div>
      </div>
    </div>

    <div class="favorite-content">
      <div class="favorite-wrapper">
        <h1 class="favorite-title">Favorite</h1>
        <div class="favorite-products">
          <div v-if="favorites.length === 0" class="empty-favorite">
            <p>No favorites yet</p>
            <button class="btn-continue" @click="$router.push('/catalog')">Start Shopping</button>
          </div>
          <template v-else>
            <div v-for="(item, index) in favorites" :key="item.id" class="favorite-item">
              <div class="product-image">
                <img :src="item.image" :alt="item.name">
              </div>
              <div class="product-details">
                <div class="product-info">
                  <p class="product-name">{{ item.name }}</p>
                  <p class="product-sku">{{ item.sku }}</p>
                  <p class="product-price">${{ item.price }}</p>
                </div>
                <div class="product-actions">
                  <button class="remove-item" @click="removeFromFavorites(item.id)">✕</button>
                </div>
              </div>
            </div>
            <div v-for="(item, index) in favorites.slice(0, -1)" :key="'divider-' + item.id" class="divider"></div>
          </template>
        </div>
      </div>
    </div>

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
import { computed, onMounted } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useCartStore } from '../stores/cartStore'

const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

const favorites = computed(() => favoritesStore.favoritesItems)
const cartCount = computed(() => cartStore.itemCount)

const removeFromFavorites = (id) => {
  favoritesStore.removeItem(id)
}

// Добавляем класс для пустого состояния
const emptyClass = computed(() => favorites.value.length === 0 ? 'empty' : '')
</script>

<style scoped>
/* Добавьте эти стили к существующим */
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
  font-family: 'ABeeZee';
}

.icon-cart {
  position: relative;
}

.empty-favorite {
  text-align: center;
  padding: 60px 20px;
}

.empty-favorite p {
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.btn-continue {
  background: #000;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'ABeeZee';
  font-style: italic;
  font-size: 14px;
}

.btn-continue:hover {
  background: #333;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-top: 8px;
}

/* Остальные стили из вашего style-favorite.css добавьте сюда */
.favorite-page {
  max-width: 1440px;
  margin: 0 auto;
  background: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 160px;
  gap: 32px;
  background: #FFFFFF;
  border-bottom: 1px solid #B5B5B5;
}

.logo-img {
  height: 45px;
  width: auto;
  display: block;
  cursor: pointer;
}

.search-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  width: 320px;
  height: 48px;
  background: #F5F5F5;
  border-radius: 8px;
}

.search-icon {
  width: 20px;
  height: 20px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="%23989898"/></svg>');
  background-size: contain;
}

.search-text {
  font-family: 'ABeeZee';
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  color: #656565;
  opacity: 0.5;
}

.header-icons {
  display: flex;
  gap: 20px;
}

.icon-favorite, .icon-cart {
  width: 28px;
  height: 28px;
  background-size: contain;
  cursor: pointer;
}

.icon-favorite { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M16 28.7l-1.45-1.32C7.8 21.2 4 17.6 4 13.1 4 9.5 6.5 7 10.1 7c2.2 0 4.3 1.1 5.9 2.9C17.6 8.1 19.7 7 21.9 7c3.6 0 6.1 2.5 6.1 6.1 0 4.5-3.8 8.1-10.55 14.28L16 28.7z" fill="black"/></svg>'); }
.icon-cart { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M8 10h16l-2 12H10L8 10z" stroke="black" fill="none" stroke-width="1.5"/><circle cx="12" cy="24" r="1.5" fill="black"/><circle cx="20" cy="24" r="1.5" fill="black"/></svg>'); }

.favorite-content {
  flex: 1;
  padding: 112px 160px 141px 535px;
}

.favorite-wrapper {
  max-width: 349px;
}

.favorite-title {
  font-family: 'Abel';
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 40px;
}

.favorite-products {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.favorite-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  gap: 15px;
}

.product-image {
  width: 90px;
  height: 90px;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-details {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 219px;
}

.product-name {
  font-family: 'ABeeZee';
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.product-sku {
  font-family: 'Abel';
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
}

.remove-item {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider {
  width: 100%;
  height: 0.5px;
  background: #A3A3A3;
  margin: 0;
}

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

.footer-logo {
  margin-bottom: 24px;
}

.footer-logo-img {
  width: auto;
  height: 32px;
  display: block;
  object-fit: contain;
}

.footer-logo-text p {
  font-size: 13px;
  line-height: 1.6;
  color: #CFCFCF;
}

.footer-nav {
  display: flex;
  gap: 60px;
}

.footer-col h4 {
  color: #FFF;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: 'Abel';
}

.footer-col ul {
  list-style: none;
}

.footer-col li {
  margin-bottom: 10px;
  font-size: 13px;
  cursor: pointer;
}

.social-icons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.social {
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 1200px) {
  .header-top, .favorite-content, .footer {
    padding: 16px 40px;
  }
  .favorite-content {
    padding: 40px;
  }
  .favorite-wrapper {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .favorite-item {
    flex-wrap: wrap;
  }
  .product-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .header-top {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
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
}
</style>