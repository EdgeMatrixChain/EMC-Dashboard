declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@/tools/utils' {
  export default {
    parseJSON: function (str: string): any {},
    responseFormatted: function (data: any): any {},
    getLocalStorage: function (key: string): any {},
    setLocalStorage: function (key: string, data: any): any {},
  };
}

declare module '@/tools/http' {
  declare interface HttpConfig {
    url: string;
    data: any;
  }
  declare class Http {
    postJSON(config: HttpConfig): Promise<any>;
    static getInstance(): Http;
  }
  export { Http };
}

declare module 'json-format' {
  export default function (data: any): string {}
}

//webpack define plugin
declare var __PUBLIC_PATH__: string;

interface GlobalSetting {
  network: string;
  privateKey: string;
  publicKey: string;
  peerId: string;
}

interface TelegramParameters {
  network: string;
  peerId: string;
  privateKey: string;
  endpoint: string;
  input?: any;
  path?: string;
  method?: string;
  body?: any;
}

interface ResponseGeneral {
  requestUrl: string;
  requestMethod: string;
  statusCode: number;
}

type IDLMethod = 'POST' | 'GET';
type IDLContentType = 'application/json';

interface IDL {
  _key?: string;
  path: string;
  method: IDLMethod;
  desc: string;
  owner: string;
  contentType: IDLContentType; //"application/json",
  rawExample: srting;
  rawDesc: string;
}
