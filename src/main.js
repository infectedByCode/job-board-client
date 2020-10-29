import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

if (process.env.NODE_ENV === 'development' && process.env.DEV_MODE) {
  const { worker } = require('./mocks/browser');
  worker.start();
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
