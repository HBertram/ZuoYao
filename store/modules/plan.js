import { ADD_PLAN, EDIT_PLAN, DELETE_PLAN } from "../mutations_type.js"

const state = {
	plans: [
		/*
		{
			id: "1", 
			title: "生活篇",
			description: "生活中寻找美丽的瞬间",
			attention: "",
			tasks: []
		},
		{
			id: "2",
			title: "学习篇",
			description: "生活中寻找美丽的瞬间",
			attention: "",
			tasks: []
		}
		*/
	]
}

const getters = {
	templatePlan() {
		return {
			id: 0,
			title: "",
			description: "",
			attention: "",
			author: "",
			tasks: []
		}
	},
	plans(state, getters, rootState, rootGetters) {
		let plans = []
		rootState.planIds.forEach(planId => {
			let plan = state.plans.find(o => o.id == planId)
			if(!!plan) plans.push(plan)
		})
		plans.forEach((o) => {
			o.tasks = rootGetters["task/getTasks"]({ planId : o.id })
		})
		return plans
	},
	createdPlans(state, getters, rootState, rootGetters) {
		let plans = []
		let userName = rootState.userInfo.name
		plans = state.plans.filter(p => p.author = userName)
		plans.forEach((o) => {
			o.tasks = rootGetters["task/getTasks"]({ planId : o.id })
		})
		return plans
	},
	getPlan: (state, getters, rootState, rootGetters) => ({ planId }) => {
		return getters.plans.find((o) => o.id == planId)
	},
	getTotalValue: (state, getters, rootState, rootGetters) => ({ planId }) => {
		let total = 0
		let plan = getters.plans.find((o) => o.id == planId)
		if (!plan) return 0
		let getTaskTotal = rootGetters["task/getTotalValue"]
		plan.tasks.forEach((o) => {
			total += getTaskTotal({ taskId : o.id })
		})
		return Number(total)
	},
	getCheckedValue: (state, getters, rootState, rootGetters) => ({ planId }) => {
		let total = 0
		let getActivitiesCheckedValue = rootGetters["task/getCheckedValue"]
		let tasks = getters.getPlan({ planId }).tasks
		!tasks ? 0 : getters.getPlan({ planId }).tasks.forEach((o) => {
			total += getActivitiesCheckedValue({ taskId: o.id })
		})
		return Number(total)
	}
}

const getTmplatePlan = () => {
	return {
		id: 0,
		title: "",
		description: "",
		attention: "",
		tasks: []
	}
}

const mutations = {
	[EDIT_PLAN] (state, payload) {
		let plan = state.plans.find((o) => o.id == payload.id)
		if (!plan) {
			console.warn("mutations: 没有找到plan", plan)
		} else {
			let id = payload.id
			delete payload.id
			Object.assign(plan, payload)
			payload.id = id
		}
	},
	[ADD_PLAN] (state, payload) {
		if (!payload.id) payload.id = this.uuid()
		let template = getTmplatePlan()
		Object.assign(template, payload)
		state.plans.push(template)
	},
	[DELETE_PLAN] (state, { id }) {
		let plan = state.plans.find((o) => o.id == id)
		if (!!plan) {
			state.plans.splice(state.plans.indexOf(plan), 1)
		}
	}
}

const actions = {
	editPlan({ commit, state }, plan) {
		commit(EDIT_PLAN, plan)
	},
	addPlan({ commit, state, rootState }, plan) {
		plan.author = rootState.userInfo.name
		commit(ADD_PLAN, plan)
	},
	deletePlan({ commit, state }, plan) {
		if (!plan.id) {
			console.error(`actions: plan/addPlan plan.id can not be ${plan.id}`)
			return
		}
		commit(DELETE_PLAN, plan)
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}