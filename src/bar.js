import Vue from 'vue'
import ProgressBar from './components/ProgressBar.vue'
// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()

export default bar