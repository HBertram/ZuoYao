export default {
	getPlan: {
		urlFunc: ({ id }) => {
			return `plan/${ id }`
		},
		method: "get"
	},
	getUserOnedayPlans: {
		urlFunc: ({ user, year, month, day }) => {
			return `plans/${ user }/${ year }/${ month }/${ day }`
		},
		method: "get"
	},
	getUserPlans: {
		urlFunc: ({ user, isBrief }) => {
			return `plans/${ user }?isBrief=${ !!isBrief?'true':'false' }`
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
			return `user/${ user }/${ planId }`
		},
		method: "post"
	},
	cancelPlan: {
		urlFunc: ({ user, planId }) => {
			return `user/${ user }/${ planId }`
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