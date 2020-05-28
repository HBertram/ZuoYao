<template>
	<view class="bert-list-item" :is-full="true">
		<view class="bert-list-item__head">
			<image class="bert-list-item__head-icon" src="../../static/img/release.png"/>
			<view class="bert-list-item__head-title">{{author}}</view>
			<uni-icons type="arrowright" style="line-height: 40rpx;"></uni-icons>
			<view class="bert-list-item__head-right">{{rightText}}</view>
		</view>
		<view class="bert-list-item__body">
			<view>
				<image class="bert-list-item__body-logo" :style="{width: height + 'rpx', height: height + 'rpx'}" src="../../static/img/qa.png"></image>
			</view>
			<view class="bert-list-item__body-top">
				<view class="bert-list-item__body-top-title">{{title}}</view>
				<text class="bert-list-item__body-top-desc">{{note}}</text>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			image: {
				type: String,
				required: false,
				default: ""
			},
			title: {
				type: String,
				required: true
			},
			rightText: {
				type: String,
				default: ""
			},
			note: {
				type: String,
				default: ""
			},
			author: {
				type: String,
				default: ""
			},
			warn: {
				type: String,
				default: ""
			},
			height: {
				type: Number,
				default: 200
			}
		},
		data() {
			return {
			}
		}
	}
</script>

<style>
	.bert-list-item {
		margin: 10rpx 20rpx;
		border: 1rpx solid #d8d8d8;
		border-radius: 30rpx;
		padding: 20rpx 20rpx 20rpx 15rpx;
	}
	.bert-list-item__head {
		height: 40rpx;
		display: flex;
		padding: 0 0 15rpx 0;
		border-bottom: 1rpx solid #d8dfe3;
	}
	.bert-list-item__head view {
		line-height: 40rpx;
	}
	.bert-list-item__head-icon {
		margin: 5rpx 10rpx 0 0;
		height: 35rpx;
		width: 35rpx;
	}
	.bert-list-item__head-title {
		font-size: 30rpx;
		font-weight: bold;
	}
	.bert-list-item__head-right {
		flex: 1;
		text-align: right;
		font-size: 25rpx;
		color: #ff5500;
	}
	.bert-list-item__body {
		margin-top: 15rpx;
		display: flex;
	}
	.bert-list-item__body-logo {
		width: 90rpx;
		height: 90rpx;
	}
	
	.bert-list-item__body-top {
		margin: 0 20rpx;
	}
	.bert-list-item__body-top-title {
		font-size: 40rpx;
		font-weight: bolder;
	}
	.bert-list-item__body-top-desc {
		color: #8b8b8b;
	}
</style>
