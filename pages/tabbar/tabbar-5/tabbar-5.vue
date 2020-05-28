<template>	
		<view class="container">
			<uni-card :isFull="true">
				<view class="person-box">
					<image class="uni-media-list-logo" src="/static/icon/account.png"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-line">
							<text class="person-cname">{{ userInfo.name }}</text>
						</view>
						<view class="uni-media-list-line">
							<text>xuwenqiang</text>
							<text>CNC金型部</text>
							<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
						</view>
					</view>
				</view>
			</uni-card>
			<uni-section title="信息" type="line" style="margin-top: 0px;"></uni-section>
			<uni-list>
				<uni-list-item title="条形码" rightText="条形码"/>
			</uni-list>
			<uni-section title="设置" type="line"></uni-section>
			<uni-list>
				<uni-list-item title="修改密码" rightText="修改密码"/>
				<uni-list-item title="设置服务器" rightText="修改server/ip"/>
			</uni-list>
			<uni-section title="操作" type="line"></uni-section>
			<uni-list>
				<uni-list-item title="退出登陆" rightText="登出" @click="logout"></uni-list-item>
			</uni-list>
		</view>

</template>

	<script>
		import uniList from "@/components/uni-list/uni-list.vue"
		import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
		import { mapState } from "vuex"
		export default {
			components: {uniList, uniListItem },
			data() {
				return {
					bar: ['code128'],
					val: "FB19A1650-100S",
					opations: {
						// format: "CODE128",//选择要使用的条形码类型 微信支持的条码类型有 code128\code39\ena13\ean8\upc\itf14\
						width: 5,//设置条之间的宽度
						height: 120,//高度
						displayValue: true,//是否在条形码下方显示文字
						// text: "FB19A1650-100S",//覆盖显示的文本
						textAlign: "center",//设置文本的水平对齐方式
						textPosition: "bottom",//设置文本的垂直位置
						textMargin: 0,//设置条形码和文本之间的间距
						fontSize: 24,//设置文本的大小
						// fontColor: "#0000ef",//设置文本的颜色
						// lineColor: "#0000ef",//设置条形码的颜色
						background: "#FFFFFF",//设置条形码的背景色
						margin: 0,//设置条形码周围的空白边距
						marginTop: 10,//设置条形码周围的上边距
						// marginBottom: 20,//设置条形码周围的下边距
						// marginLeft: 30,//设置条形码周围的左边距
						// marginRight: 40,//设置条形码周围的右边距
					}
				}
			},
		computed: {
			...mapState(["userInfo"])
		},
			methods: {
				logout() {
					uni.showModal({
						title: '确定框',
						content: `确定登出吗?`,
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success(res) {
							if(res.confirm) {
								uni.clearStorage()
								uni.reLaunch({
									url: "../../login/login"
								})
							}
						}
					})
				}
			}
		}
	</script>

<style>
	.content {
		text-align: center;
		height: 400rpx;
		margin-top: 200rpx;
	}
	
	<style>
	.person-box{
		color: #8f8f94;
		display: flex;
	}
	.uni-media-list-logo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 20rpx;
		padding: 10rpx;
		border: solid #000 1rpx;
	}
	
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}
	
	.uni-media-list-text-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-media-list-line {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-between;
	}
	.person-cname {
		color: #1e1e1e;
		font-size: 40rpx; 
		font-weight: bold;
	}
	</style>
	
