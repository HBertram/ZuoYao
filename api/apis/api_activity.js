export default {
	addActivity: {
		url: "activity",
		method: "post"
	},
	saveActivity: {
		url: "activity",
		method: "post"
	},
	getActivity: {
		urlFunc: ({ id }) => {
			return `activity/${ id }`
		},
		method: "get"
	},
	deleteActivity: {
		urlFunc: ({ id }) => {
			return `activity/${ id }`
		},
		method: "delete"
	}
}