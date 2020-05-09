<template>
	<view class="uni-page-body">
		<evan-form class="evan-form-show" :hide-required-asterisk="true" ref="form" :model="value">
			<evan-form-item label="请输入:" prop="value" labelPosition="top">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="value" placeholder="请输入名称" />
			</evan-form-item>
		</evan-form>
	</view>
</template>

<script>
	import evanForm from "@/components/evan-form/evan-form.vue"
	import evanFormItem from "@/components/evan-form/evan-form-item.vue"
	export default {
		components: {evanForm, evanFormItem},
		data() {
			return {
				value: ""
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
