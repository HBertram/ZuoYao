import { EDIT_ACTIVE } from "../mutations_type.js"
const state = {
	active: [
		{
			date: "2020-05-14",
			activity_state: [
				{ activity_id: 1, checked: true }
			]
		}
	]
}

const getters = {
	getActive: (state, getters, rootState, rootGetters) => ({ date, activity_id }) => {
		let active = state.active.find((o) => o.date == date)
		if (!active) active = { date, activity_state: [] }
		let activity_state = active.activity_state
		if(!!activity_id) {
			let res = activity_state.find((o) => o.activity_id == activity_id)
			if (!res) activity_state.push({ activity_id, checked: false })
		}
		return activity_state
	}
}

const mutations = {
	[EDIT_ACTIVE] (state, { date, id, checked }) {
		let active = state.active.find((o) => o.date == date)
		if (!active) {
			active = { date, activity_state: [] }
			state.active.push(active)
		}
		let activity_state = active.activity_state.find((o) => o.activity_id == id)
		if (!activity_state) {
			activity_state = { activity_id: id, checked: checked }
			active.activity_state.push(activity_state)
		}
		console.debug(`mutations: active/EDIT_ACTIVE date=${date} activity_state=`, activity_state)
		activity_state.checked = checked
	}
}

const actions = {
	setActivityCheckState({ commit, state }, { date, id, checked }) {
		commit(EDIT_ACTIVE, { date, id, checked })
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}