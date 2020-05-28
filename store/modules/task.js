import { ADD_TASK, EDIT_TASK, DELETE_TASK, ADD_TASKS } from "../mutations_type.js"
const state = {
	tasks: []
}

const getters = {
	getTasks: (state, getters, rootState, rootGetters) => ({ planId }) => {
		let tasks = state.tasks.filter( (o) => o.planId == planId )
		tasks.forEach((task) => {
			task.activities = rootGetters["activity/getActivities"]({ taskId: task.id })
		})
		return tasks
	},
	getTotalValue: (state, getters, rootState, rootGetters) => ({ taskId }) => {
		let totalValue = 0
		let getActivities = rootGetters["activity/getActivities"]
		getActivities({ taskId: taskId }).forEach((o) => {
			totalValue += Number(o.value)
		})
		return Number(totalValue)
	},
	getCheckedValue: (state, getters, rootState, rootGetters) => ({ taskId }) => {
		let totalValue = 0
		let getActivities = rootGetters["activity/getActivities"]
		getActivities({ taskId: taskId }).filter((o) => o.checked).forEach((o) => {
			totalValue += Number(o.value)
		})
		return Number(totalValue)
	}
}

const getTmplateTask = () => {
	return {
		id: 0,
		planId: 0,
		name:"",
		activities: new Set()
	}
}
const mutations = {
	[EDIT_TASK] (state, payload) {
		console.debug("mutations: task/EDIT_TASK payload=", payload)
		let task = state.tasks.find((o) => o.id == payload.id)
		if (!task) {
			console.debug("mutations: 没有找到task", task)
		} else {
			let id = payload.id
			delete payload.id
			Object.assign(task, payload)
			payload.id = id
			console.debug("mutations: 找到task", task)
		}
	},
	[ADD_TASK] (state, payload) {
		if (!payload.id) payload.id = this.uuid()
		let template = getTmplateTask()
		Object.assign(template, payload)
		console.debug("mutations: task/ADD_TASK payload=", template)
		state.tasks.push(template)
	},
	[ADD_TASKS] (state, payload) {
		state.tasks = state.tasks.concat(payload)
	},
	[DELETE_TASK] (state, { id }) {
		console.debug("mutations: task/DELETE_TASK id=", id)
		let task = state.tasks.find((o) => o.id == id)
		if (!!task) {
			state.tasks.splice(state.tasks.indexOf(task), 1)
		}
	}
}

const actions = {
	editTask({ commit, state }, task) {
		commit(EDIT_TASK, task)
	},
	addTask({ commit, state }, task) {
		if ( !task.planId) {
			console.error(`actions: task/addTask planIdcan not be ${task.pplanId}`)
			return
		}
		commit(ADD_TASK, task)
	},
	deleteTask({ commit, state }, task) {
		if (!task.id) {
			console.error(`actions: task/addTask task.id can not be ${task.id}`)
			return
		}
		commit(DELETE_TASK, task)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}