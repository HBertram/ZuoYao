<template>
	<view class="container" style="width: 100%;">
		<uni-calendar @change="changeDate"/>
		<view class="bghead">
			<view class="top">
				<view class="top-title">
				</view>
				<view class="top-content">
					<view class="top-box">
						<view class="top-box__left">
							<text style="color: #939393; font-size: small;">已完成</text>
							<text style="font-size: large; color: #555555; font-weight: bold;">{{currentPlanCheckedValue}}分</text>
						</view>
						<view class="total-mark">
							<u-circle-progress :duration="50" :active-color="currentPercent > 80 ? '#00aa00' : currentPercent > 60 ? '#9dd463' : currentPercent > 40 ? '#eacf00' : '#de3700'" :percent="currentPercent">
								<view class="u-progress-content">
									<text class='u-progress-info'>{{currentPercent}}%</text>
								</view>
							</u-circle-progress>
						</view>
						<view class="top-box__right">
							<text style="color: #939393; font-size: smaller;">总共</text>
							<text style="font-size: large; color: #555555; font-weight: bold;">{{currentPlanTotalValue}}分</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<scroll-view class="scroll-view_H" :show-scrollbar="false" scroll-x="true">
				<view style="flex-direction: column;">
				    <view style="flex-direction: row;">
				        <view class="uni-tab-item" v-for="(plan, index) in plans" :key="plan.id" :id="'plan'+plan.id" :ref="'tabitem'+index"
				            :data-id="index" :data-current="index" @click="ontabtap">
				            <text class="uni-tab-item-title" :class="currentTabIndex==index ? 'uni-tab-item-title-active' : ''">{{plan.title}}</text>
				        </view>
				    </view>
				    <view class="scroll-view-indicator">
				        <view ref="underline" class="scroll-view-underline" :class="isTap ? 'scroll-view-animation':''"
				            :style="{left: indicatorLineLeft + 'px', width: indicatorLineWidth + 'px'}"></view>
				    </view>
				</view>
			</scroll-view>
			<view class="tab-bar-line"></view>
			<swiper id="tab-bar-view" :current="currentTabIndex" class="sw iper" :duration="300" :style="{height: swiperHeight + 'px'}" @change="ontabchange"
			@transition="onswiperscroll" @animationfinish="animationfinish" @onAnimationEnd="animationfinish">
				<template v-for="(plan, index) in plans">
					<swiper-item v-bind:key="plan.id">
						<scroll-view scroll-y="true" style="height: 100%;">
							<bert-tag-group :year="searchPlanParam.year" :month="searchPlanParam.month" :day="searchPlanParam.date" :plan="plan"></bert-tag-group>
						</scroll-view>
					</swiper-item>
				</template>
			</swiper>
		</view>
	</view>
</template>

