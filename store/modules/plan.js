const state = {
	plans: [
		{
			id: 1, 
			title: "生活篇",
			description: "生活中寻找美丽的瞬间",
			attention: "",
			tasks: []
		},
		{
			id: 2,
			title: "学习篇",
			description: "生活中寻找美丽的瞬间",
			attention: "",
			tasks: []
		}
	]
}

const getters = {
	plans(state, getters, rootState, rootGetters) {
		state.plans.forEach((o) => {
			o.tasks = rootGetters["task/getTasks"]({ plan_id : o.id })
		})
		return state.plans
	},
	getPlan: (state, getters, rootState, rootGetters) => ({ plan_id }) => {
		console.info(`getters: plan/getPlan plan_id:${plan_id}`)
		return getters.plans.find((o) => o.id == plan_id)
	},
	getTotalValue: (state, getters, rootState, rootGetters) => ({ plan_id }) => {
		let total = 0
		let plan = getters.plans.find((o) => o.id == plan_id)
		if (!plan) return 0
		let getTaskTotal = rootGetters["task/getTotalValue"]
		plan.tasks.forEach((o) => {
			total += getTaskTotal({ task_id : o.id })
		})
		console.info(`getters: plan/getTotalValue plan_id:${plan_id} totalValue:${total}`)
		return Number(total)
	},
	getCheckedValue: (state, getters, rootState, rootGetters) => ({ plan_id }) => {
		let total = 0
		let getActivitiesCheckedValue = rootGetters["task/getCheckedValue"]
		getters.getPlan({ plan_id }).tasks.forEach((o) => {
			total += getActivitiesCheckedValue({ task_id: o.id })
		})
		console.info(`getters: plan/getCheckedValue plan_id:${plan_id} totalValue:${total}`)
		return Number(total)
	}
}

const mutations = {
	
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}