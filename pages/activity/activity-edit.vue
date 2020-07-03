<template>
	<view class="uni-page-body">
		<evan-form class="evan-form-show" :hide-required-asterisk="true" ref="form" :model="activity">
			<evan-form-item label="名称：" prop="name">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="activity.name" placeholder="请输入名称" />
			</evan-form-item>
			<evan-form-item label="分值：" prop="desc">
				<input type="number" class="form-input" placeholder-class="form-input-placeholder" v-model="activity.value" placeholder="输入分值" />
			</evan-form-item>
			<evan-form-item label="类型:" prop="desc">
				<text class="form-input" @click="showTypeSelect = true">{{(getActivityText(activity.type))}}</text>
				<u-select @confirm="handleTypeChange" mode="mutil-column-auto" v-model="showTypeSelect" :list="list"></u-select>
			</evan-form-item>
			<evan-form-item label="简介：" prop="desc" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="activity.description" placeholder="请输入简介(10-30个字)" />
			</evan-form-item>
			<evan-form-item label="注意事项：" prop="desc" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="activity.attention" placeholder="请输入简介(10-30个字)" />
			</evan-form-item>
		</evan-form>
	</view>
</template>

<script>
	import evanForm from "@/components/evan-form/evan-form.vue"
	import evanFormItem from "@/components/evan-form/evan-form-item.vue"
	import { mapState, mapGetters, mapActions } from 'vuex'
	const WEEKTEXT = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
	export default {
		components: {evanForm, evanFormItem},
		data() {
			return {
				  /*   * 0-9999 表示从开始日起第n天。 1表示当天（第一天），2表示第二天
					 * 10000-19999 表示从开始日起间隔n天一次 。10000表示每天，10001表示隔一天
					 * 20000-29999 表示每周n。20001表示每周一
					 * 30000-39999 表示每周n天。
					 * 40000-49999 表示每月n日。30001表示每月一号
					 * 50000-59999 表示每月n天。 */
				showTypeSelect: false,
				list: [
					{
						value: 0,
						label: '第n天',
						children: new Array(30).fill(undefined).map((o,i) => {
							return {value:i+1, label:`第${i+1}天`}
						})
					},
					{
						value: 1,
						label: '每n天',
						children: [
							{ value: 0, label: "每天"},
							...new Array(7).fill(undefined).map((o,i) => {
								return {value:i+1, label:`每隔${i+1}天`}
							})
						]
					},
					{
						value: 2,
						label: '每周n',
						children: [
							...new Array(7).fill(undefined).map((o,i) => {
								return {value:i+1, label:`每${WEEKTEXT[i]}`}
							})
						]
					}
				],
				type: "",
				activity: {
					id: 0,
					taskId: 0,
					name: "",
					value: 0,
					attention: "",
					description: "",
					type: 0
				}
			}
		},
		methods: {
			getActivity() {
				
			},
			handleTypeChange(values) {
				this.activity.type = values[0].value * 10000 + values[1].value
			},
			getActivityText(activitytype) {
				let type = activitytype || 0
				if (type == 0) {
					return "默认（每天）"
				} else if (type < 9999) {
					return `第${type}天`
				} else if (type == 10000) {
					return "每天"
				} else if (type < 19999) {
					return `每隔${type-10000}天`
				} else if (type < 29999) {
					return `每${WEEKTEXT[type-20000-1]}`
				} else if (type < 39999) {
					return `每周${type-30000}天`
				} else if (type < 49999) {
					return `每月${type-40000}日`
				} else {
					return "未知类型"
				}
			}
		},
		onLoad({ type, activity_id, taskId }) {
			this.type = type
			if (this.type == "edit") {
				this.api.getActivity({ id: activity_id }).then(r => {
					Object.assign(this.activity, r)
				})
			} else if ( this.type == "add" ) {
				this.activity.taskId = taskId
			}
		},
		onNavigationBarButtonTap() {
			if (this.type == "edit") {
				this.api.saveActivity(this.activity).then(() => {
					uni.showToast({
						title: "修改成功",
						position:'bottom',
						success() {
							uni.navigateBack({
								
							})
						}
					})
					
				})
			}
			if (this.type == "add") {
				this.api.addActivity(this.activity).then((r) => {
					console.log(r)
					setTimeout(
						() => uni.showToast({
							title: "保存成功",
							position:'bottom',
							success() {
								uni.navigateBack({
									
								})
							}
						}), 1000
					)
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx;
	}
	.evan-form-show {
		padding: 10rpx 30rpx;
		background-color: #fff;
	}
	.form-input {
		font-size: 28rpx;
		color: #333;
		text-align: right;
		width: 100%;
		box-sizing: border-box;
		height: 60rpx;
	}
	.form-input-placeholder {
		font-size: 28rpx;
		color: #999;
	}
	.textarea{
		height: 240rpx;
		padding: 24rpx 0;
		text-align: left;
	}
</style>
