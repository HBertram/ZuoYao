<template>
	<view class="container" style="width: 100%;">
		<view class="top">
			<view class="top-title"></view>
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
				<template v-for="(tab,index) in sectionList">
					<view class="scroll-view-item_H" :data-current="index" @click="ontabtap">{{tab.title}}</view>
				</template>
				<view class="tab-under-line" :style="{left: (currentSectionIndex*20 + 1) + '%'}" ></view>
			</scroll-view>
			<swiper :current="currentSectionIndex" class="swiper" :duration="300" :style="{height: swiperHeight + 'px'}" @change="ontabchange">
				<template v-for="(tab, index) in sectionList">
					<swiper-item>
						<scroll-view scroll-y="true" style="height: 100%;">
							<bert-tag-group :chapter="tab" @changeValue="onChangeValue"></bert-tag-group>
						</scroll-view>
					</swiper-item>
				</template>
			</swiper>
		</view>
		<view class="bghead"></view>
	</view>
</template>

<script>
	import api from "@/store/api.js"
	import bertSwiper from "@/components/bert-swiper/bert-swiper.vue"
	import uniSection from "@/components/uni-section/uni-section.vue"
	import bertTagGroup from "@/components/bert-tag-group/bert-tag-group.vue"
	import uCharts from "@/js_sdk/u-charts/u-charts/u-charts.min.js"
    export default {
	    components: {bertSwiper, bertTagGroup, uniSection, uCharts},
		data() {
			let sectionList = api.section.get()
			return {
				chart: null,
				opts: {
				  "series":[{
					  "name":"完成率", "data": this.getCompletePercent(sectionList[0]),
					  "color":"#2fc25b"},
				],
				},
				swiperHeight: 100,
				currentSectionIndex: 0,
				sectionList: sectionList,
				currentSection: sectionList[0]
			}
		},
	computed: {
		totalValue() {
			return this.sectionList.map((l) => l.totalValue).reduce((i,j) => i+j) || 0
		},
		currentPercent() {
			return Number(this.getCompletePercent(this.currentSection))
		}
	},
	watch: {
		currentPercent(v1, v2) {
			this.opts.series[0].data = (v1/100).toFixed(2)
			let newdata = this.opts
			this.chart.updateData({
						series: newdata.series,
						title: {//这里的文案是自定义的，不写是不变的
							name: v1 + '%',
							color: newdata.series[0].color,
							animation: false,
							fontSize: 25
						}
					});
			console.log(v1, v2)
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
		onChangeValue() {
		},
		ontabtap(e) {
		    let index = e.target.dataset.current || e.currentTarget.dataset.current;
			console.log(index)
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.currentSectionIndex === index) {
			    return;
			}
			this.currentSectionIndex = index
			this.currentSection = this.sectionList[index]
		},
		getCompletePercent(section) {
			console.log(section)
			return (!!section.totalValue ? 100 * section.getCheckedValue() / section.totalValue : 0).toFixed()
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
