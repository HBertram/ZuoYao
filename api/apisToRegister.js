import activityApi from "./apis/api_activity.js"
import planApi from "./apis/api_plan.js"
import taskApi from "./apis/api_task.js"
export default {
	...activityApi,
	...planApi,
	...taskApi,
	login: {
		url: "user_auth/",
		method: "post"
	},
	setActive: {
		url: "active/",
		method: "post"
	},
	getActives: {
		urlFunc: ({ userId, year, month, day }) => {
			return `actives/${ userId }/${ year }/${ month }/${ day }`
		},
		method: "get"
	},
	getLatestVersion: {
		urlFunc: ({ appid, currentAppVersion }) => {
			return `checkversion/${ appid }/${ currentAppVersion }`
		},
		method: "get"
	}
}