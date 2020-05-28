<template>
	<view>
		<view class="container" style="padding-top: 30rpx;">
			<view class="uni-page-head" style="border-bottom: 1px solid #d3d3d3;">
				<image class="top-image" src="/static/img/qa.png"></image>
				<view class="task-name">{{activity.name}}</view>
				<view class="task-value">{{activity.value}}分</view>			
			</view>
			<view class="uni-page-body">
				<view class="form-item uni-flex">
					<view class="uni-flex-item form-label">描述</view>
					<view class="uni-flex-item form-value">{{activity.description}}</view>
				</view>
				<view class="form-item uni-flex">
					<view class="uni-flex-item form-label">详情</view>
					<view class="uni-flex-item form-value">{{activity.detail}}</view>
				</view>
				<view class="form-item uni-flex">
					<view class="uni-flex-item form-label">注意事项</view>
					<view class="uni-flex-item form-value">{{activity.attention}}</view>
				</view>
			</view>
		</view>
		<view class="line-spliter"></view>
		<view class="container">
			<uni-list>
				<uni-list-item :showArrow="false" :showSwitch="true" @switchChange="onSwitchChecked" :switchChecked="activity.checked">已达成</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	export default {
		data() {
			return {
				activity_id: 0
			}
		},
		computed: {
			...mapGetters({
				getActivity: "activity/getActivity"
			}),
			activity() { return this.getActivity({ id: this.activity_id }) }
		},
		methods: {
			...mapActions({
				"setActivityCheckState": "active/setActivityCheckState"
			}),
			onSwitchChecked(o) {
				this.setActivityCheckState({ date: "2020-05-14", id: this.activity_id, checked: o.value })
			}
		},
		onLoad({ activity_id }) {
			this.activity_id = activity_id || 0
		}
	}
</script>

<style>
	.container {
		padding-left: 50rpx;
		padding-right: 50rpx;
	}
	.top-image {
		width: 100rpx;
		height: 100rpx;
	}
	.task-name {
		font-size: large;
		font-weight: bolder;
	}
	.task-value {
		font-weight: bold;
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
	.form-edit {
		flex: 1;
	}
	.line-spliter {
		width: 100%;
		margin-top: 50rpx;
		height: 30rpx;
		background-color: #f4f4f4;
	}
	.edit-icons {
		padding-left: 10rpx;
		color: #007AFF;
		font-size: 50rpx;
	}
</style>
