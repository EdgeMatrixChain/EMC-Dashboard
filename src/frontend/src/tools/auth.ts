/**
 * emc-auth-utility
 * 
 * Usage:
 * import { instance as emcAuthClient } from '@/tools/auth';
 *  
 * emcAuthClient.login({
      onSuccess: (message) => {
        //{"type": "authorize-success","data": "tdvch-tx3ik-r2bzp-pncic-ahjes-57rvk-oa6qu-blzh2-brbs5-x67zv-jae"}
        console.info('success', message);
      },
      onError(message) {
        console.info(message);
      },
   });
 */

const EMC_PROVIDER_DEFAULT = 'https://hsujw-ciaaa-aaaap-qbj6a-cai.icp0.io/';
const EMC_PROVIDER_ENDPOINT = '#auth';
const INTERRUPT_CHECK_INTERVAL = 500;

const AUTH_MESSAGE_KIND_THIRD_READY = 'authorize-ready';
const AUTH_MESSAGE_KIND_SETUP = 'authorize-setup';
const AUTH_MESSAGE_KIND_SUCCESS = 'authorize-success';
const AUTH_MESSAGE_KIND_FAILURE = 'authorize-failure';

export const ERROR_USER_INTERRUPT = 'user interrupt';

type LoginOptions = {
  provider?: string;
  windowOpenerFeatures?: string;
  onSuccess?: ((message: Message) => void) | ((message: Message) => Promise<void>);
  onError?: ((error?: string) => void) | ((error?: string) => Promise<void>);
};

type Message = {
  //AUTH_MESSAGE_KIND_THIRD_READY| AUTH_MESSAGE_KIND_SETUP| AUTH_MESSAGE_KIND_SUCCESS| AUTH_MESSAGE_KIND_FAILURE
  type: string;
  data?: any;
};

export class AuthClient {
  _emcWindow?: Window | null;

  _eventHandler?: (event: any) => {};

  _removeEventListener() {
    if (this._eventHandler) {
      window.removeEventListener('message', this._eventHandler);
    }
    this._eventHandler = undefined;
  }

  _getEventHandler(emcProviderUrl: URL, options: any) {
    return async (event: any) => {
      if (event.origin !== emcProviderUrl.origin) {
        console.warn(`expected origin '${emcProviderUrl.origin}', got '${event.origin}'`);
        return;
      }

      const message = event.data as Message;

      switch (message.type) {
        case AUTH_MESSAGE_KIND_THIRD_READY: {
          const request = { type: AUTH_MESSAGE_KIND_SETUP };
          this._emcWindow?.postMessage(request, emcProviderUrl.origin);
          break;
        }
        case AUTH_MESSAGE_KIND_SUCCESS:
          try {
            await this._handleSuccess(message, options.onSuccess);
          } catch (err: any) {
            this._handleFailure(err.message, options.onError);
          }
          break;
        case AUTH_MESSAGE_KIND_FAILURE:
          this._handleFailure(message.data, options.onError);
          break;
        default:
          console.info(`unknow message type '${message.type}'`);
          break;
      }
    };
  }

  async _handleSuccess(message: any, onSuccess?: (message: any) => {}) {
    if (this._emcWindow) {
      this._emcWindow.close();
    }

    this._removeEventListener();
    delete this._emcWindow;

    typeof onSuccess === 'function' && onSuccess(message);
  }

  _handleFailure(errorMessage: string, onError?: (message: string) => void) {
    if (this._emcWindow && !this._emcWindow.closed) {
      this._emcWindow.close();
    }

    typeof onError === 'function' && onError(errorMessage);

    this._removeEventListener();
    delete this._emcWindow;
  }

  login(options: LoginOptions) {
    const emcProviderUrl = new URL(options.provider || EMC_PROVIDER_DEFAULT);
    emcProviderUrl.hash = EMC_PROVIDER_ENDPOINT;

    if (this._emcWindow) {
      this._emcWindow.close();
    }

    this._removeEventListener();

    this._eventHandler = this._getEventHandler(emcProviderUrl, options);

    window.addEventListener('message', this._eventHandler);

    this._emcWindow = window.open(emcProviderUrl.toString(), 'emcWindow', options.windowOpenerFeatures);

    const checkInterruption = () => {
      if (this._emcWindow) {
        if (this._emcWindow.closed) {
          this._handleFailure(ERROR_USER_INTERRUPT, options.onError);
        } else {
          setTimeout(checkInterruption, INTERRUPT_CHECK_INTERVAL);
        }
      }
    };
    checkInterruption();
  }
}

export const instance = new AuthClient();
