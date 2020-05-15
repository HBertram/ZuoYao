import Vue from 'vue'
import Vuex from 'vuex'

import plan from './modules/plan'
import task from './modules/task'
import activity from './modules/activity'
import active from './modules/active'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 0
	},
	getters: {
		total() {
			return 12
		}
	},
	modules: {
		plan, 
		task,
		activity,
		active
	}
})

export default store
