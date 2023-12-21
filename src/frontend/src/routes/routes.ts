export const routes = [
  {
    name: 'auth',
    path: '/auth',
    component: () => import('@/pages/auth/index.vue'),
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
        name: 'market',
        path: 'market',
        component: () => import('@/pages/market/index.vue'),
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
        name: 'staking-lock',
        path: 'staking-lock',
        component: () => import('@/pages/staking-lock/index.vue'),
      },
      // {
      //   name: 'test',
      //   path: 'test',
      //   component: () => import('@/pages/test/index.vue'),
      // },
    ],
  },
  {
    name: 'staking',
    path: '/staking',
    component: () => import('@/pages/staking/index.vue'),
  },
];
