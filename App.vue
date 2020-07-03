<script>
	import { mapActions, mapMutations } from "vuex"
	import { SET_VERSIONINFO } from "./store/mutations_type.js"
	import store from "./store/index.js"
	import api from "api/api.js"
	import navigator from "common/navigator.js"
export default {
	methods: {
		...mapMutations([SET_VERSIONINFO]),
		...mapActions(["getUserInfo"])
	},
	onLaunch: async function() {
		console.log('App Launch');
		
		setTimeout(() => {
			//#ifdef APP-PLUS
			console.log(plus.push.getClientInfo().clientid)
			/* 5+环境锁定屏幕方向 */
			plus.screen.lockOrientation('portrait-primary'); //锁定
			/* 检查更新 */
			//客户端信息
			plus.runtime.getProperty(plus.runtime.appid, function(res) {
				store.commit(SET_VERSIONINFO, res)
				api.getLatestVersion({ appid: res.appid, currentAppVersion: res.version }).then(r => {
					if (!r) return;
					if (res.version != r.clientVersion) { 
						navigator.toUpdate({
							url: r.downloadUrl
						})
					}
				})
			})
			//#endif
			/*
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
			*/
		}, 1000);
		
		await this.getUserInfo()
			
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import '/common/uni.css';
@import '/common/common.css';

</style>
