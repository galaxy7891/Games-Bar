import axios from 'axios'
import type { RawgGame, RawgGamesListResponse } from '@/types/rawg'

const BASE_URL = import.meta.env.VITE_RAWG_BASE_URL as string
const API_KEY = import.meta.env.VITE_RAWG_API_KEY as string

export const gameService = {
  async fetchGames(params?: {
    page?: number
    page_size?: number
    search?: string
  }): Promise<RawgGamesListResponse> {
    const url = `${BASE_URL}/games`
    const response = await axios.get<RawgGamesListResponse>(url, {
      params: {
        key: API_KEY,
        page: params?.page ?? 1,
        page_size: params?.page_size ?? 20,
        search: params?.search ?? undefined, // ✅ tambah search
      },
    })
    return response.data
  },

  async fetchGameDetail(id: number | string): Promise<RawgGame> {
    const url = `${BASE_URL}/games/${id}`
    const response = await axios.get<RawgGame>(url, {
      params: { key: API_KEY },
    })
    return response.data
  },
}
