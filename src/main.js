import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import Vuex from 'vuex';
import store from './store.js';

Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
