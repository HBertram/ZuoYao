let navigator = {
	toActivityDetail() {
		uni.navigateTo({
			url: "/pages/activity/activity-detail"
		})
	},
	toActivityEdit() {
		uni.navigateTo({
			url: "/pages/activity/activity-edit"
		})
	},
	toChapterEdit() {
		uni.navigateTo({
			url: "/pages/chapter/chapter-edit"
		})
	}
}
export default navigator