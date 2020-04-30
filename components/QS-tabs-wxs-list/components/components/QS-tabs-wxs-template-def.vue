<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<!-- 为性能缘故, 当tab项多时, 请尽量不要删除 v-if="show" -->
	<view v-if="show">
		<view 
		class="scroll-item" 
		v-for="(item, ind) in list" 
		:key="ind" 
		@tap="itemClick(ind)">
			
		</view>
		<!-- 列表状态展示 -->
		<view class="statusText" @tap="getList(false, true, false)">
			{{statusText.text || ''}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tab: {
				type: [Object, String],
				default () {
					return {}
				}
			},
			index: {
				type: [String, Number],
				default: ''
			},
			current: {
				type: [String, Number],
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			},
			readyRefresh: {
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				list: [],
				sendData: {
					pageNum: 1,
					pageSize: 50,
					tabId: this.tab.id
				},
				statusText: {}
			}
		},
		created() {
			// console.log('component - created - tab:' + this.tab);
			// console.log('component - created - index:' + this.index);
		},
		methods: {
			init(refresh) {	//若是用户触发下拉刷新则refresh为true
				this.getList(refresh, false, false);
			},
			getList(refresh, doEvent, force) {
				let _this = this;
			},
			itemClick(ind) {
				uni.showToast({
					title: `第${this.index}列 第${ind}项`
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../css/box-sizing-border-box.css");
	.scroll-item {
		width: 100%;
		padding: 28rpx;
		background-color: white;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		margin-bottom: 35rpx;
	}
	
	.scroll-item-image {
		background-color: #F8F8F8;
		border-radius: 8px;
		height: 220rpx;
		width: 40%;
	}
	
	.scroll-item-text {
		width: 55%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #666;
	}
	
	.statusText {
		height: 40px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
	}
</style>
