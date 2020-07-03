export default {
	searchPlan: {
		url: `plan`,
		method: "get"
	},
	getPlan: {
		urlFunc: ({ id }) => {
			return `plan/${ id }`
		},
		method: "get"
	},
	getUserOnedayPlans: {
		urlFunc: ({ user, year, month, date }) => {
			return `plans/${ user }/${ year }/${ month }/${ date }`
		},
		method: "get"
	},
	getUserPlans: {
		urlFunc: ({ user }) => {
			return `plans/${ user }`
		},
		method: "get"
	},
	getPlans: {
		url: `plans`,
		method: "get"
	},
	savePlan: {
		url: "plan",
		method: "post"
	},
	followPlan: {
		urlFunc: ({ user, planId }) => {
			return `user_plan_map/${ user }/${ planId }`
		},
		method: "post"
	},
	cancelPlan: {
		urlFunc: ({ user, planId }) => {
			return `user_plan_map/${ user }/${ planId }`
		},
		method: "delete"
	},
	deletePlan: {
		urlFunc: ({ id }) => {
			return `plan/${ id }`
		},
		method: "delete"
	}
}