<template>
	<view class="container" style="width: 100%;">
		<view class="main">
			<scroll-view class="scroll-view_H" :show-scrollbar="false" scroll-x="true">
				<template v-for="(plan, index) in plans">
					<view :class="currentTabIndex==index ? 'scroll-view-item_H active' : 'scroll-view-item_H'" :data-current="index" @click="ontabtap">{{plan.title}}</view>
				</template>
				<view class="tab-under-line" :style="{left: (currentTabIndex*20 + 1) + '%'}" ></view>
				<view class="scroll-view-item_H" :data-current="plans.length + 1">
					<uni-icons type="plusempty" @click="addPlan"></uni-icons>
				</view>
			</scroll-view>
		</view>
		<swiper :current="currentTabIndex" class="swiper" :duration="300" :style="{height: swiperHeight + 'px'}" @change="ontabchange">
			<template v-for="(plan, index) in plans">
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" key="1">
						<bert-tag-group @removed="plans.splice(plans.indexOf(plan), 1)" :isEdit="true" :plan="plan"></bert-tag-group>
					</scroll-view>
				</swiper-item>
			</template>
		</swiper>
	</view>
</template>

<script>
	import bertSwiper from "@/components/bert-swiper/bert-swiper.vue"
	import bertTagGroup from "@/components/bert-tag-group/bert-tag-group-edit.vue"
	import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
	    components: { bertSwiper, bertTagGroup },
		data() { 
			return {
				swiperHeight: 100,
				currentTabIndex: 0,
				plans: []
			}
		},
	computed: {
		...mapState({
			pageData: "pageData"
		}),
		...mapGetters({
			getTotalValue: "plan/getTotalValue",
			getCheckedValue: "plan/getCheckedValue",
		}),
		currentPlan() { return this.plans[this.currentTabIndex] }
	},
	onShow() {
		this.loadPlans()
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
		...mapActions({
			followPlan: "followPlan"
		}),
		loadPlans() {
			this.api.getPlans().then(r => {
				this.$set(this, "plans", r)
			})
		},
		addPlan() {
			let plan = {title: "新增计划"}
			this.api.savePlan(plan).then(r=> {
				this.followPlan({ planId: r.id })
				this.loadPlans()
			})
		},
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
