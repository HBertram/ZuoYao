<template>
  <view>
	<view style="padding: 10rpx">
		<uni-section class="section" title="计划信息" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="名称" @click="toInputPage({ type: 'bert-tag-group/plan_title', value: plan.title })" :rightText="plan.title"></uni-list-item>
			<uni-list-item title="描述" :rightText="plan.description" @click="toInputPage({ type: 'bert-tag-group/plan_description', value: plan.description })"></uni-list-item>
			<uni-list-item title="注意事项" :rightText="plan.attention" @click="toInputPage({ type: 'bert-tag-group/plan_attention', value: plan.attention })"></uni-list-item>
			<uni-section class="section" title="操作" type="line"></uni-section>
			<uni-list-item title="删除计划" titleColor="red" @click="deletePlan"></uni-list-item>
		</uni-list>
	</view>
	<view>
		<template v-for="(task, groupIndex) in plan.tasks">
			<view :key="task.id">
			  <uni-section class="section" v-show="showSection" :title="task.name" type="line">
				  <uni-icons @click="deleteTask(task)" color="#ff4a4a" size="25" type="closeempty"></uni-icons>
			  </uni-section>
			  <checkbox-group class="content">
					<template v-for="(item, index) in task.activities">
						<view :key="item.id" class="activity-item">
							<text @longpress="showDetail(item)" @click="onActivityClick(item)" :key="index" >  
								{{item.name}}
							</text>
							<uni-icons @click="deleteActivity(item)" class="delete-icon" type="closeempty"></uni-icons>
						</view>
					</template>
					<view class="add-activity-button" @click="addActivity(task)">
						<uni-icons color="#eb5248" size="20" type="plusempty"></uni-icons>
					</view>
			  </checkbox-group>
			</view>
		</template>
		<uni-section class="section" v-show="showSection" title="新增" type="line">
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
					this.api.addTask({
						planId: this.plan.id,
						name: value
					}).then(r => {
						this.reloadPlan()
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
			"emptyPageData": "emptyPageData"
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
						this.api.deleteTask(task).then(r => {
							this.plan.tasks.splice(this.plan.tasks.indexOf(task), 1)
						})
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
						this.api.deletePlan(this.plan).then(r => {
							this.$emit("removed")
						})
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
			uni.showModal({
			    title: '提示',
			    content: '确定删除该项吗',
				confirmText: "删除",
				success: res => {
					if(res.confirm) {
						this.api.deleteActivity(item).then(r => {
							this.plan.tasks.forEach(task => {
								if (task.activities.includes(item)) {
									task.activities.splice(task.activities.indexOf(item), 1)
								}
							})
						})
					}
				}
			});
	    },
		addActivity(task) {
			this.navigator.toActivityEdit({ type: "add", taskId: task.id })
		},
		async onActivityClick(item) {
			this.navigator.toActivityEdit({ type: "edit", activity_id: item.id })
		},
		showDetail(item) {
			this.navigator.toActivityDetail({ activity_id: item.id })
		},
		  labelBtn(e) {
			this.$emit("changeValue")
		  },
		  reloadPlan() {
			  this.api.getPlan({ id: this.plan.id }).then(r => {
				  this.plan = r
			  })
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
