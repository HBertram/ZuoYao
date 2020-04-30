<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<view class="container" :class="getFixedClass">
		<scroll-view scroll-y class="scrollView" lower-threshold="200" :scroll-top="scrollTop" @scroll="scrollFn"
		 @scrolltolower="getList(false, false, false)">
			<view class="scroll-container" :style="{ 'opacity': scrollToTopEnd?1:0 }">
				<!-- 由type属性控制展示模板 -->
				<block v-if="type === 'xxx'">
				</block>
				<block v-else>
					<view class="width100">
						<defTemplate ref="component" :tab="tab" :index="index" :current="current" :type="type" :show="getShow"
						 :readyRefresh="readyRefresh" @refreshEnd="refreshEnd"></defTemplate>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 引入./components下的模板, 根据type筛选, 别忘了下面components中注册
	import defTemplate from './components/QS-tabs-wxs-template-def.vue';



	// 组件必须
	import {
		QSTabsWxsListMixin
	} from '../mixins/QS-tabs-wxs-list-mixin.js';

	import {
		getTabList
	} from '@/util/getTabList.js';
	import {
		doPageDemand
	} from '../js/pageDemand.js';
	export default {
		components: {
			defTemplate
		},

		mixins: [QSTabsWxsListMixin()], // 组件必须
		data() {
			return {

			}
		},
		methods: {
			init(refresh) { //若是用户触发下拉刷新则refresh为true
				const ref = this.$refs.component;
				if(!ref) {
					console.log('模板未绑定ref')
					return;
				}
				const initFn = this.$refs.component.init;
				if(initFn && typeof initFn === 'function') this.$refs.component.init(refresh);
			},
			getList(refresh, doEvent, force) {
				const ref = this.$refs.component;
				if(!ref) {
					console.log('模板未绑定ref')
					return;
				}
				const getListFn = this.$refs.component.getList;
				if(getListFn && typeof getListFn === 'function') this.$refs.component.getList(refresh, doEvent, force);
			},
			refreshEnd(status) {
				this.$emit('refreshEnd', status ? 4 : 5);
			}
		}
	}
</script>

<style scoped>
	@import url("../css/box-sizing-border-box.css");
	@import url("../css/QS-tabs-wxs-list-template.css");
</style>
