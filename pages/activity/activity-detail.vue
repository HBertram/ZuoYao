<template>
	<view>
		<view class="container" style="padding-top: 30rpx;">
			<view class="uni-page-head" style="border-bottom: 1px solid #d3d3d3;">
				<image class="top-image" src="/static/img/qa.png"></image>
				<view class="task-name">任务名</view>
				<view class="task-value">5分</view>			
			</view>
			<view class="uni-page-body">
				<view class="form-item uni-flex">
					<view class="uni-flex-item form-label">描述</view>
					<view class="uni-flex-item form-value">啊实打实大苏打三大曹张新村自行车的方法 </view>
				</view>
				<view class="form-item uni-flex">
					<view class="uni-flex-item form-label">详情</view>
					<view class="uni-flex-item form-value">啊实打实大苏打三大曹张新村自行车的方法 </view>
				</view>
				<view class="form-item uni-flex">
					<view class="uni-flex-item form-label">注意事项</view>
					<view class="uni-flex-item form-value">啊实打实大苏打三大曹张新村自行车的方法啊实打实大苏打三大曹张新村自行车的方法啊实打实大苏打三大曹张新村自行车的方法啊实打实大苏打三大曹张新村自行车的方法 </view>
				</view>
			</view>
		</view>
		<view class="line-spliter"></view>
		<view class="container">
			<uni-list>
				<uni-list-item :showArrow="false" :showSwitch="true">已达成</uni-list-item>
				<uni-list-item :showArrow="false" :showSwitch="true">达成状态</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				
			}
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
