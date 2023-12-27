export const routes = [
  {
    name: 'auth',
    path: '/auth',
    component: () => import('@/pages/auth/index.vue'),
  },
  {
    name: 'staking',
    path: '/staking',
    component: () => import('@/pages/staking/index.vue'),
  },
  {
    name: 'layout',
    path: '/',
    component: () => import('@/layout/app/index.vue'),
    redirect: {
      name: 'home',
    },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/pages/home/index.vue'),
      },
      {
        name: 'nodes',
        path: 'nodes',
        component: () => import('@/pages/nodes/index.vue'),
        meta: {
          keepAlive: true,
        },
      },
      {
        name: 'node-detail',
        path: 'nodes/:id',
        component: () => import('@/pages/node-detail/index.vue'),
      },
      {
        name: 'dip20',
        path: 'dip20',
        component: () => import('@/pages/dip20/index.vue'),
      },
      {
        name: 'cliffs',
        path: 'cliffs',
        component: () => import('@/pages/cliffs/index.vue'),
      },
      {
        name: 'cliffs-team',
        path: 'cliffs-team',
        component: () => import('@/pages/cliffs-team/index.vue'),
      },
      {
        name: 'public-sale',
        path: 'public-sale',
        component: () => import('@/pages/public-sale/index.vue'),
      },
      {
        name: 'public-sale-buy',
        path: 'public-sale-buy',
        component: () => import('@/pages/public-sale-buy/index.vue'),
      },
      // {
      //   name: 'test',
      //   path: 'test',
      //   component: () => import('@/pages/test/index.vue'),
      // },
    ],
  },
];
