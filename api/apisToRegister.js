import activityApi from "./apis/api_activity.js"
import planApi from "./apis/api_plan.js"
import taskApi from "./apis/api_task.js"
export default {
	...activityApi,
	...planApi,
	...taskApi,
	login: {
		url: "login",
		method: "post"
	},
	setActive: {
		url: "active",
		method: "post"
	},
	getActives: {
		urlFunc: ({ userId, year, month, date }) => {
			return `actives/${ userId }/${ year }/${ month }/${ date }`
		},
		method: "get"
	},
	getLatestVersion: {
		urlFunc: ({ appid, currentAppVersion }) => {
			return `checkversion/${ appid }/${ currentAppVersion }`
		},
		method: "get"
	},
	getUserInfoByToken: {
		urlFunc: (token) => {
			return `user?token=${ token }`
		},
		method: "get"
	},
	suggestion: {
		url: "suggestion",
		method: "post"
	}
}