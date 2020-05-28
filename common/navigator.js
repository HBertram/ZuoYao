let navigator = {
	toMain() {
		uni.reLaunch({
			url: "/pages/tabbar/tabbar-1/tabbar-1"
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
		lst.push(`${key}=${obj[key]}`)
	}
	return lst.join("&")
}

export default navigator