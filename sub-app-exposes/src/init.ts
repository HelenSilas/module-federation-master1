import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';

let app: any = null;
function render(props: any) {
  const { container } = props;
  app = createApp(App);

  app.use(router)
    .use(ElementPlus, { locale })
    .mount(container ? container.querySelector('#app') : '#app');
}
/**
 * bootstrap ： 在微应用初始化的时候调用一次，之后的生命周期里不再调用
 */
async function bootstrap() {
  console.log('bootstrap');
}

/**
 * mount ： 在应用每次进入时调用
 */
async function mount(props: any) {
  console.log('mount-general', props);
  render(props);
}

/**
 * unmount ：应用每次 切出/卸载 均会调用
 */
async function unmount() {
  console.log('unmount-general');
  app.unmount();
}

function update() {
  console.log('update-general');
}
export {
  render,
  app,
  mount,
  update,
  unmount,
  bootstrap,

}
