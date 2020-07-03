import Vue from 'vue'
import App from './App'
import navigator from "common/navigator.js"
import api from "api/api.js"
import store from "store/index.js"
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false

Vue.prototype.api = api
Vue.prototype.navigator = navigator

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()