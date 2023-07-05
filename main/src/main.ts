import { createApp } from 'vue'
import './style/index.scss'
import router from './router'
import { createPinia } from 'pinia'
import '@/request'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './qiankun'

const pinia = createPinia()

createApp(App).use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')
