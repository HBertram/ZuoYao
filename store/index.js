import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import plan from './modules/plan'
import task from './modules/task'
import activity from './modules/activity'
import active from './modules/active'
import api from '@/api/api.js'
import { uuid } from "@/common/utils.js"
import { EDIT_PAGEDATA, EMPTY_PAGEDATA, LOGIN, LOGOUT, USER_FOLLOW_PLAN, USER_CANCEL_PLAN, ADD_TASKS, ADD_PLAN, ADD_ACTIVITIES } from "./mutations_type.js"

Vue.use(Vuex)
Vuex.Store.prototype.uuid = uuid
Vuex.Store.prototype.api = api
const store = new Vuex.Store({
	plugins: [
		persistedState({
			storage: {
				getItem: key => {
					return uni.getStorageSync(key)
				},
				setItem: (key, value) => uni.setStorage({
					key: key,
					data: value
				}),
				removeItem: key => uni.removeStorage({
					key: key
				})
			}
		})
	],
	state: {
		pageData: {},
		/**
		 * 是否需要强制登录
		 */
		planIds: [],
		userInfo: {
		},
		forcedLogin: false,
		hasLogin: false
	},
	mutations: {
		[LOGIN](state, userInfo) {
			state.userInfo = userInfo || '新用户';
			state.hasLogin = true;
		},
		[LOGOUT](state) {
			state.userName = "";
			state.hasLogin = false;
		},
		[EDIT_PAGEDATA](state, payload) {
			state.pageData = payload
		},
		[EMPTY_PAGEDATA](state) {
			state.pageData = {}
		},
		[USER_FOLLOW_PLAN](state, payload) {
			if (!state.planIds.includes(payload.planId)) state.planIds.push(payload.planId)
		},
		[USER_CANCEL_PLAN](state, payload) {
			console.log(state.planIds, payload.planId)
			state.planIds.splice(state.planIds.indexOf(payload.planId), 1)
		}
	},
	actions: {
		login({ commit, state }, loginInfo) {
			return this.api.login(loginInfo).then((data) => {
				if (!!data) commit(LOGIN, data)
				return data
			})
		},
		logout({ commit, state }, data) {
			
		},
		followPlan({ commit, dispatch, state, rootState }, { planId }) {
			commit(USER_FOLLOW_PLAN, { planId })
			this.api.followPlan( { user: state.userInfo.name, planId: planId })
			if (!rootState.plan.plans.find(o => o.id == planId)) {
				dispatch("loadPlanFromServer", { planId })
			}
		},
		cancelPlan({ commit, state }, { planId }) {
			commit(USER_CANCEL_PLAN, { planId })
			this.api.cancelPlan( { user: state.userInfo.name, planId: planId })
		},
		editPageData({ commit, state }, data) {
			commit(EDIT_PAGEDATA, data)
		},
		emptyPageData({ commit, state }) {
			commit(EMPTY_PAGEDATA)
		},
		loadPlanFromServer({ commit, state, rootState }, { planId }) {
			console.log(planId)
			this.api.getPlan({ id: planId }).then(r => {
				let tasks = r.tasks
				r.tasks = []
				let activities = []
				tasks.forEach(t => {
					activities = activities.concat(t.activities)
					t.activities = []
				})
				commit("plan/"+ADD_PLAN, r)
				commit("task/"+ADD_TASKS, tasks)
				commit("activity/"+ADD_ACTIVITIES, activities)
				
				console.log("loadPlanFromServer: ", r)
			})
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
