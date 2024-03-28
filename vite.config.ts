import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vue from '@vitejs/plugin-vue';
const PUBLIC_URL = '';

export default defineConfig((options) => {
  const mode = options.mode; //development production
  const isDev = mode === 'development';
  console.info('isDev --> ', isDev);
  const plugins = [vue(), nodePolyfills()];
  if (isDev) {
    //someting...
  }
  return {
    plugins: plugins,
    base: isDev ? '' : PUBLIC_URL,
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
    server: {
      open: true,
      host: '0.0.0.0',
    },
    define: {
      // enable hydration mismatch details in production build
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
  };
});
