import MainLayout from '@/Layouts/MainLayout.vue';
import UserProfile from '@/views/UserProfile.vue';
import UnityGame from '@/views/UnityGame.vue';
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
          path: '/profile',
          name: 'profile',
          component: UserProfile,
        },
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
