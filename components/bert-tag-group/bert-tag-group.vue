<template>
  <view>
	<uni-section v-show="showSection" :title="title" type="line"></uni-section>
    <checkbox-group class="content" @change="checkboxChange">
		<template v-for="(item,index) in labelList">
			<label @click="labelBtn(item.value,index)" :key="item.value" :class="item.checked ?  'checkbox selectBox' : 'checkbox '">  
				<checkbox :value="item.value" :checked="item.checked" v-show="false"/>{{item.name}}
			</label>
		</template>
    </checkbox-group>
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
		  labelList: {
			  type: Array,
			  default: [],
			  required: true
		  }
	  },
    data() {
      return {
        labelName:''
      };
    },
    methods:{
      labelBtn(name,index){
        this.labelName = name
	    this.labelList[index].checked = this.labelDataList.includes(name)
      },
      checkboxChange: function (e) {
        this.labelDataList = e.detail.value
      },
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
    padding: 10px;
  }
</style>
