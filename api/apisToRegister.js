export default [
		{
			name: "getPlan",
			urlFunc: ({ id }) => {
				return `plan/${ id }`
			},
			method: "get"
		},
		{
			name: "getPlans",
			url: "plans/",
			method: "get"
		},
		{
			name: "savePlan",
			url: "plan/",
			method: "post"
		},
		{
			name: "followPlan",
			urlFunc: ({ user, planId }) => {
				return `user/${ user }/${ planId }`
			},
			method: "post"
		},
		{
			name: "cancelPlan",
			urlFunc: ({ user, planId }) => {
				return `user/${ user }/${ planId }`
			},
			method: "delete"
		},
		{
			name: "login",
			url: "user_auth/",
			method: "post"
		}
	]