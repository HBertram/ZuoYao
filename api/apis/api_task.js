export default {
	addTask: {
		url: "task",
		method: "post"
	},
	saveTask: {
		url: "task",
		method: "post"
	},
	getTask: {
		urlFunc: ({ id }) => {
			return `task/${ id }`
		},
		method: "get"
	},
	deleteTask: {
		urlFunc: ({ id }) => {
			return `task/${ id }`
		},
		method: "delete"
	}
}