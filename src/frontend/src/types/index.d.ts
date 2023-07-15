declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module '@/tools/http.ts' {
//   interface Http {
//     get(options: { url: string; data?: any }): Promise<any>;
//     post(options: { url: string; data?: any }): Promise<any>;
//   }
//   const http: Http;
//   export default http;
// }

declare module '*.png';
declare module '*.svg';

//webpack define plugin
declare var __PUBLIC_PATH__: string;

interface Window {
  ic: any;
}
