<template>
	<view class="container" style="width: 100%;">
		<bert-tag-group :plan="plan"></bert-tag-group>
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
				planId: 0,
				plan: {}
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
		this.loadPlan()
	},
	onLoad({ planId }) {
		this.planId = planId
	},
    methods:{
		...mapActions({
			followPlan: "followPlan"
		}),
		loadPlan() {
			this.api.getPlan({ id: this.planId }).then(r => {
				this.$set(this, "plan", r)
			})
		},
		addPlan() {
			let plan = {title: "新增计划"}
			this.api.savePlan(plan).then(r=> {
				this.followPlan({ planId: r.id })
				this.loadPlans()
			})
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
