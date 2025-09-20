import { createRouter, createWebHistory } from 'vue-router'
import GamesList from '@/views/GamesList.vue'
import GameDetail from '@/views/GameDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'GamesList', component: GamesList },
    { path: '/games/:id', name: 'GameDetail', component: GameDetail, props: true },
    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('@/views/FavoritePage.vue'),
    },
  ],
})

export default router
