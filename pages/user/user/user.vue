<template>
	<view class="user-box">
		<u-gap height="20"></u-gap>

		<u-cell-group :border="list.border">
			<u-cell-item title="头像" :center="true" :border-bottom="list.borderBottom">
				<u-avatar :src="list.model.userFace" mode="circle"></u-avatar>
			</u-cell-item>
			<u-cell-item title="用户名" :value="list.model.userName" :arrow="false" :border-bottom="list.borderBottom"></u-cell-item>
			<u-cell-item title="昵称" :value="list.model.nickName" :border-bottom="list.borderBottom"></u-cell-item>
		</u-cell-group>
		
		<u-gap height="20"></u-gap>
		
		<u-cell-group :border="list.border">
			<u-cell-item title="真实姓名" :value="list.model.realName" :border-bottom="list.borderBottom"></u-cell-item>
			<u-cell-item title="性别" :value="list.model.sex" :border-bottom="list.borderBottom"></u-cell-item>
			<u-cell-item title="出生日期" :value="list.model.birthDate" :border-bottom="list.borderBottom"></u-cell-item>
			<u-cell-item title="区域" :value="list.model.area" :border-bottom="list.borderBottom"></u-cell-item>
			<u-cell-item title="地址" :value="list.model.address" :border-bottom="list.borderBottom"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import { mapState } from "vuex"
export default {
	data() {
		return {
			list: {
				border: false,
				borderBottom: false,
				model: {
					/* 图像 */
					userFace: '',
					/* 用户名 */
					userName: '',
					/* 昵称 */
					nickName: '',
					/* 真实姓名 */
					realName: '',
					/* 性别 */
					sex: '',
					/* 出生日期 */
					birthDate: '',
					/* 区域 */
					area : '',
					/* 地址 */
					address: ''
				}
			}
		};
	},
	computed: {
		...mapState(["userInfo"])
	},
	onLoad() {
		this.list.model.userFace = this.userInfo.icon;
		this.list.model.userName = this.userInfo.name;
		this.list.model.nickName = this.userInfo.nickName;
		this.list.model.realName = '青松';
		this.list.model.sex = this.userInfo.sex;
		this.list.model.birthDate = this.userInfo.birthDate;
		this.list.model.area = this.userInfo.area;
		this.list.model.address = this.userInfo.address;
	},
	methods: {
		back() {
			uni.navigateBack({})
		}
	}
};
</script>

<style lang="scss" scoped></style>
