import MainLayout from '@/Layouts/MainLayout.vue';
import UnityGame from '@/components/UnityGame.vue';
import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: '/game',
          name: 'game',
          component: UnityGame,
        },
      ],
    },
  ],
});

export default router;
