<template>
	<view class="my-box">
		<!-- 用户 -->
		<view class="user-panel-box">
			<!-- 已登录 -->
			<view class="u-flex" @click="openPage('user/user/user')">
				<view class="u-m-r-20"><u-avatar :src="list.model.user.icon" mode="circle" size="120"></u-avatar></view>
				<view class="u-flex-1">
					<view class="u-font-lg">{{ list.model.user.name }}</view>
					<view class="u-m-t-10">
						<u-tag v-for="(item, index) in list.model.user.userTag" :key="index" :text="item" mode="plain" type="info" size="mini" class="u-m-r-10" />
					</view>
				</view>
				<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
			</view>
		</view>

		<!-- 跟踪 -->
		<view class="trace-panel-box">
			<u-grid :col="4" :border="false" class="card-main">
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.trace.product }}</view>
					<view class="u-font-xs u-m-t-10">商品关注</view>
				</u-grid-item>
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.trace.brand }}</view>
					<view class="u-font-xs u-m-t-10">品牌关注</view>
				</u-grid-item>
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.trace.activity }}</view>
					<view class="u-font-xs u-m-t-10">活动关注</view>
				</u-grid-item>
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.trace.history }}</view>
					<view class="u-font-xs u-m-t-10">浏览记录</view>
				</u-grid-item>
			</u-grid>
		</view>

		<u-gap height="20"></u-gap>

		<!-- 订单 -->
		<view class="panel-box">
			<view class="panel-header">
				<u-section title="我的计划" sub-title="查看全部计划" :bold="false" :show-line="false"></u-section>
			</view>
			<u-grid :col="4" :border="false" class="panel-main">
				<u-grid-item @click="openPage('plan/plan-viewer?type=1')"><u-icon name="order" label="我的关注" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon></u-grid-item>
				<u-grid-item @click="openPage('plan/plan-viewer?type=2')"><u-icon name="order" label="我的发布" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon></u-grid-item>
				<u-grid-item @click="openPage('plan/plan-viewer?type=3')"><u-icon name="order" label="私人计划" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon></u-grid-item>
				<u-grid-item @click="openPage('plan/plan-viewer?type=4')"><u-icon name="order" label="他人计划" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon></u-grid-item>
			</u-grid>
		</view>
		<u-gap height="20"></u-gap>
		<!-- 钱包 -->
		<!--
		<view class="card-box">
			<u-grid :col="5" :border="false">
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.wallet.integral }}</view>
					<view class="u-font-xs u-m-t-10">积分</view>
				</u-grid-item>
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.wallet.coupon }}</view>
					<view class="u-font-xs u-m-t-10">优惠券</view>
				</u-grid-item>
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.wallet.redPacket }}</view>
					<view class="u-font-xs u-m-t-10">红包</view>
				</u-grid-item>
				<u-grid-item>
					<view class="u-font-xl">{{ list.model.wallet.money }}</view>
					<view class="u-font-xs u-m-t-10">余额</view>
				</u-grid-item>
				<u-grid-item class="all-order">
					<image class="cut-off-line" src="/static/user/cut_off_line.png" mode=""></image>
					<u-icon name="order" label="我的钱包" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
			</u-grid>
		</view>
		-->

		<!-- 其它 -->
		<view class="other-panel-box">
			<u-cell-group :border="list.border">
				<view class="panel-main">
					<template v-for="(item, index) in cells">
						<u-cell-item :key="index"
							v-if="!!item.click"
							:title="item.title"
							:value="item.value"
							@click="item.click"
							:border-bottom="list.borderBottom">
						</u-cell-item>
						<u-cell-item :key="index"
							v-else
							:title="item.title"
							:value="item.value"
							@click="openPage(item.path)"
							:border-bottom="list.borderBottom">
						</u-cell-item>
					</template>
				</view>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
export default {
	data() {
		return {
			cells: [
				{
					title: '设置',
					value: '',
					path: 'user/setting/setting'
				},
				{
					title: '意见反馈',
					value: '',
					path: 'suggestion/suggestion'
				},
				{
					title: '检查更新',
					value: '',
					click: () => {
						let that = this
						//#ifdef APP-PLUS
						console.log(plus.push.getClientInfo().clientid)
						/* 5+环境锁定屏幕方向 */
						plus.screen.lockOrientation('portrait-primary'); //锁定
						/* 检查更新 */
						//客户端信息
						plus.runtime.getProperty(plus.runtime.appid, function(res){
							that.api.getLatestVersion({ appid: res.appid, currentAppVersion: res.version }).then(r => {
								if (!r) {
									uni.showToast({
										position: "bottom",
										title: "版本查询出现错误"
									})
									return;
								}
								if (res.version != r.clientVersion) { 
									that.navigator.toUpdate({
										url: r.downloadUrl
									})
								} else if(res.version == r.clientVersion) {
									uni.showToast({
										position: "bottom",
										title: "当前版本已经是最新版本"
									})
								}
								
							})
						})
						//#endif
					}
				},
				{
					title: '关于',
					value: 'v' + (this.$store.state.versionInfo.version || "0.0.1"),
					path: ''
				},
				
				{
					title: "已有帐号",
					value: "切换",
					path: 'account/login/pwd-login'
				}
			],
			list: {
				border: true,
				borderBottom: false,
				model: {
					user: {
						/* 图像 */
						userFace: '',
						/* 昵称 */
						nickName: '',
						/* 标签 */
						userTag: ['钻石会员', '达人']
					},
					trace: {
						/* 商品关注 */
						product: '0',
						/* 品牌关注 */
						brand: '0',
						/* 活动关注 */
						activity: '0',
						/* 浏览记录 */
						history: '0'
					},
					wallet: {
						/* 积分 */
						integral: '0',
						/* 优惠券 */
						coupon: '0',
						/* 红包 */
						redPacket: '0.00',
						/* 余额 */
						money: '0.00'
					}
				}
			}
		};
	},
	computed: {
		...mapState(["userInfo", "versionInfo"])
	},
	methods: {
		openPage(path) {
			uni.navigateTo({
				url: "/pages/" + path
			})
		}
	},
	onLoad() {
		console.log(this.userInfo)
		this.list.model.user = this.userInfo;
	}
};
</script>

<style lang="scss" scoped>
.my-box {
	.user-panel-box {
		background-color: #ffffff;
		padding: 40rpx 20rpx;
	}

	.user-card-box {
		margin: 0 12rpx;
		padding: 20rpx 20rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
	}

	.trace-panel-box {
		background-color: #ffffff;
		padding: 0 10rpx 10rpx 10rpx;
	}

	.trace-card-box {
		margin: 0 12rpx;
		padding: 10rpx 10rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
	}

	.panel-box {
		background-color: #ffffff;

		.panel-header {
			padding: 30rpx 32rpx 20rpx 32rpx;
		}

		.panel-main {
			padding: 10rpx 0;
		}
	}

	.card-box {
		padding: 10rpx 0;
		background-color: #ffffff;

		.all-order {
			position: relative;
			.cut-off-line {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0rpx;
				width: 30rpx;
				height: 160rpx;
			}
		}
	}

	.other-panel-box {
		.panel-main {
		}
	}

	.other-card-box {
		margin: 0 12rpx;
		padding: 10rpx 0;
		border-radius: 16rpx;
		background-color: #ffffff;
	}
}
</style>
