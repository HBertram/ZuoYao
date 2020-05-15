let navigator = {
	toActivityDetail({ activity_id }) {
		uni.navigateTo({
			url: `/pages/activity/activity-detail?activity_id=${activity_id}`
		})
	},
	toActivityEdit({ type, activity_id }) {
		uni.navigateTo({
			url: `/pages/activity/activity-edit?type=${type}&activity_id=${activity_id}`
		})
	},
	toChapterEdit() {
		uni.navigateTo({
			url: "/pages/plan/plan-edit"
		})
	}
}
export default navigator