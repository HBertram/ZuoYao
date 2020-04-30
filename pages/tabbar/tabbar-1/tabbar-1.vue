<template>
	<view class="container">
		<view class="top">
			<view class="top-title">
			</view>
			<view class="top-content">
				<view class="top-box">
					<view class="total-mark">
						<cmd-progress type="circle" :percent="totalValue"></cmd-progress>
						<view class="total-mark-label">昨日得分</view>
					</view>
					<view class="total-mark">
						<cmd-progress type="circle" :percent="currentPercent"></cmd-progress>
						<view class="total-mark-label">今日得分</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<bert-swiper :tabList="tabList" @change="sectionListChanged">
				<slot v-for="(page, index) in sectionList" :slot="tabList[index].id" >
					<bert-tag-group :type="page.type" :title="page.title" :groupActivityList="page.groupActivityList" @changeValue="activityChange"></bert-tag-group>
				</slot>
			</bert-swiper>
		</view>
		<view class="bghead"></view>
	</view>
</template>

<script>
	import api from "@/store/api.js"
	import bertSwiper from "@/components/bert-swiper/bert-swiper.nvue"
	import uniSection from "@/components/uni-section/uni-section.vue"
	import bertTagGroup from "@/components/bert-tag-group/bert-tag-group.vue"
  export default {
	  components: {bertSwiper, bertTagGroup, uniSection},
    data() {
		console.log(api.section.get())
      return {
		  currentSection: {},
		  sectionList: api.section.get()
	  }
    },
	computed: {
		totalValue() {
			return this.sectionList.map((l) => l.totalValue).reduce((i,j) => i+j) || 0
		},
		currentPercent() {
			return Number(this.getCompletePercent(this.currentSection));
		},
		tabList() {
			let tabList = []
			return this.sectionList.map((o, i) => {
				return {
					id: 'page-'+i,
					name: o.title
				}
			})
		}
	},
	onLoad() {

	},
    methods:{
		sectionListChanged(index) {
			this.currentSection = this.sectionList[index]
		},
		getCompletePercent(activity) {
			return (!!activity.totalValue ? 100 * activity.currentValue / activity.totalValue : 0).toFixed()
		},
		activityChange(param) {
			this.currentSection = this.sectionList.find((o) => o.type == param.type);
			this.currentSection.currentValue = param.totalValue;
		}
    }
  }
</script>

<style>
@import "./tabbar-1.css"
</style>
