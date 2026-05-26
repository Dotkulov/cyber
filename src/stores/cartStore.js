import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || []
  }),
  
  getters: {
    itemCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    total: (state) => {
      return state.subtotal + 50 + 29
    },
    cartItems: (state) => state.items
  },
  
  actions: {
    addItem(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveToLocalStorage()
    },
    
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveToLocalStorage()
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (quantity === 0) {
        this.removeItem(productId)
      }
      this.saveToLocalStorage()
    },
    
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  }
})