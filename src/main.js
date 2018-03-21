// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/keymap/sublime'

// Styles
import './assets/vendors/picnic.css'
import './assets/vendors/picnic-plugins.css'
import './assets/styles/styles.scss'

Vue.use(VueCodeMirror)
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
