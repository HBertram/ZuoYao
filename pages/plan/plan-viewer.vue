<template>
    <view>
		<bert-list>
			<template v-for="plan in plans">
				<bert-list-item :title="plan.title" :author="plan.author" :rightText="'人气: ' + plan.hot + '  跟踪: ' + plan.follower">
					<view style="display: flex; justify-content: flex-end;">
						<view class="bert-btn" hover-class="bert-btn-hover" @click="toChapterEdit(plan.id)">查看详情</view>
					</view>
				</bert-list-item>
			</template>
		</bert-list>
    </view>
</template>

<script>
	import bertList from "@/components/bert-list/bert-list.vue"
	import bertListItem from "@/components/bert-list/bert-list-item.vue"
	import { mapState } from "vuex"
	export default {
		components: { bertList, bertListItem },
		data() {
			return {
				plans: []
			}
		},
		computed: {
			...mapState(["userInfo"])
		},
		onLoad({ type }) {
			this.type = type
			this.loadPlans()
		},
		methods: {
			loadPlans() {
				let param = {}
				if (this.type == 1) {
					//我关注的
					param = {
						userId: this.userInfo.id
					}
				} else if (this.type == 2) {
					//我发布的
					param = {
						author: this.userInfo.name
					}
				} else if (this.type == 3) {
					//我的私人的
					param = {
						author: this.userInfo.name,
						type: 10
					}
				}
				this.api.getPlans(param).then(r => {
					this.plans = r
				})
			}
		}
	}
</script>

<style>
</style>
