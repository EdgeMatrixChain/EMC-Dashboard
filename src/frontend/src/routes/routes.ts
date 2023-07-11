export const routes = [
  {
    path: '/',
    redirect: { path: '/home' },
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    name: 'nodes',
    path: '/nodes',
    component: () => import('@/pages/nodes/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    name: 'market',
    path: '/market',
    component: () => import('@/pages/market/index.vue'),
  },
  {
    name: 'node-detail',
    path: '/nodes/:id',
    component: () => import('@/pages/node-detail/index.vue'),
  },
];
