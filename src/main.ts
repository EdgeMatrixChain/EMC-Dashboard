import { createApp } from 'vue';
import AppSetup from './AppSetup.vue';
import { router } from './routes/index';
import { Utils } from './tools/utils';
import moment from 'moment';

import { pinia } from './stores/index';
import './tailwind.css';
import './style.css';

moment.locale('en-us');

const app = createApp(AppSetup);

app.config.globalProperties.$filters = {
  address(value: any, limit: number) {
    if (!value) {
      return '';
    }
    return Utils.formatAddress(value, limit);
  },
};

app.use(router);
app.use(pinia);

app.mount('#app');