<script>
	import { getPlanCheckedValue, getPlanValue } from "@/common/utils.js"
	import bertSwiper from "@/components/bert-swiper/bert-swiper.vue"
	import uniSection from "@/components/uni-section/uni-section.vue"
	import bertTagGroup from "@/components/bert-tag-group/bert-tag-group.vue"
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import { mapState } from "vuex"
	const TAB_PRELOAD_OFFSET = 1;
	
    export default {
	    components: { bertSwiper, bertTagGroup, uniSection, uniCalendar },
		data() {
			let now = new Date()
			return {
				swiperWidth: 100,
				isTap: false,
				indicatorLineLeft: 0,
				indicatorLineWidth: 0,
				swiperHeight: 100,
				currentTabIndex: 0,
				lastTabIndex: 0,
				plans: [],
				plansSize: [],
				searchPlanParam: {
					year: now.getYear() + 1900,
					month: now.getMonth() + 1,
					date: now.getDate()
				}
			}
		},
	computed: {
		...mapState([
			"userInfo"
		]),
		currentPlan() { return this.plans[this.currentTabIndex] },
		currentPercent() { return this.currentPlanTotalValue == 0 ? 0 :  Number((100*Number(this.currentPlanCheckedValue / this.currentPlanTotalValue)).toFixed(0))  },
		currentPlanCheckedValue() { 
			return !this.currentPlan ? 0 : getPlanCheckedValue(this.currentPlan) 
		},
		currentPlanTotalValue() { 
			return !this.currentPlan ? 0 : getPlanValue(this.currentPlan) 
		}
	},
	onShow() {
		this.loadPlans()
	},
	onReady() {
		let that = this
		uni.getSystemInfo({
			success: function (res) {
				that.swiperHeight = res.windowHeight - 233
			} 
		});
	},
	watch: {
		plans() {
			setTimeout(this.setPlansTabSize, 100)
		}
	},
    methods:{
		loadPlans() {
			return new Promise((resolve, reject) => {
				this.api.getUserOnedayPlans({ user: this.userInfo.id, ...this.searchPlanParam }).then(plans => {
					this.api.getActives({ userId: this.userInfo.id, ...this.searchPlanParam }).then(r => {
						plans.forEach(p => {
							p.tasks.forEach(t => {
								t.activities.forEach(a => {
									let active = r.find(o => o.activityId == a.id)
									if (!!active) this.$set(a, "active", active)
									else this.$set(a, "active", { checked: false })
								})
							})
						})
						this.plans = plans	
						resolve(plans)
					})
				})
			})
		},
		setPlansTabSize() {
			// 查询 tabview 宽度
			uni.createSelectorQuery().in(this).select('#tab-bar-view').boundingClientRect().exec(rect => {
			    this.swiperWidth = rect[0].width;
			});
			
			this.plansSize = []
			let query = uni.createSelectorQuery().in(this)
			this.plans.forEach(plan => {
				query.select('#plan' + plan.id).boundingClientRect()
			})
			query.exec(rects => {
				rects.forEach((rect) => {
					if (!!rect) this.plansSize.push(rect);
				})
				this.animationfinish()
			});
		},
		ontabchange(e) {
			let index = e.target.current || e.detail.current;
		},
		ontabtap(e) {
			this.isTap = true;
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			var currentSize = this.plansSize[index];
			this.updateIndicator(currentSize.left, currentSize.width);
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.currentTabIndex == index) {
			    return;
			}
			this.currentTabIndex = index
		},
		changeDate(d) {
			Object.assign(this.searchPlanParam, {
				year: Number(d.year),
				month: Number(d.month),
				date: Number(d.date)
			})
			this.loadPlans()
		},
		
		onswiperscroll(e) {
			if (this.isTap) {
				return;
			}
			
			let offsetX = e.detail.dx;
			var preloadIndex = this.lastTabIndex;
			if (offsetX > TAB_PRELOAD_OFFSET) {
			    preloadIndex++;
			} else if (offsetX < -TAB_PRELOAD_OFFSET) {
			    preloadIndex--;
			}
			
			if (preloadIndex === this.lastTabIndex || preloadIndex < 0 || preloadIndex > this.plans.length - 1) {
			    return;
			}
			var percentage = Math.abs(this.swiperWidth / offsetX);
			var currentSize = this.plansSize[this.lastTabIndex];
			var preloadSize = this.plansSize[preloadIndex];
			var lineL = currentSize.left + (preloadSize.left - currentSize.left) / percentage;
			var lineW = currentSize.width + (preloadSize.width - currentSize.width) / percentage;
			this.updateIndicator(lineL, lineW);
		},
		animationfinish(e) {
			console.error(e, this.lastTabIndex, this.plansSize[this.lastTabIndex])
			if (this.plansSize.length == 0) return
			if (!!e) {
				this.isTap = false;
				this.lastTabIndex = e.detail ? e.detail.current : 0
				this.switchTab(this.lastTabIndex)
			}
			if (this.lastTabIndex >= this.plansSize.length) this.lastTabIndex = 0
			if (!this.plansSize[this.lastTabIndex]) return
			this.updateIndicator(this.plansSize[this.lastTabIndex].left, this.plansSize[this.lastTabIndex].width);
		},
		
		updateIndicator(left, width) {
		    this.indicatorLineLeft = left;
		    this.indicatorLineWidth = width;
		},
		config() {
			this.navigator.toChapterEdit()
		}
    },
	onPullDownRefresh() {
		this.loadPlans().then(() => {
			uni.stopPullDownRefresh();
		})
	}
  }
</script>

<style>
.u-progress-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.u-progress-dot {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background-color: #fb9126;
}

.u-progress-info {
	font-size: 32rpx;
	padding-left: 16rpx;
	font-weight: bold;
	letter-spacing: 2rpx
}
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
  height: 300rpx;
  width: 100%;
  background-color: #66ccff;
}
    .tab-bar-line {
        height: 1rpx;
        background-color: #cccccc;
    }
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
    .scroll-view-indicator {
        position: relative;
        height: 2px;
        background-color: transparent;
    }
	.scroll-view-animation {
	    transition-duration: 0.2s;
	    transition-property: all;
	}
	.scroll-view-underline {
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    width: 0;
	    background-color: #007AFF;
	}
.scroll-view_H {
  white-space: nowrap;
  width: 100%; }

.scroll-view-item_H {
  display: inline-block;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 36rpx; }

.active{
	color: #007AFF;
}
    .uni-tab-item {
        display: inline-block;
        flex-wrap: nowrap;
        padding-left: 25px;
        padding-right: 25px;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }
</style>
