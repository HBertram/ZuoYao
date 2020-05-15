<template>
	<view class="container" style="width: 100%;">
		<view class="top">
			<view class="top-title">
			</view>
			<view class="top-content">
				<view class="top-box">
					<view class="total-mark">
						<canvas canvas-id="completePercent"></canvas>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<scroll-view class="scroll-view_H" :show-scrollbar="false" scroll-x="true">
				<template v-for="(plan, index) in plans">
					<view class="scroll-view-item_H" :data-current="index" @click="ontabtap">{{plan.title}}</view>
				</template>
				<view class="tab-under-line" :style="{left: (currentTabIndex*20 + 1) + '%'}" ></view>
			</scroll-view>
			<swiper :current="currentTabIndex" class="swiper" :duration="300" :style="{height: swiperHeight + 'px'}" @change="ontabchange">
				<template v-for="(plan, index) in plans">
					<swiper-item>
						<scroll-view scroll-y="true" style="height: 100%;">
							<bert-tag-group :plan_id="plan.id"></bert-tag-group>
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
		currentPlanCheckedValue() { return this.getCheckedValue({ plan_id: this.currentPlan.id }) },
		currentPlanTotalValue() { return this.getTotalValue({ plan_id: this.currentPlan.id }) },
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
						color: '#666666',
						fontSize: 15
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
@import "./tabbar-1.css"
</style>
