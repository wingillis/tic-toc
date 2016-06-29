import Vue from 'vue'
import App from './App.vue'

Vue.directive('mdl', {
  bind() {
    componentHandler.upgradeElement(this.el);
  }
})
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
