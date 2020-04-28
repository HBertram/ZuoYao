<template>
	<view class="container">
		<view class="bghead"></view>
		<view class="top">
			<view class="top-title">
				asdasd
			</view>
			<view class="top-content">
				<view class="top-box">
					asdasd
				</view>
			</view>
		</view>
		<view class="main">
			<bert-tag-group title="生活" :labelList="labelList"></bert-tag-group>
			<bert-tag-group title="学习" :labelList="labelList"></bert-tag-group>
			<bert-tag-group title="工作" :labelList="labelList"></bert-tag-group>
			<bert-tag-group title="交际" :labelList="labelList"></bert-tag-group>
		</view>
	</view>
</template>

<script>
	import uniSection from "@/components/uni-section/uni-section.vue"
	import bertTagGroup from "@/components/bert-tag-group/bert-tag-group.vue"
  export default {
    data() {
      return {
		  labelList: [
			{
				name: '吃饭',
				value: '1',
				checked: false
			},
			{
				name: '睡觉',
				value: '2',
				checked: false
			},
			{
				name: '瘦了',
				value: '3',
				checked: false
			},
			{
				name: '吃大餐',
				value: '4',
				checked: false
			},
			{
				name: '做运动',
				value: '5',
				checked: false
			}
		  ]
	  }
    },
    methods:{
    }
  }
</script>

<style>
	.bghead{
		position: absolute;
		left: 0;
		top: 0;
		height: 300rpx;
		width: 100%;
		background-color: #66ccff;
		z-index: -1;
	}	
	.top {
		flex-direction: column;
		.top-content {
			display: flex;
			flex-direction: row;
			justify-content: space-around;	
			
			.top-box {
				width: 700upx;
				height: 220upx;
				background-color: #ffffff;
				border-radius: 15upx;
			}
		}
	}
</style>
