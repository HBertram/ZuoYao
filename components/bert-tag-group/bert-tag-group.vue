<template>
  <view>
	<view style="padding: 10rpx">
		<view v-if="isEdit">
			<uni-section class="section" title="计划信息" type="line"></uni-section>
			<uni-list>
				<uni-list-item title="名称" @click="toInputPage({ type: 'bert-tag-group/plan_title', value: plan.title })" :rightText="plan.title"></uni-list-item>
				<uni-list-item title="描述" :rightText="plan.description" @click="toInputPage({ type: 'bert-tag-group/plan_description', value: plan.description })"></uni-list-item>
				<uni-list-item title="注意事项" :rightText="plan.attention" @click="toInputPage({ type: 'bert-tag-group/plan_attention', value: plan.attention })"></uni-list-item>
				<uni-section class="section" title="操作" type="line"></uni-section>
					<uni-list-item title="删除计划" titleColor="red" @click="deletePlan"></uni-list-item>
					<uni-list-item title="同步到服务器" @click="uploadToServer"></uni-list-item>
				</uni-list>
		</view>
		<view v-else>
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
				  <uni-icons v-if="isEdit" @click="deleteTask(task)" color="#ff4a4a" size="25" type="closeempty"></uni-icons>
			  </uni-section>
			  <checkbox-group class="content">
					<template v-for="(item, index) in task.activities">
						<view :key="item.id" :class="item.checked && !isEdit ?  'activity-item selectBox' : 'activity-item '">
							<checkbox :checked="item.checked" v-show="false"/>
							<text @longpress="showDetail(item)" @click="onActivityClick(item)" :key="index" >  
								{{item.name}}
							</text>
							<uni-icons v-if="isEdit" @click="deleteActivity(item)" class="delete-icon" type="closeempty"></uni-icons>
						</view>
					</template>
					<view v-if="isEdit" class="add-activity-button" @click="addActivity(task)">
						<uni-icons color="#eb5248" size="20" type="plusempty"></uni-icons>
					</view>
			  </checkbox-group>
			</view>
		</template>
		<uni-section v-if="isEdit" class="section" v-show="showSection" title="新增" type="line">
			<uni-icons @click="addTask(plan)" color="#55aaff" size="25" type="plusempty"></uni-icons>
		</uni-section>
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
		  isEdit: {
			  type: Boolean,
			  required: false,
			  default: false
		  },
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
		  planId: {
			  type: [ Number, String ],
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
			"pageData"
		]),
		plan() { return this.$store.getters["plan/getPlan"]({ planId: this.planId }) }
	},
	watch: {
		pageData(v1, v2) {
			if (this.isWait && !!this.pageData.type) {
				let type = this.pageData.type
				let value = this.pageData.value
				this.emptyPageData()
				if ( type == "bert-tag-group/add_task_name" ) {
					this.addTaskAction({
						planId: this.planId,
						name: value
					})
				} else if ( type == "bert-tag-group/plan_title" ) {
					this.editPlanAction({ id: this.planId, title: value })
				} else if ( type == "bert-tag-group/plan_description" ) {
					this.editPlanAction({ id: this.planId, description: value })
				} else if ( type == "bert-tag-group/plan_attention" ) {
					this.editPlanAction({ id: this.planId, attention: value })
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
			"editPlanAction": "plan/editPlan",
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
		addActivity(task) {
			this.navigator.toActivityEdit({ type: "add", taskId: task.id })
		},
		async onActivityClick(item) {
			if (this.isEdit) {
				this.navigator.toActivityEdit({ type: "edit", activity_id: item.id })
			} else {
				this.setActivityCheckState({ date: "2020-05-14", id: item.id, checked: !item.checked })
			}
		},
		showDetail(item) {
			this.navigator.toActivityDetail({ activity_id: item.id })
		},
		uploadToServer() {
			this.api.savePlan(this.plan).then((r) => {
				uni.showToast({
					icon: "none",
					title: "保存成功"
				})
			}, r => {console.log("rejected")})
		},
      labelBtn(e) {
		  console.log(e)
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
