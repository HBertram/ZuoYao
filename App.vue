<script>
	import { mapState } from "vuex"
export default {
	computed: {
		...mapState (["hasLogin"])
	},
	onLaunch: function() {
		console.log(this.hasLogin)
		if ( !this.hasLogin ) {
			uni.reLaunch({
				url: "pages/login/login"
			})
		}
		console.log('App Launch');
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import '/common/uni.css';
@import '/common/common.css';
</style>
