import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CatalogPage from '../views/CatalogPage.vue'
import CartPage from '../views/CartPage.vue'
import FavoritePage from '../views/FavoritePage.vue'
import ProductDetailsPage from '../views/ProductDetailsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage  // ← ДОЛЖЕН БЫТЬ HomePage
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: CatalogPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: FavoritePage  // ← FavoritePage должен быть только тут
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router