import { defineStore } from 'pinia'
import { defaultGameState, type GameState } from './data'
import { gameActions } from './action'

export const useGameStore = defineStore('game', {
  state: (): GameState => defaultGameState(),
  actions: {
    async loadGames(options?: { page?: number; pageSize?: number; search?: string }) {
      await gameActions.loadGames(this, options)
    },
  },
})
