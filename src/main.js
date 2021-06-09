import { createApp } from 'vue';

// Router Settings
import { createRouter, createWebHashHistory } from 'vue-router';
import KinkListView from '@/components/KinkListView.vue';

import App from './App.vue';
import i18n from './i18n';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: KinkListView,
    },

  ],
});

createApp(App).use(i18n)
  .use(router)
  .mount('#app');
