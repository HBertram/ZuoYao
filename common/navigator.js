let navigator = {
	back() {
		uni.navigateBack({
			
		})
	},
	toMain() {
		uni.reLaunch({
			url: "/pages/home/home"
		})
	},
	toUpdate(param) {
		uni.navigateTo({
			url: `/pages/update/update?${parseParam(param)}`
		})
	},
	toActivityDetail({ activity_id }) {
		uni.navigateTo({
			url: `/pages/activity/activity-detail?activity_id=${activity_id}`
		})
	},
	toActivityEdit(param) {
		uni.navigateTo({
			url: `/pages/activity/activity-edit?${parseParam(param)}`,
			complete() {
				console.log("complete")
			}
		})
	},
	toChapterEdit(planId) {
		uni.navigateTo({
			url: "/pages/plan/plan-edit?planId=" + planId
		})
	},
	toInput(param) {
		uni.navigateTo({
			url: `/pages/common/input?${parseParam(param)}`
			
		})
	},
	toSuggestion() {
		uni.navigateTo({
			url: `/pages/suggestion/suggestion`
		})
	}
}

function parseParam(obj) {
	let lst = []
	for (let key in obj) {
		if (!!obj[key]) lst.push(`${key}=${obj[key]}`)
	}
	return lst.join("&")
}

export default navigator