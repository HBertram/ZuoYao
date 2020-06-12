let navigator = {
	toMain() {
		uni.reLaunch({
			url: "/pages/home/home"
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
	toChapterEdit() {
		uni.navigateTo({
			url: "/pages/plan/plan-edit"
		})
	},
	toInput(param) {
		uni.navigateTo({
			url: `/pages/common/input?${parseParam(param)}`
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