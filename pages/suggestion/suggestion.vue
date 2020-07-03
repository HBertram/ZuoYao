<template>
	<suggest @submit="submit"></suggest>
</template>

<script>
	import suggest from "@/components/suggest/suggest.vue"
	export default {
		components: { suggest },
		data() {
			return {
				
			}
		},
		methods: {
			submit(data) {
				this.api.suggestion(data).then(r => {
					uni.navigateBack({
					})
					setTimeout(() => {
						uni.showToast({
							position: "bottom",
							title: "提交成功，感谢您的建议!"
						})
					}, 10)
					
				})
			}
		}
	}
</script>

<style>
</style>
