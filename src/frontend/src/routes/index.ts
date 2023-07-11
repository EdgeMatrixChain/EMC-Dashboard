import { nextTick } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
export const loadingBarApiRef: any = {};

export default function createAppRouter(routes: any) {
  console.info(`create app router base url is ${__PUBLIC_PATH__}`);

  const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
  });

  router.beforeEach(function (to, from, next) {
    if (!from || to.path !== from.path) {
      if (loadingBarApiRef.value) {
        loadingBarApiRef.value.start();
      }
    }
    next();
  });

  router.afterEach(function (to, from) {
    if (!from || to.path !== from.path) {
      if (loadingBarApiRef.value) {
        loadingBarApiRef.value.finish();
      }
      if (to.hash && to.hash !== from.hash) {
        nextTick(() => {
          const el = document.querySelector(to.hash);
          if (el) el.scrollIntoView();
        });
      }
    }
  });

  return router;
}

export const router = createAppRouter(routes);
