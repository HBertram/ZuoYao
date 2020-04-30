<template>
  <view>
	  <template v-for="groupActivity in groupActivityList">
		  <uni-section class="section" v-show="showSection" :title="groupActivity.name" type="line"></uni-section>
		  <checkbox-group class="content">
			<template v-for="(item,index) in groupActivity.activityList">
				<label @click="labelBtn(item.value, index)" :key="index" :class="item.checked ?  'checkbox selectBox' : 'checkbox '">  
					<checkbox :checked="item.checked" v-show="false"/>{{item.name}}
				</label>
			</template>
			<label v-if="false" class="checkbox add-tag" @click="addTag.isAdding = true">
				<input v-show="addTag.isAdding" v-model="addTag.value" type="text" :style="{width:text(addTag.value)}"/>
				<uni-tag v-show="!addTag.isAdding">{{ addTag.text }}</uni-tag>
			</label>
		  </checkbox-group>
	  </template>
  </view>
</template>

<script>
  export default {
	  props: {
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
		  groupActivityList: {
			  type: Array,
			  default: {},
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
		text () {
		  return function (value) {
			if (value == '' || value == 0) {
			  return '100%'
			} else {
			  return String(value).length * 0.32 + 'rem'
			}
		  }
		},
      labelBtn(name,index){
	    this.activityGroup[index].checked = !this.activityGroup[index].checked
		this.$emit("changeValue", {type: this.type, totalValue: this.getTotalValue()})
	  },
	  getTotalValue() {
		  return this.activityGroup.map((o) => o.activityList.getCheckedValue()).reduce((i, j) => i+j); 
	  }
    }
  }
</script>

<style>
  .selectBox{
    background: #EB5248!important;
    color: #fff!important;
  }
  .checkbox{
	display: inline-flex;
	flex-wrap:wrap;
    padding: 5px 10px;
    border: 1px solid #EB5248;
    margin: 4px;
    border-radius: 7upx;
    color: #000;
  }
  .content{
    padding: 5upx 20upx 5upx 20upx;
  }
  .add-tag{
	
  }
  .section{
	  height: 70upx;
	  margin: 0upx;
  }
</style>
