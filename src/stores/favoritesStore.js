import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('favorites')) || []
  }),
  
  getters: {
    favoritesCount: (state) => state.items.length,
    favoritesItems: (state) => state.items,
    isFavorite: (state) => (productId) => {
      return state.items.some(item => item.id === productId)
    }
  },
  
  actions: {
    addItem(product) {
      if (!this.items.find(item => item.id === product.id)) {
        this.items.push(product)
        this.saveToLocalStorage()
      }
    },
    
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveToLocalStorage()
    },
    
    toggleItem(product) {
      const exists = this.items.find(item => item.id === product.id)
      if (exists) {
        this.removeItem(product.id)
      } else {
        this.addItem(product)
      }
    },
    
    saveToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.items))
    }
  }
})