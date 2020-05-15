import { EDIT_ACTIVITY } from "../mutations_type.js"
import Vue from "vue"
const state = {
	activities: [{
			task_id: 1,
			id: 0,
			name: "吃饭",
			value: 1,
			description: "",
			detail: "",
			attention: "",
			checked: false
			
		},
		{			task_id: 1,
			id:1,
			name:"一觉睡到天亮",
			value:2,description:"",detail:"",attention:"",
			checked: false
		},
		{			task_id: 1,
			id:2,name:"瘦了",value:3,description:"",detail:"",attention:"",
			checked: false
			
		},
		{			task_id: 1,
			id:3,name:"吃大餐",value:4,description:"",detail:"",attention:"",
			checked: false
			
		}]
}

const getters = {
	getActivities: (state, getters, rootState, rootGetters) => ({ task_id }) => {
		console.info(`getters: activity/getActivities task_id = ${task_id}`)
		let actives = rootGetters["active/getActive"]({date:"2020-05-14"})
		let activities = state.activities.filter( (o) => o.task_id == task_id )
		activities.forEach((activity) => {
			let active = actives.find((o) => o.activity_id == activity.id)
			activity.checked = !active ? false : active.checked
			console.info(`getters: activity/getActivities activity_id=${activity.id} checked=${activity.checked}`)
		})
		return activities
	},
	getActivity: (state, getters, rootState, rootGetters) => ({ id }) => {
		let active = rootGetters["active/getActive"]({ date:"2020-05-14", activity_id: id })[0]
		let activity = state.activities.find( (o) => o.id == id )
		activity.checked = !active ? false : active.checked,
		console.info(`getters: activity/getActivity activity_id = ${id} activity=`, activity)
		return activity
	}
}

const mutations = {
	[EDIT_ACTIVITY] (state, payload) {
		console.debug(`mutations: activity/EDIT_ACTIVITY payload=`, payload)
		let activity = state.activities.find((o) => o.id == payload.id)
		if (!activity) {
			console.debug("mutations: 没有找到activity", activity)
		} else {
			let id = payload.id
			delete payload.id
			payload.id = id
			Object.assign(activity, payload)
			console.debug("mutations: 找到activity", activity)
		}
	}
}

const actions = {
	editActivity({ commit, state }, activity) {
		commit(EDIT_ACTIVITY, activity)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}