import { createRouter, createWebHistory } from 'vue-router';
import UserOptions from '@/components/UserOptions.vue';
import App from '@/App.vue';
import { languages } from '@/i18n';
import store from '@/store';
import { Base64 } from 'js-base64';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      beforeEnter(to, from, next) {
        next(store.state.locale);
      },
    },
    {
      path: '/:lang',
      component: App,
      beforeEnter(to, from, next) {
        const { lang } = to.params;
        if (languages.includes(lang)) {
          if (store.state.locale !== lang) {
            store.dispatch('changeLocale', lang);
          }
          return next();
        }
        return next({ path: store.state.locale });
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
        {
          path: 'load/:object',
          name: 'load',
          components: {
            UserOptions,
            default: {
              template: 'LOADING',
            },
          },
          /* eslint-disable-next-line */
          beforeEnter(to, from, next) {
            const { objectString } = to.params;
            console.log({ objectString });
            try {
              const loadedObject = JSON.parse(Base64.decode(objectString));
              console.log({ loadedObject });
            } catch (e) {
              console.warn(e);
            }
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
    */
  ],
});
