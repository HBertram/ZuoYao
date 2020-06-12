import Vue from 'vue'
import App from './App'
import navigator from "common/navigator.js"
import api from "api/api.js"
import store from "store/index.js"
Vue.config.productionTip = false


App.mpType = 'app'

Vue.prototype.navigator = navigator
Vue.prototype.api = api

const app = new Vue({
    ...App,
	store
})
app.$mount()