<template>
	<view class="uni-page-body">
		<evan-form class="evan-form-show" :hide-required-asterisk="true" ref="form" :model="activity">
			<evan-form-item label="名称：" prop="name">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="activity.name" placeholder="请输入名称" />
			</evan-form-item>
			<evan-form-item label="分值：" prop="desc">
				<input type="number" class="form-input" placeholder-class="form-input-placeholder" v-model="activity.value" placeholder="输入分值" />
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
	export default {
		components: {evanForm, evanFormItem},
		data() {
			return {
				type: "",
				activity: {
					name: "",
					value: 0,
					attention: "",
					description: "",
					phone: ""
				}
			}
		},
		computed: {
			...mapGetters({
				getActivity: "activity/getActivity"
			})
		},
		methods: {
			...mapActions({
				editActivity: "activity/editActivity"
			})
		},
		onLoad({ type, activity_id }) {
			if (type == "edit") {
				this.type = type
				Object.assign(this.activity, this.getActivity({ id: activity_id }))
			}
		},
		onNavigationBarButtonTap() {
			if (this.type == "edit") {
				this.editActivity(this.activity).then(() => {
					
				})
				uni.navigateBack({
					
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
