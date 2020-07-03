<template>
    <view>
		<bert-list>
			<template v-for="plan in plans">
				<bert-list-item :title="plan.title" :author="plan.author" :rightText="'人气: ' + plan.hot + '  跟踪: ' + plan.follower">
					<view style="display: flex; justify-content: flex-end;">
						<view class="bert-btn" hover-class="bert-btn-hover" @click="toChapterEdit(plan.id)">查看详情</view>
						<view v-if="!myPlanIds.includes(plan.id)" class="bert-btn" hover-class="bert-btn-hover" style="border-color: #ff5500; color: #ff5500" @click="followPlan(plan)">加入计划</view>
						<view v-else class="bert-btn" hover-class="bert-btn-hover" @click="cancelPlan(plan)">取消计划</view>
					</view>
				</bert-list-item>
			</template>
		</bert-list>
    </view>
</template>
<script>
import navigator from "@/common/navigator.js"
import bertList from "@/components/bert-list/bert-list.vue"
import bertListItem from "@/components/bert-list/bert-list-item.vue"
import { mapState, mapGetters, mapActions } from "vuex"
    export default {
	    components: { bertList, bertListItem },
        data() {
			return {
				plans: [],
				myPlans: []
			}
        },
		computed: {
			...mapState([
				"userInfo"
			]),
			myPlanIds() {
				return this.myPlans.map(o => o.id)
			}
		},
        methods: {
			...navigator,
			searchPlans() {
				this.api.getPlans().then((data) => {
					this.plans = data || []
				})
			},
			searchMyPlans() {
				this.api.getUserPlans({ isBrief: true, user: this.userInfo.id }).then(r => {
					this.myPlans = r
				})
			},
			followPlan(plan) {
				this.api.followPlan({ user: this.userInfo.id, planId: plan.id }).then(r => {
					plan.follower++;
					this.searchMyPlans()
				})
			},
			cancelPlan(plan) {
				this.api.cancelPlan({ user: this.userInfo.id, planId: plan.id }).then(r => {
					plan.follower--;
					this.searchMyPlans()
				})
			},
			load() {
				this.searchPlans()
				this.searchMyPlans()
			}
        },
        onLoad() {
			this.load()
        },
		onShow() {
			this.load()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.load()
			uni.stopPullDownRefresh();
		}
    }
</script>

<style>
</style>
