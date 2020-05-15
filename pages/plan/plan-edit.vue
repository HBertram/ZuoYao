<template>
	<view class="container" style="width: 100%;">
		<view class="main">
			<scroll-view class="scroll-view_H" :show-scrollbar="false" scroll-x="true">
				<template v-for="(plan, index) in plans">
					<view class="scroll-view-item_H" :data-current="index" @click="ontabtap">{{plan.title}}</view>
				</template>
				<view class="tab-under-line" :style="{left: (currentTabIndex*20 + 1) + '%'}" ></view>
			</scroll-view>
		</view>
		<swiper :current="currentTabIndex" class="swiper" :duration="300" :style="{height: swiperHeight + 'px'}" @change="ontabchange">
			<template v-for="(plan, index) in plans">
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;">
						<bert-tag-group :isEdit="true" :plan_id="plan.id"></bert-tag-group>
					</scroll-view>
				</swiper-item>
			</template>
		</swiper>
	</view>
</template>

<script>
	import api from "@/api/api.js"
	import bertSwiper from "@/components/bert-swiper/bert-swiper.vue"
	import uniSection from "@/components/uni-section/uni-section.vue"
	import bertTagGroup from "@/components/bert-tag-group/bert-tag-group.vue"
	import { mapState, mapGetters } from 'vuex'
    export default {
	    components: {bertSwiper, bertTagGroup, uniSection},
		data() { 
			let sectionList = api.section.get()
			return {
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
		currentPlan() { return this.plans[this.currentTabIndex] }
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
		uni.showToast({
			title: "保存"
		})
	}
  }
</script>

<style>
@import "./tabbar-1.css"
</style>
