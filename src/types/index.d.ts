declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'copy-to-clipboard';
declare module '*.png';
declare module '*.svg';

interface Window {
  ic: any;
}

type Resp = {
  _result: number;
  _desc?: string;
  data?: any;
  err?: any;
};
