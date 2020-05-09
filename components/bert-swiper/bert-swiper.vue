<template>
    <view class="tabs">
		<slot name="aa">asd</slot>
		<scroll-view class="scroll-view_H" :show-scrollbar="false" scroll-x="true">
			<template v-for="(tab,index) in tabList">
				<view id="demo1" class="scroll-view-item_H uni-bg-red">{{tab.title}}</view>
			</template>
			<view class="tab-under-line"></view>
		</scroll-view>	
		<swiper class="swiper" :duration="300" :style="{height: swiperHeight + 'px'}">
			<template v-for="(tab, index) in tabList">
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;">
						<slot :name="tab.id">{{tab.title}}</slot>
					</scroll-view>
				</swiper-item>
			</template>
		</swiper>
		<!--
        <scroll-view ref="tabbar1" id="tab-bar" class="tab-bar" :scroll="false" :scroll-x="true" :show-scrollbar="false"
            :scroll-into-view="scrollInto">
            <view style="flex-direction: column;">
                <view style="flex-direction: row;">
					<slot name="header">
						<view class="uni-tab-item" v-for="(tab,index) in tabList" :key="tab.id" :id="tab.id" :ref="'tabitem'+index"
							:data-id="index" :data-current="index" @click="ontabtap">
							<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
						</view>
					</slot>
                </view>
                <view class="scroll-view-indicator">
                    <view ref="underline" class="scroll-view-underline" :class="isTap ? 'scroll-view-animation':''"
                        :style="{left: indicatorLineLeft + 'px', width: indicatorLineWidth + 'px'}"></view>
                </view>
            </view>
        </scroll-view>
        <view class="tab-bar-line"></view>			
        <swiper class="tab-box" ref="swiper1" id="tab-bar-view" :current="tabIndex" :duration="300" @change="onswiperchange"
            @transition="onswiperscroll" @animationfinish="animationfinish" @onAnimationEnd="animationfinish">
			<swiper-item class="swiper-item" v-for="(page, index) in tabList" :ref="page.id" :key="index" :id="page.id">
				<view class="page-item">
					<scroll-view class="listview" style="flex: 1;" enableBackToTop="true" scroll-y>
						<slot :name="page.id">
							{{ page.id }}
						</slot>
					</scroll-view>
				</view>
			</swiper-item>
        </swiper>-->
    </view>
</template>

