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

createApp(App)
  .use(router)
  .mount('#app')
