<template>
  <view>
	<view class="info">
		<view v-if="isEdit">
			<uni-list>
				<uni-list-item title="名称" rightText="生活篇"></uni-list-item>
			</uni-list>
			<uni-list>
				<uni-list-item title="描述" rightText="生活中寻找美丽的瞬间"></uni-list-item>
			</uni-list>
			<uni-list>
				<uni-list-item title="注意事项" rightText="无"></uni-list-item>
			</uni-list>
		</view>
		<view v-else>
			<view class="form-item uni-flex">
				<view class="form-label">描述</view>
				<text class="form-value">生活中寻找美丽的瞬间</text>
			</view>
			<view class="form-item uni-flex">
				<view class="form-label">注意事项</view>
				<text class="form-value">无</text>
			</view>
		</view>
	</view>
	<template v-for="(groupActivity, groupIndex) in chapter.groupActivityList">
		<view v-if="!!groupActivity.activityList.length" :key="groupActivity.id">
		  <uni-section class="section" v-show="showSection" :title="groupActivity.name" type="line"></uni-section>
		  <checkbox-group class="content">
				<template v-for="(item, index) in groupActivity.activityList">
					<view :key="item.id" :class="item.checked && !isEdit ?  'activity-item selectBox' : 'activity-item '">
						<checkbox :checked="item.checked" v-show="false"/>
						<text @longpress="showDetail(item)" @click="onActivityClick(item)" :key="index" >  
							{{item.name}}
						</text>
						<uni-icons v-if="isEdit" @click="deleteActivity(groupActivity.activityList, item)" class="delete-icon" type="closeempty"></uni-icons>
					</view>
				</template>
				<view v-if="isEdit" class="add-activity-button" @click="addActivity(groupActivity)">
					<uni-icons color="#eb5248" size="20" type="plus"></uni-icons>
				</view>
		  </checkbox-group>
		</view>
	</template>
	<uni-section v-if="isEdit" class="section" v-show="showSection" title="新增" type="line">
		<uni-icons @click="addGroup" color="#55aaff" size="25" type="plus"></uni-icons>
	</uni-section>
  </view>
</template>


<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import evanForm from "@/components/evan-form/evan-form.vue"
	import evanFormItem from "@/components/evan-form/evan-form-item.vue"
  export default {
	  components: {evanForm, evanFormItem},
	  props: {
		  isEdit: {
			  type: Boolean,
			  required: false,
			  default: false
		  },
		  showSection: {
			  type: Boolean,
			  required: false,
			  default: true
		  },
		  title: {
			  type: String,
			  required: false,
			  default: "标签"
		  },
		  type: {
			  type: String,
			  required: false,
			  default: "default"
		  },
		  chapter: {
			  type: Object,
			  required: true
		  }
	  },
    data() {
      return {
		  addTag: {
			  value: "",
			  isAdding: false,
			  text: "点击新增"
		  }
      };
    },
    methods:{
		addGroup() {
			
		},
		addActivity(groupActivity) {
			this.navigator.toActivityEdit()
		},
		editActivity() {
			this.navigator.toActivityEdit()
		},
		onActivityClick(item) {
			if (this.isEdit) {
				this.editActivity(item)
			} else {
				item.checked = !item.checked
			}
		},
		showDetail(item) {
			this.navigator.toActivityDetail()
		},
		text () {
		  return function (value) {
			if (value == '' || value == 0) {
			  return '100%'
			} else {
			  return String(value).length * 0.32 + 'rem'
			}
		  }
		},
      labelBtn(e) {
		  console.log(e)
		this.$emit("changeValue")
	  },
	  getTotalValue() {
		  return this.chapter.activityGroup.map((o) => o.activityList.getCheckedValue()).reduce((i, j) => i+j); 
	  },
	  deleteActivity(lst, item) {
		  lst.splice(lst.indexOf(item), 1);
	  }
    }
  }
</script>

<style>
  .selectBox{
    background-color: #EB5248!important;
    color: #fff!important;
  }
  .activity-item {
	position: relative;
	display: inline-block;
	flex-wrap: wrap;
	padding: 5rpx 10rpx;
	border: 1rpx solid #EB5248;
	margin: 12rpx;
	border-radius: 7rpx;
	color: #000;
  }
  .checkbox{
  }
  .content{
    padding: 5rpx 20rpx 5rpx 20rpx;
  }
  .add-tag{
	  color: #ffffff;
	  background-color: #eb5248;
  }
  .section{
	  height: 70rpx;
	  margin: 0rpx;
  }
  .delete-icon {
	  font-weight: bolder;
  }
  .add-text {
	  height: 100rpx;
  }
  
  /* form */
  .info {
	  padding: 0 20rpx;
  }
	.form-item {
		margin: 10rpx;
	}
	.form-label {
		flex: 3;
		color: #7f7f7f;
	}
	.form-value {
		flex: 8;
		color: #2b2b2b;
	}
	.form-input {
		border-bottom: 1px solid #000000;
	}
	.add-group {
		display: flex;
		justify-content: center;
	}
	.add-activity-button {
		display: inline;
		margin-left: 20rpx;
		font-weight: bold;
	}
</style>
