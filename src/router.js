import { createRouter, createWebHashHistory } from 'vue-router';
import KinkListView from '@/components/KinkListView.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: KinkListView,
    },
  ],
});