<script>
    // #ifdef APP-NVUE
    const dom = weex.requireModule('dom');
    // #endif

    // 缓存每页最多
    const MAX_CACHE_DATA = 100;

    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;
    const TAB_PRELOAD_OFFSET = 1;


    export default {
		props: {
			swiperHeight: {String, Number},
			tabList: Array
		},
        data() {
            return {
                tabIndex: 0,
                cacheTab: [],
                scrollInto: "",
                indicatorLineLeft: 0,
                indicatorLineWidth: 0,
                isTap: false
            }
        },
		computed: {
			pageList() {
				return this.tabList.map((o) => {
					return this.$refs[o.id]
				})
			}
		},
        created() {
		},
		mounted() {
            /*this._lastTabIndex = 0;
            this.swiperWidth = 0;
            this.tabbarWidth = 0;
            this.tabListSize = {};
            this._touchTabIndex = 0;
			
            this.switchTab(this.tabIndex);

            this.getTabbarItemsSize();*/
        },
        methods: {
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;

                // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
                this.isTap = true;
                var currentSize = this.tabListSize[index];
                this.updateIndicator(currentSize.left, currentSize.width);
                this._touchTabIndex = index;
                // #endif

                this.switchTab(index);
            },
            onswiperchange(e) {
				let index = e.target.current || e.detail.current;
				this.$emit("change", index)
                // 注意：百度小程序会触发2次

                // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
                this.switchTab(index);
                // #endif
            },
            onswiperscroll(e) {
                if (this.isTap) {
                    return;
                }

                var offsetX = e.detail.dx;
                var preloadIndex = this._lastTabIndex;
                if (offsetX > TAB_PRELOAD_OFFSET) {
                    preloadIndex++;
                } else if (offsetX < -TAB_PRELOAD_OFFSET) {
                    preloadIndex--;
                }
                if (preloadIndex === this._lastTabIndex || preloadIndex < 0 || preloadIndex > this.pageList.length - 1) {
                    return;
                }

                /// 计算 tabbar 底线
                // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
                this.updateIndicator(lineL, lineW);
                // #endif
            },
            animationfinish(e) {
                // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
                let index = e.detail.current;
                if (this._touchTabIndex === index) {
                    this.isTap = false;
                }
                this._lastTabIndex = index;
                this.switchTab(index);
                this.updateIndicator(this.tabListSize[index].left, this.tabListSize[index].width);
                // #endif
            },
            getTabbarItemsSize() {
                // #ifdef APP-NVUE
                // 查询 tabbar 宽度
                uni.createSelectorQuery().in(this).select('#tab-bar').boundingClientRect().exec(rect => {
                    this.tabbarWidth = rect[0].width;
                });
                // 查询 tabview 宽度
                uni.createSelectorQuery().in(this).select('#tab-bar-view').boundingClientRect().exec(rect => {
                    this.swiperWidth = rect[0].width;
                });

                // 因 nvue 暂不支持 class 查询
                var queryTabSize = uni.createSelectorQuery().in(this);
                for (var i = 0; i < this.tabList.length; i++) {
                    queryTabSize.select('#' + this.tabList[i].id).boundingClientRect();
                }
                queryTabSize.exec(rects => {
                    rects.forEach((rect) => {
                        this.tabListSize[rect.dataset.id] = rect;
                    })
                });
                // #endif

                // #ifdef MP-WEIXIN || H5 || MP-QQ
                uni.createSelectorQuery().in(this).select('.tab-view').fields({
                    dataset: true,
                    size: true,
                }, (res) => {
                    this.swiperWidth = res.width;
                }).exec();
                uni.createSelectorQuery().in(this).selectAll('.uni-tab-item').boundingClientRect((rects) => {
                    rects.forEach((rect) => {
                        this.tabListSize[rect.dataset.id] = rect;
                    })
                }).exec();
                // #endif

                // #ifdef APP-NVUE || H5 || MP-WEIXIN || MP-QQ
                setTimeout(() => {
                    this.updateIndicator(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);
                }, 100)
                // #endif
            },
            updateIndicator(left, width) {
                this.indicatorLineLeft = left;
                this.indicatorLineWidth = width;
            },
            switchTab(index) {

                if (this.tabIndex === index) {
                    return;
                }


                this.tabIndex = index;

                // #ifdef APP-NVUE
                this.scrollTabTo(index);
                // #endif
                // #ifndef APP-NVUE
                this.scrollInto = this.tabList[index].id;
                // #endif

                // 释放 tabId
                if (this.cacheTab.length > MAX_CACHE_PAGE) {
                    let cacheIndex = this.cacheTab[0];
                    this.clearTabData(cacheIndex);
                    this.cacheTab.splice(0, 1);
                }
            },
            scrollTabTo(index) {
                const el = this.$refs['tabitem' + index][0];
                let offset = 0;
                // TODO fix ios offset
                if (index > 0) {
                    offset = this.tabbarWidth / 2 - this.tabListSize[index].width / 2;
                    if (this.tabListSize[index].right < this.tabbarWidth / 2) {
                        offset = this.tabListSize[0].width;
                    }
                }
                dom.scrollToElement(el, {
                    offset: -offset
                });
            },
            loadTabData(index) {
                this.pageList[index].loadData();
            },
            clearTabData(index) {
                this.pageList[index].clear();
            }
        }
    }
</script>

<style>
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .tab-bar {
        width: 750rpx;
        height: 84rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    /* #ifndef APP-NVUE */
    .tab-bar ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }

    /* #endif */

    .scroll-view-indicator {
        position: relative;
        height: 2px;
        background-color: transparent;
    }

    .scroll-view-underline {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 0;
        background-color: #007AFF;
    }

    .scroll-view-animation {
        transition-duration: 0.2s;
        transition-property: left;
    }

    .tab-bar-line {
        height: 1rpx;
        background-color: #cccccc;
    }

    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        padding-left: 25px;
        padding-right: 25px;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

	.swiper-item {
		flex: 1;
		flex-direction: column;
	}
	.page-item {
		flex: 1;
		flex-direction: row;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	.listview {
		flex: 1;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}
	.tab-box {
		flex: 1;
	}
	.swiper {
		background-color: #007AFF;
	}
	.scroll-view_H {
		width: 100%;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 20%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 36rpx;
	}
</style>
