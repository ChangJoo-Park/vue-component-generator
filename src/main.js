// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'

// Styles
import './assets/styles/styles.scss'
import '../node_modules/codemirror/lib/codemirror.css'

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
