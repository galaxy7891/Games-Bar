import type { RawgGame } from "@/types/rawg";

export interface GameState {
  games: RawgGame[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
}

export const defaultGameState = (): GameState => ({
  games: [],
  total: 0,
  loading: false,
  error: null,
  page: 1,
  pageSize: 20,
});
