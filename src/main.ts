import { createApp } from 'vue'
import router from './router'
import './style.css'
import 'vant/lib/index.css';
import App from './App.vue'

createApp(App).use(router).mount('#app')

