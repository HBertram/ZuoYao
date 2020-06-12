<template>
  <view>
	<view style="padding: 10rpx">
		<view>
			<view class="form-item uni-flex">
				<view class="form-label">描述</view>
				<text class="form-value">{{plan.description}}</text>
			</view>
			<view class="form-item uni-flex">
				<view class="form-label">注意事项</view>
				<text class="form-value">{{plan.attention}}</text>
			</view>
		</view>
	</view>
	<view>
		<template v-for="(task, groupIndex) in plan.tasks">
			<view :key="task.id">
			  <uni-section class="section" v-show="showSection" :title="task.name" type="line">
			  </uni-section>
			  <checkbox-group class="content">
					<template v-for="(item, index) in task.activities">
						<view :key="item.id" :class="item.active.checked ? 'activity-item selectBox' : 'activity-item'">
							<checkbox :checked="item.active.checked" v-show="false"/>
							<text @longpress="showDetail(item)" @click="onActivityClick(item)" :key="index" >  
								{{item.name}}
							</text>
						</view>
					</template>
			  </checkbox-group>
			</view>
		</template>
	</view>
  </view>
</template>


<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import { SET_ACTIVITY } from "@/store/mutations_type.js"
	import evanForm from "@/components/evan-form/evan-form.vue"
	import evanFormItem from "@/components/evan-form/evan-form-item.vue"
	import { mapState, mapActions } from "vuex"
  export default {
	  components: { evanForm, evanFormItem, uniDrawer },
	  props: {
		  showSection: {
			  type: Boolean,
			  required: false,
			  default: true
		  },
		  title: {
			  type: String,
			  required: false,
			  default: "标签"
		  },
		  type: {
			  type: String,
			  required: false,
			  default: "default"
		  },
		  plan: {
			  type: Object,
			  required: true
		  }
	  },
    data() {
      return {
		  addTag: {
			  value: "",
			  isAdding: false,
			  text: "点击新增"
		  },
		  isWait: false
      };
    },
	computed: {
		...mapState([
			"pageData", "userInfo"
		])
	},
	watch: {
		pageData(v1, v2) {
			if (this.isWait && !!this.pageData.type) {
				let type = this.pageData.type
				let value = this.pageData.value
				this.emptyPageData()
				if ( type == "bert-tag-group/add_task_name" ) {
					this.addTaskAction({
						planId: this.plan.id,
						name: value
					})
				} else if ( type == "bert-tag-group/plan_title" ) {
					this.plan.title = value
					let obj = Object.assign({}, this.plan)
					obj.tasks = []
					this.api.savePlan(obj)
				} else if ( type == "bert-tag-group/plan_description" ) {
					this.plan.description = value
					let obj = Object.assign({}, this.plan)
					obj.tasks = []
					this.api.savePlan(obj)
				} else if ( type == "bert-tag-group/plan_attention" ) {
					this.plan.attention = value
					let obj = Object.assign({}, this.plan)
					obj.tasks = []
					this.api.savePlan(obj)
				}
				this.isWait = false
			}
		}
	},
    methods:{
		...mapActions({
			"setActivityCheckState": "active/setActivityCheckState",
			"deleteActivityAction": "activity/deleteActivity",
			"addTaskAction": "task/addTask",
			"deleteTaskAction": "task/deleteTask",
			"emptyPageData": "emptyPageData",
			"deletePlanAction": "plan/deletePlan"
		}),
		deleteTask(task) {
			uni.showModal({
				title: '删除确认',
				content: `确定删除 (${task.name}) 吗?`,
				showCancel: true,
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if(res.confirm) {
						this.deleteTaskAction(task)
					}
				}
			});
		},
		deletePlan() {
			uni.showModal({
				title: '删除确认',
				content: `确定删除计划 - (${this.plan.title}) 吗?`,
				showCancel: true,
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if(res.confirm) {
						this.deletePlanAction(this.plan)
					}
				}
			});
		},
		toInputPage(param) {
			this.isWait = true
			this.navigator.toInput(param)
		},
		addTask(plan) {
			this.toInputPage({ type: "bert-tag-group/add_task_name" })
		},
	    deleteActivity(item) {
			let that = this
			uni.showModal({
			    title: '提示',
			    content: '确定删除该项吗',
				confirmText: "删除",
			    success: function (res) {
			        if (res.confirm) {
						that.deleteActivityAction(item)
			        } else if (res.cancel) {
			        }
			    }
			});
	    },
		async onActivityClick(item) {
			this.api.setActive(Object.assign(item.active, {
				year: 2020, 
				month: 5, 
				day: 20, 
				activityId: item.id, 
				checked: !item.active.checked, 
				userId: this.userInfo.id
			}))
		},
		showDetail(item) {
			this.navigator.toActivityDetail({ activity_id: item.id })
		},
      labelBtn(e) {
		this.$emit("changeValue")
	  },
	  getTotalValue() {
		  return this.plan.activityGroup.map((o) => o.activities.getCheckedValue()).reduce((i, j) => i+j); 
	  }
    }
  }
</script>

<style>
  .selectBox{
    background-color: #EB5248!important;
    color: #fff!important;
  }
  .activity-item {
	position: relative;
	display: inline-block;
	flex-wrap: wrap;
	padding: 10rpx 20rpx;
	border: 1rpx solid #EB5248;
	margin: 12rpx;
	border-radius: 7rpx;
	color: #000;
  }
  .checkbox{
  }
  .content{
    padding: 5rpx 20rpx 5rpx 20rpx;
  }
  .add-tag{
	  color: #ffffff;
	  background-color: #eb5248;
  }
  .section{
	  height: 70rpx;
	  margin: 0rpx;
  }
  .delete-icon {
	  font-weight: bolder;
  }
  .add-text {
	  height: 100rpx;
  }
  
  /* form */
  .info {
	  padding: 0 20rpx;
  }
	.form-item {
		margin: 10rpx;
	}
	.form-label {
		flex: 3;
		color: #7f7f7f;
	}
	.form-value {
		flex: 8;
		color: #2b2b2b;
	}
	.form-input {
		border-bottom: 1px solid #000000;
	}
	.add-group {
		display: flex;
		justify-content: center;
	}
	.add-activity-button {
		display: inline;
		margin-left: 20rpx;
		font-weight: bold;
	}
</style>
