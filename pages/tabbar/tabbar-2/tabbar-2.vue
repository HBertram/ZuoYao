<template>
    <view>
		<bert-list>
			<template v-for="plan in plans">
				<bert-list-item :title="plan.title" :author="plan.author" rightText="人气: 144">
					<view style="display: flex; justify-content: flex-end;">
						<view class="bert-btn" hover-class="bert-btn-hover" @click="toChapterEdit()">查看详情</view>
						<view v-if="!myPlanIds.includes(plan.id)" class="bert-btn" hover-class="bert-btn-hover" style="border-color: #ff5500; color: #ff5500" @click="followPlan(plan)">加入计划</view>
						<view v-else class="bert-btn" hover-class="bert-btn-hover" @click="cancelPlan(plan)">取消计划</view>
					</view>
				</bert-list-item>
			</template>
		</bert-list>
    </view>
</template>
<script>
import navigator from "../../../common/navigator.js"
import bertList from "../../../components/bert-list/bert-list.vue"
import bertListItem from "../../../components/bert-list/bert-list-item.vue"
import { mapState, mapGetters, mapActions } from "vuex"
    export default {
	    components: { bertList, bertListItem },
        data() {
			return {
				plans: []
			}
        },
		computed: {
			...mapState({
				myPlanIds: state => state.planIds
			})
		},
        methods: {
			...mapActions({
				followPlanAction: "followPlan",
				cancelPlanAction: "cancelPlan"
			}),
			...navigator,
			searchPlans() {
				this.api.getPlans().then((data) => {
					this.plans = data || []
				})
			},
			followPlan(plan) {
				this.followPlanAction({ planId: plan.id })
			},
			cancelPlan(plan) {
				this.cancelPlanAction({ planId: plan.id })
			}
        },
        onLoad() {
			this.searchPlans()
        },
		// 下拉刷新
		onPullDownRefresh() {
			this.searchPlans();
			uni.stopPullDownRefresh();
		}
    }
</script>

<style>
</style>
