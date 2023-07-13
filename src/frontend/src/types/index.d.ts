declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

//webpack define plugin
declare var __PUBLIC_PATH__: string;
