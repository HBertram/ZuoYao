import Activity from "@/store/module/Activity.js"
import Chapter from "@/store/module/Chapter.js"
import GroupActivity from "@/store/module/GroupActivity.js"
let api = {
	section: {
		get(param) {
			let lst = [];
			lst.push(new Chapter(1, "life", "生活篇", [api.groupAcitivity.get({type: "life", name: "生活篇"}),api.groupAcitivity.get({type: "life", name: "生活篇"}),api.groupAcitivity.get({type: "life", name: "生活篇"}),api.groupAcitivity.get({type: "life", name: "生活篇"}), api.groupAcitivity.get({type: "social", name: "社交篇"})]))
			lst.push(new Chapter(2, "study", "学习篇", [api.groupAcitivity.get({type: "life", name: "学习篇"})]))
			lst.push(new Chapter(3, "work", "工作篇", [api.groupAcitivity.get({type: "work", name: "工作篇"})]))
			lst.push(new Chapter(4, "social", "社交篇", [api.groupAcitivity.get({type: "social", name: "社交篇"})]))
			return lst
		}
	},
	activity: {
		getDefault(param) {
			let lst = [];
			if (param.type == "life") {
				lst.push(new Activity("吃饭", 1))
				lst.push(new Activity("一觉睡到天亮", 2))
				lst.push(new Activity("瘦了", 3))
				lst.push(new Activity("吃大餐", 4))
			}
			if (param.type == "study") {
				lst.push(new Activity("新技能GET", 1))
				lst.push(new Activity("恍然大悟", 1))
				lst.push(new Activity("成果显著", 1))
				lst.push(new Activity("受到崇拜", 1))
			}
			if (param.type == "work") {
				lst.push(new Activity("时间管理", 1))
				lst.push(new Activity("挖墙角", 1))
				lst.push(new Activity("飞来横财", 1))
				lst.push(new Activity("学习外语", 1))
			} else {
				lst.push(new Activity("多人运动", 1))
			}
			return lst
		},
		get(param) {
			uni.getStorage({
				
			})
			return api.activity.getDefault(param)
		}
	},
	groupAcitivity: {
		get(param) {
			return new GroupActivity(param.name, param.type, api.activity.get(param))
		}
	}
}
export default api