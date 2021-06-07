import { createApp } from 'vue'
import App from './App.vue'

// Router Settings
import { createRouter,createWebHashHistory } from 'vue-router'
import KinkListView from '@/components/KinkListView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: KinkListView,
    },

  ],
})

// i18n
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  // something vue-i18n options here ...
})

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
