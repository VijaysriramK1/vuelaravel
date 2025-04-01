import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axiosInstance from './services/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

const app = createApp(App);

app.use(router);

app.config.globalProperties.$axios = axiosInstance;

app.component('Multiselect', Multiselect);

app.mount('#app');
