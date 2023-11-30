import MainLayout from '@/Layouts/MainLayout.vue';
import UserProfile from '@/views/UserProfile.vue';
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
      ],
    },
  ],
});

export default router;
