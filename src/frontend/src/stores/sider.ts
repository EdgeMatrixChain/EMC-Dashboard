import { ref, h } from 'vue';
import { defineStore } from 'pinia';
import { NTag } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';
import Utils from '@/tools/utils';

interface MenuItemRouterLink {
  key: string;
  label: string;
  to?: any;
}

interface MenuItemText {
  label: string;
}

function renderMenuItemText({ label }: MenuItemText) {
  return h('h4', {}, label);
}

function renderMenuItemLink({ label, to, key }: MenuItemRouterLink): MenuOption {
  return {
    key: key,
    label: () => h(RouterLink, { to }, { default: () => renderMenuItemText({ label }) }),
  };
}

export const useSiderStore = defineStore('sider', () => {
  const menus = ref<Array<any>>([]);
  const siderMenus = ref<Array<any>>([]);

  return {
    menus,
    siderMenus,
    initMenus() {
      const _menus: Array<any> = [
        { label: 'Home', key: '/home', desc: '', to: { name: 'home' } },
        { label: 'Registered Nodes', key: '/nodes', desc: '', to: { name: 'nodes' } },
        { label: 'Award Records', key: '/awards', desc: '', to: { name: 'awards' } },
      ];
      menus.value = _menus;

      const _siderMenus: MenuOption[] = [];
      _menus.forEach((item: any, index: number) => {
        if (typeof item.to === 'object') {
          _siderMenus.push(renderMenuItemLink({ label: item.label, to: item.to, key: item.key }));
        } else if (Array.isArray(item.children)) {
          const menuChildren: MenuOption[] = [];
          item.children.forEach((item: any, index: number) => {
            if (typeof item.to === 'object') {
              menuChildren.push(renderMenuItemLink({ label: item.label, to: item.to, key: item.key }));
            }
          });
          _siderMenus.push({
            label: () => renderMenuItemText({ label: item.label }),
            key: item.key,
            children: menuChildren,
          });
        }
        // _siderMenus.push({
        //   key: `divider-${index}`,
        //   type: 'divider',
        //   props: { style: { marginLeft: '16px' } },
        // });
      });
      siderMenus.value = _siderMenus;

      return _menus;
    },
  };
});
