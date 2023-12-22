import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const PUBLIC_URL = ''; //'/client';
// https://vitejs.dev/config/
export default defineConfig((options) => {
  const mode = options.mode; //development production
  const isDev = mode === 'development';
  console.info('isDev --> ', isDev);
  const plugins = [vue()];
  if (isDev) {
    //someting...
  }
  return {
    plugins: plugins,
    base: isDev ? '' : PUBLIC_URL,
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        { find: 'process', replacement: 'process/browser' },
      ],
    },
    server: {
      open: true,
      host: '0.0.0.0',
    },
  };
});
