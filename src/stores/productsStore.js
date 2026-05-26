import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      { id: 1, name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple', price: 1399, oldPrice: 1699, image: '/images/Apple-iPhone-14-Pro-Max.png', sku: '#25139526913984', category: 'Phones', rating: 4.8, discount: 18 },
      { id: 2, name: 'AirPods Max Silver', price: 549, oldPrice: 649, image: '/images/AirPods.png', sku: '#53459358345', category: 'Headphones', rating: 4.7, discount: 15 },
      { id: 3, name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium Case', price: 399, oldPrice: 499, image: '/images/Apple-Watch.png', sku: '#63632324', category: 'Watches', rating: 4.9, discount: 20 },
      { id: 4, name: 'Apple iPhone 14 Pro 512GB Gold', price: 1437, oldPrice: 1599, image: '/images/Apple-iPhone-14-Pro.png', sku: '#MQ233', category: 'Phones', rating: 4.8, discount: 10 },
      { id: 5, name: 'Samsung Galaxy Watch6 Classic 47mm Black', price: 369, oldPrice: 429, image: '/images/Samsung-Galaxy-Watch.png', sku: '#SAM123', category: 'Watches', rating: 4.6, discount: 14 },
      { id: 6, name: 'Galaxy Z Fold5 Unlocked 256GB Phantom Black', price: 1799, oldPrice: 1999, image: '/images/Galaxy-Z-Fold5.png', sku: '#GAL456', category: 'Phones', rating: 4.7, discount: 10 },
      { id: 7, name: 'Galaxy Buds FE', price: 99.99, oldPrice: 129.99, image: '/images/Galaxy-Buds.png', sku: '#BUDS789', category: 'Headphones', rating: 4.5, discount: 23 },
      { id: 8, name: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver', price: 398, oldPrice: 499, image: '/images/Apple-iPad.png', sku: '#IPAD101', category: 'Tablets', rating: 4.8, discount: 20 },
      { id: 10, name: 'Apple iPhone 13 mini 128GB Pink', price: 850, oldPrice: 999, image: '/images/Apple-iPhone-13-mini.png', sku: '#IP13MINI', category: 'Phones', rating: 4.7, discount: 15 },
      { id: 11, name: 'Apple iPhone 14 Pro 1TB Gold', price: 1499, oldPrice: 1799, image: '/images/Apple-iPhone-14-Pro-1TB-Gold.png', sku: '#MQ2V3', category: 'Phones', rating: 4.9, discount: 17 },
      { id: 12, name: 'Apple iPhone 11 128GB White', price: 510, oldPrice: 699, image: '/images/Apple-iPhone-11.png', sku: '#IP11', category: 'Phones', rating: 4.6, discount: 27 }
    ]
  }),
  
  getters: {
    getAllProducts: (state) => state.products,
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    getDiscountedProducts: (state) => {
      return state.products.filter(product => product.oldPrice).slice(0, 4)
    }
  }
})