<template>
	<account-page :title="title" :desc="desc">
		<list></list>
		
		<u-gap height="40"></u-gap>
	</account-page>
</template>

<script>
import list from '@/components/my/my-setting.vue';
export default {
	components: {
		list
	},
	data() {
		return {
			title: '设置',
			desc: ''
		};
	},
	onLoad() {
	}
};
</script>

<style lang="scss" scoped></style>
