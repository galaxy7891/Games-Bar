export interface RawgGame {
  id: number
  name: string
  released?: string | null
  background_image?: string | null
  rating?: number
  ratings_count?: number
  playtime?: number
  platforms?: { platform: { id: number; name: string } }[]
  parent_platforms?: { platform: { id: number; name: string } }[]
  genres?: { id: number; name: string }[]
  description_raw?: string
}

export interface RawgGamesListResponse {
  count: number
  next: string | null
  previous: string | null
  results: RawgGame[]
}
