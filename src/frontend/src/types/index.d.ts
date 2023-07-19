declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'copy-to-clipboard';

declare module '*.png';
declare module '*.svg';

//webpack define plugin
declare var __PUBLIC_PATH__: string;

interface Window {
  ic: any;
}
