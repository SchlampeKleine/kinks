import { createRouter, createWebHashHistory } from 'vue-router';
import UserOptions from '@/components/UserOptions.vue';
import App from '@/App.vue';
import { languages } from '@/i18n';
import store from '@/store';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      beforeEnter(to, from, next) {
        next(store.state.Locale.locale);
      },
    },
    {
      path: '/:lang([a-z]{2})',
      alias: '/:lang([a-z]{2}-[A-Z]{2})',
      component: App,
      beforeEnter(to, from, next) {
        const { lang } = to.params;
        if (languages.includes(lang)) {
          if (store.state.Locale.locale !== lang) {
            store.dispatch('Locale/changeLocale', lang);
          }
          return next();
        }
        return next({ path: store.state.Locale.locale });
      },
      children: [
        {
          path: '',
          name: 'home',
          components: {
            UserOptions,
            default: () => import('@/views/KinkList.vue'),
          },
        },
        {
          name: 'credits',
          path: 'credits',
          components: {
            UserOptions,
            default: () => import('@/views/Credits.vue'),
          },
        },
        {
          name: 'privacy',
          path: 'privacy',
          components: {
            UserOptions,
            default: () => import('@/views/Privacy.vue'),
          },
        },
        {
          name: 'profiles',
          path: 'profiles',
          components: {
            UserOptions,
            default: () => import('@/components/Profiles.vue'),
          },
        },
        /*
        {
          path: 'about',
          name: 'about',
          component: About,
        },
        */
      ],
    },
    /*
    {
      path: '/',
      component: KinkListView,
    },
    {
      path: '/load',
      name: 'load',
      beforeEnter(to, from, next) {
        store.dispatch('CurKinks/loadFromString', to.hash.slice(1));
        return next({ path: 'profiles' });
      },
    },
    */
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/components/NotFound.vue'),
    },
  ],
});
