const state = {
	tasks: [{
				id: 1,
				plan_id: 1,
				name:"生活篇",
				activities: []
			},{
				id: 2,
				plan_id: 1,
				name:"社交篇",
				activities: []
			},
			{
				id: 3,
				plan_id: 2,
				name:"生活篇",
				activities: []
			},{
				id: 4,
				plan_id: 2,
				name:"社交篇",
				activities: []
			}]
}

const getters = {
	getTasks: (state, getters, rootState, rootGetters) => ({ plan_id }) => {
		let tasks = state.tasks.filter( (o) => o.plan_id == plan_id )
		tasks.forEach((task) => {
			task.activities = rootGetters["activity/getActivities"]({ task_id: task.id })
		})
		return tasks
	},
	getTotalValue: (state, getters, rootState, rootGetters) => ({ task_id }) => {
		let totalValue = 0
		let getActivities = rootGetters["activity/getActivities"]
		getActivities({ task_id: task_id }).forEach((o) => {
			totalValue += Number(o.value)
		})
		return Number(totalValue)
	},
	getCheckedValue: (state, getters, rootState, rootGetters) => ({ task_id }) => {
		let totalValue = 0
		let getActivities = rootGetters["activity/getActivities"]
		getActivities({ task_id: task_id }).filter((o) => o.checked).forEach((o) => {
			totalValue += Number(o.value)
		})
		return Number(totalValue)
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