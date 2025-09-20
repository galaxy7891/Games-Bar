import { defineStore } from 'pinia'
import type { RawgGame } from '@/types/rawg'

const STORAGE_KEY = 'favorite-games'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as RawgGame[],
  }),

  actions: {
    loadFromStorage() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          this.favorites = JSON.parse(raw)
        } catch {
          this.favorites = []
        }
      }
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites))
    },

    toggleFavorite(game: RawgGame) {
      const idx = this.favorites.findIndex((g) => g.id === game.id)
      if (idx >= 0) {
        this.favorites.splice(idx, 1)
      } else {
        this.favorites.push(game)
      }
      this.saveToStorage()
    },

    isFavorite(id: number) {
      return this.favorites.some((g) => g.id === id)
    },
  },
})
