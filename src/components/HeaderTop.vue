<template>
  <header class="header-top">
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
        <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const cartItemCount = computed(() => cartStore.itemCount)
</script>

<style scoped>
.header-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 160px;
  gap: 32px;
  background: #FFFFFF;
  border-bottom: 1px solid #B5B5B5;
  flex-wrap: wrap;
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
  position: relative;
}

.icon-favorite { 
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M16 28.7l-1.45-1.32C7.8 21.2 4 17.6 4 13.1 4 9.5 6.5 7 10.1 7c2.2 0 4.3 1.1 5.9 2.9C17.6 8.1 19.7 7 21.9 7c3.6 0 6.1 2.5 6.1 6.1 0 4.5-3.8 8.1-10.55 14.28L16 28.7z" fill="black"/></svg>'); 
}

.icon-cart { 
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path d="M8 10h16l-2 12H10L8 10z" stroke="black" fill="none" stroke-width="1.5"/><circle cx="12" cy="24" r="1.5" fill="black"/><circle cx="20" cy="24" r="1.5" fill="black"/></svg>'); 
}

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
  font-style: italic;
}

/* Адаптация хедера */
@media (max-width: 1024px) {
  .header-top {
    padding: 16px 40px;
  }
}

@media (max-width: 768px) {
  .header-top {
    padding: 16px 20px;
    justify-content: center;
    gap: 15px;
  }
  
  .search-field {
    width: 100%;
    order: 3;
  }
  
  .logo-img {
    height: 35px;
  }
}

@media (max-width: 480px) {
  .header-top {
    padding: 12px 16px;
  }
  
  .search-field {
    padding: 8px 12px;
    height: 40px;
  }
  
  .search-text {
    font-size: 12px;
  }
  
  .header-icons {
    gap: 12px;
  }
  
  .icon-favorite, .icon-cart {
    width: 24px;
    height: 24px;
  }
}
</style>