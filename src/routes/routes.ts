export const routes = [
  {
    name: 'staking',
    path: '/staking',
    component: () => import('@/pages/staking/index.vue'),
  },
  {
    name: 'airdrop',
    path: '/airdrop',
    component: () => import('@/pages/airdrop/index.vue'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/pages/home/index.vue'),
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
        name: 'cliffs-view',
        path: 'cliffs-view',
        component: () => import('@/pages/cliffs-view/index.vue'),
      },
      {
        name: 'node-unstake',
        path: 'node-unstake',
        component: () => import('@/pages/node-unstake/index.vue'),
      },
      // {
      //   name: 'strategy-sale',
      //   path: 'strategy-sale',
      //   component: () => import('@/pages/public-sale/index.vue'),
      // },
      // {
      //   name: 'strategy-sale-manage',
      //   path: 'strategy-sale-manage',
      //   component: () => import('@/pages/public-sale-manage/index.vue'),
      // },
      // {
      //   name: 'stake-node',
      //   path: 'stake-node',
      //   component: () => import('@/pages/stake-node/index.vue'),
      // },
      // {
      //   name: 'claim-node-rewards',
      //   path: 'claim-node-rewards',
      //   component: () => import('@/pages/claim-node-rewards/index.vue'),
      // },
      // {
      //   name: 'test',
      //   path: 'test',
      //   component: () => import('@/pages/test/index.vue'),
      // },
    ],
  },
];
