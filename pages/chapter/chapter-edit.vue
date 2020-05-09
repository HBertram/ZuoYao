<template>
	<view class="container" style="width: 100%;">
		<view class="main">
			<scroll-view class="scroll-view_H" :show-scrollbar="false" scroll-x="true">
				<template v-for="(tab,index) in sectionList">
					<view class="scroll-view-item_H" :data-current="index" @click="ontabtap">{{tab.title}}</view>
				</template>
				<view class="tab-under-line" :style="{left: (currentSectionIndex*20 + 1) + '%'}" ></view>
			</scroll-view>
		</view>
		<swiper :current="currentSectionIndex" class="swiper" :duration="300" :style="{height: swiperHeight + 'px'}" @change="ontabchange">
			<template v-for="(tab, index) in sectionList">
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;">
						<bert-tag-group :isEdit="true" :chapter="tab" @changeValue="onChangeValue"></bert-tag-group>
					</scroll-view>
				</swiper-item>
			</template>
		</swiper>
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
				swiperHeight: 100,
				currentSectionIndex: 0,
				sectionList: sectionList,
				currentSection: sectionList[0]
			}
		},
	computed: {
	},
	watch: {
	},
	onLoad() {
	},
	onReady() {
		let that = this
		uni.getSystemInfo({
			success: function (res) {
				that.swiperHeight = res.windowHeight - 73
			} 
		});
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
		uni.showToast({
			title: "保存"
		})
	}
  }
</script>

<style>
@import "./tabbar-1.css"
</style>
