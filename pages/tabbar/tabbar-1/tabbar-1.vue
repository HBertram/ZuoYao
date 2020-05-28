<template>
	<view class="container" style="width: 100%;">
		<view class="top">
			<view class="top-title">
			</view>
			<view class="top-content">
				<view class="top-box">
					<view class="top-box__left">
						<text style="color: #939393; font-size: small;">已完成</text>
						<text style="font-size: large; font-weight: bold;">{{currentPlanCheckedValue}}分</text>
					</view>
					<view class="total-mark">
						<canvas canvas-id="completePercent" style="width: 100px; height: 100px"></canvas>
					</view>
					<view class="top-box__right">
						<text style="color: #939393; font-size: smaller;">总共</text>
						<text style="font-size: large; font-weight: bold;">{{currentPlanTotalValue}}分</text>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<scroll-view class="scroll-view_H" :show-scrollbar="false" scroll-x="true">
				<template v-for="(plan, index) in plans">
					<view :class="currentTabIndex==index ? 'scroll-view-item_H active' : 'scroll-view-item_H'" :data-current="index" @click="ontabtap">{{plan.title}}</view>
				</template>
				<view class="tab-under-line" :style="{left: (currentTabIndex*20 + 1) + '%'}" ></view>
			</scroll-view>
			<swiper :current="currentTabIndex" class="swiper" :duration="300" :style="{height: swiperHeight + 'px'}" @change="ontabchange">
				<template v-for="(plan, index) in plans">
					<swiper-item>
						<scroll-view scroll-y="true" style="height: 100%;">
							<bert-tag-group :planId="plan.id"></bert-tag-group>
						</scroll-view>
					</swiper-item>
				</template>
			</swiper>
		</view>
		<view class="bghead"></view>
	</view>
</template>

<script>
	import bertSwiper from "@/components/bert-swiper/bert-swiper.vue"
	import uniSection from "@/components/uni-section/uni-section.vue"
	import bertTagGroup from "@/components/bert-tag-group/bert-tag-group.vue"
	import uCharts from "@/js_sdk/u-charts/u-charts/u-charts.min.js"
	import { mapState, mapGetters } from 'vuex'
    export default {
	    components: {bertSwiper, bertTagGroup, uniSection, uCharts},
		data() {
			return {
				chart: null,
				swiperHeight: 100,
				currentTabIndex: 0
			}
		},
	computed: {
		...mapState({
			plan: "plan",
			count: "count"
		}),
		...mapGetters({
			getTotalValue: "plan/getTotalValue",
			getCheckedValue: "plan/getCheckedValue",
			plans: "plan/plans"
		}),
		currentPlan() { return this.plans[this.currentTabIndex] },
		currentPercent() { return this.currentPlanTotalValue == 0 ? 0 :  (100*Number(this.currentPlanCheckedValue / this.currentPlanTotalValue)).toFixed(0)  },
		currentPlanCheckedValue() { return !this.currentPlan ? 0 : this.getCheckedValue({ planId: this.currentPlan.id }) },
		currentPlanTotalValue() { return !this.currentPlan ? 0 : this.getTotalValue({ planId: this.currentPlan.id }) },
		opts() {
			return {
				"series":[{
					"name":"完成率", 
					"data": this.currentPercent / 100,
					"color":"#2fc25b"},
				],
			}
		}
	},
	watch: {
		currentPercent(v1, v2) {
			let newdata = this.opts
			this.chart.updateData({
						series: newdata.series,
						title: {//这里的文案是自定义的，不写是不变的
							name: v1 + '%',
							color: newdata.series[0].color,
							animation: true,
							fontSize: 25
						}
					});
		}
	},
	onLoad() {
	},
	onReady() {
		let that = this
		uni.getSystemInfo({
			success: function (res) {
				that.swiperHeight = res.windowHeight - 233
			} 
		});
		
		let chartData = this.opts
		this.chart = new uCharts({
					$this:this,
					canvasId: "completePercent",
					type: 'arcbar',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio: 1,
					series: chartData.series,
					animation: true,
					width: 100,
					height: 100,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.series[0].color,
						fontSize: 25
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#aaaaaa',
						fontSize: 10
					},
					extra: {
						arcbar:{
							type:'default',
							width: 7,//圆弧的宽度
						}
					}})
	},
    methods:{
		ontabchange(e) {
			let index = e.target.current || e.detail.current;
		    this.switchTab(index);
		},
		ontabtap(e) {
		    let index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.currentTabIndex == index) {
			    return;
			}
			this.currentTabIndex = index
		}
    },
	onNavigationBarButtonTap() {
		this.navigator.toChapterEdit()
	}
  }
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  width: 100%; }
.main {
	padding: 10rpx;
}
.tabs {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
  /* #ifdef MP-ALIPAY || MP-BAIDU */
  height: 100vh;
  /* #endif */ }

.swiper-box {
  flex: 1; }

.bghead {
  position: absolute;
  left: 0;
  top: 0;
  height: 300rpx;
  width: 100%;
  background-color: #66ccff;
  z-index: -1; }

.top {
  flex-direction: column; }

  .top .top-title {
    height: 80rpx; }
  .top .top-content {
    display: flex;
    flex-direction: row;
    justify-content: space-around; }
    .top .top-content .top-box {
      border: 1px solid #66ccff;
      width: 700rpx;
      height: 240rpx;
      background-color: #fafeff;
      border-radius: 15rpx;
      display: flex;
      justify-content: space-around; }
	  .top-box__left, .top-box__right {
		  flex: 1;
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  text-align: center;
	  }
      .top .top-content .top-box .total-mark {
        margin-top: 25rpx; }
      .top .top-content .top-box .total-mark-label {
		  flex: 1;
        text-align: center;
        line-height: 40rpx;
        font-size: 25rpx;
        color: #212121; }

.scroll-view_H {
  white-space: nowrap;
  width: 100%; }

.scroll-view-item_H {
  display: inline-block;
  width: 20%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 36rpx; }

.tab-under-line {
  position: absolute;
  bottom: 0;
  left: 0%;
  border-bottom: 5rpx solid #007AFF;
  width: 19%; }
.active{
	color: #007AFF;
}
</style>
