import { createApp } from 'vue';
import AppSetup from './AppSetup.vue';
import { router } from './routes/index';

import { pinia } from './stores/index';
import './style.css';

const app = createApp(AppSetup);

app.use(router);
app.use(pinia);

app.mount('#app');
