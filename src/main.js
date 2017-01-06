// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueCodeMirror from 'vue-codemirror'
import VueMaterial from 'vue-material'

// Styles
import './assets/styles/styles.scss'

console.log()
Vue.use(VueCodeMirror)
Vue.use(VueMaterial)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
