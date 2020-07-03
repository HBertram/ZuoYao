<template>
	<view class="login">
		<view class="background-view"></view>
		<view class="content">
			<view class="logo">
				<image src="./images/logo.png" mode="widthFix"></image>
			</view>
			<view class="login-form">
				<view class="item phone">
					<image class="icon left" src="./images/icon_phone.png" mode="widthFix"></image>
					<input v-model="account" placeholder="工号" placeholder-class="input-placeholder"/>
					<image class="icon right" src="./images/icon_phone_right.png" mode="widthFix"></image>
				</view>
				<view class="item password">
					<image class="icon left" src="./images/icon_pwd.png" mode="widthFix"></image>
					<input displayable v-model="password" placeholder="密码" placeholder-class="input-placeholder"/>
					<image class="icon right" src="./images/icon_pwd_right.png" mode="widthFix"></image>
				</view>
				<view class="btn" @tap="bindLogin">
					<text>登录</text>
				</view>
				<view class="forgot-pwd"><text>忘记密码？</text></view>
			</view>
			
			<view class="login-third">
				<view class="text">
					<image src="./images/icon_line.png" mode="widthFix"></image>
				</view>
				<view class="flex third-buttons">
					<template v-for="provider in providerList">
						登陆
						<image mode="widthFix" :key="provider.value" :src="provider.image" @tap="oauth(provider.value)"></image>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/icons"
	import navigator from "@/common/navigator.js"
	import { mapActions } from "vuex"
	export default {
		data() {
			return {
				 providerList: [],
				 positionTop: 0,
				 account: '',
				 password: ''
			}
		},
		onLoad() {
		},
		components: {uniIcons},
		methods: {
			...mapActions(['login']),
			toMain: navigator.toMain,
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						console.log('获取服务供应商成功：' + JSON.stringify(res));
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '/static/img/icon_' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				if(this.account.length == 0) return
				if(this.password.length == 0) return
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					type: "account",
					userInfo: {
						account: this.account,
						password: this.password
					}
				};
				this.login(data).then((data) => {
					this.getUserInfo();
					this.toMain();
				}).catch((r) => {
					uni.showToast({
						position: "bottom",
						icon: 'none',
						title: '用户或密码不正确',
					});
				})
			},
			oauth(value) {
				let that = this
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								console.log(infoRes)
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								that.login({
									type: value,
									userInfo: infoRes.userInfo
								}).then((res) => {
									console.log(res)
									this.toMain();
								})
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
		}
	}
</script>


<style>
	.background-view {
		background-image: url(images/bg.png);
		left: 0rpx;
		top: 0rpx;
		bottom: 0rpx;
		right: 0rpx;
		position: absolute;
	}	
	.content {position: absolute; top: 0;width: 100%;}
	.logo {text-align: center; margin: 96rpx auto 73rpx auto;}
	.logo image {width: 50%;}
	.login-form {width: 630rpx; margin: auto;}
	.login-form .item {
		width: 630rpx;
		height: 84rpx;
		border-radius: 6rpx;
		margin-bottom: 33rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #4781e2;
	}
	.login-form input {color: #fff; height: 84rpx; line-height: 84rpx;}
	.login-form .item .icon{width: 36rpx; height: 40rpx;}
	.input-placeholder {color: #fff; line-height: 84rpx; height: 84rpx; margin: auto;}
	.login-form .btn{ margin: 43rpx auto 22rpx auto;
		text-align: center;
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 6rpx;
		background-color: #6ea0f8;
	}
	.forgot-pwd {text-align: right;}
	.login-third .text{margin: 137rpx auto 106rpx auto; text-align: center; }
	
	.login-third .flex{text-align: center; display: flex; justify-content: space-around; }
	.login-third .flex image {width: 88rpx; height: 88rpx;}
	text{
		height: 30rpx;
		font-family: PingFang-SC-Regular;
		font-size: 32rpx;
		font-weight: bold;
		font-stretch: normal;
		line-height: 40rpx;
		letter-spacing: 3rpx;
		color: #ffffff;
	}
	.third-buttons {
	}
</style>
