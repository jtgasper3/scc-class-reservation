import Vue from 'vue';
import { BootstrapVue, BIconXCircle } from 'bootstrap-vue';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/*const instanceId = Vue.observable({ id: '' })
Object.defineProperty(Vue.prototype, '$instanceId', {
  get () {
    return instanceId.id
  },
  
  set (value) {
    instanceId.id = value
  }
})*/

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueFilterDateFormat);
Vue.component('BIconXCircle', BIconXCircle);

const vm = new Vue({
  data: {instanceId: '/'},
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
