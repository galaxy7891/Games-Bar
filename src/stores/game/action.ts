import type { GameState } from './data'
import { gameService } from '@/services/gameService'

export const gameActions = {
  async loadGames(
    state: GameState,
    options?: { page?: number; pageSize?: number; search?: string },
  ) {
    try {
      state.loading = true
      state.error = null

      if (options?.page) state.page = options.page
      if (options?.pageSize) state.pageSize = options.pageSize

      const res = await gameService.fetchGames({
        page: state.page,
        page_size: state.pageSize,
        search: options?.search, 
      })

      state.games = res.results
      state.total = res.count
    } catch (err: unknown) {
      state.error = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      state.loading = false
    }
  },
}
