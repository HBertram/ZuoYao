import { EDIT_ACTIVITY, ADD_ACTIVITY, DELETE_ACTIVITY, ADD_ACTIVITIES } from "../mutations_type.js"
import Vue from "vue"
const state = {
	activities: [
		/*{
			taskId: 1,
			id: 0,
			name: "吃饭",
			value: 1,
			description: "",
			detail: "",
			attention: "",
			checked: false
			
		},
		{			taskId: 1,
			id:1,
			name:"一觉睡到天亮",
			value:2,description:"",detail:"",attention:"",
			checked: false
		},
		{			taskId: 1,
			id:2,name:"瘦了",value:3,description:"",detail:"",attention:"",
			checked: false
			
		},
		{			taskId: 1,
			id:3,name:"吃大餐",value:4,description:"",detail:"",attention:"",
			checked: false
			
		}*/
		]
}

const getters = {
	getActivities: (state, getters, rootState, rootGetters) => ({ taskId }) => {
		let actives = rootGetters["active/getActive"]({date:"2020-05-14"})
		let activities = state.activities.filter( (o) => o.taskId == taskId )
		activities.forEach((activity) => {
			let active = actives.find((o) => o.activity_id == activity.id)
			activity.checked = !active ? false : active.checked
		})
		return activities
	},
	getActivity: (state, getters, rootState, rootGetters) => ({ id }) => {
		let active = rootGetters["active/getActive"]({ date:"2020-05-14", activity_id: id })[0]
		let activity = state.activities.find( (o) => o.id == id )
		activity.checked = !active ? false : active.checked
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
			Object.assign(activity, payload)
			payload.id = id
			console.debug("mutations: 找到activity", activity)
		}
	},
	[ADD_ACTIVITY] (state, payload) {
		payload.id = this.uuid()
		console.debug(`mutations: activity/ADD_ACTIVITY payload=`, payload)
		state.activities.push(payload)
	},
	[ADD_ACTIVITIES] (state, payload) {
		state.activities = state.activities.concat(payload)
	},
	[DELETE_ACTIVITY] (state, { id }) {
		console.debug(`mutations: activity/DELETE_ACTIVITY id=`, id)
		let activity = state.activities.find((o) => o.id == id)
		if (!!activity) {
			state.activities.splice(state.activities.indexOf(activity), 1)
		}
	}
}

const actions = {
	editActivity({ commit, state }, activity) {
		commit(EDIT_ACTIVITY, activity)
	},
	addActivity({ commit, state }, activity) {
		if ( !activity.taskId ) {
			console.error(`actions: activity/addActivity activity.taskId can not be ${activity.taskId}`)
			return
		}
		commit(ADD_ACTIVITY, activity)
	},
	deleteActivity({ commit, state }, activity) {
		if (!activity.id) {
			console.error(`actions: activity/addActivity activity.id can not be ${activity.id}`)
			return
		}
		commit(DELETE_ACTIVITY, activity)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}