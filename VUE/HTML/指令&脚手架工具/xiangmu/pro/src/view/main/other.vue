<template>
	<div class="other">
		其他
		<hr />
		<h1>{{this.$store.state.count}}</h1>
		<button @click="add()">数字+1</button>
		<button @click="jian()">数字-1</button>
		<hr />
		<el-radio-group v-model="radio" @change="change1">
		    <el-radio label="3">备选项一</el-radio>
		    <el-radio label="6">备选项二</el-radio>
		  </el-radio-group>
  		<div v-if="show">
  			选项一
  			<el-input placeholder="请输入内容"></el-input>
  		</div>
  		<div v-if="show1">
  			选项二
  			<el-input placeholder="请输入内容"></el-input>
  		</div>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		name:"Other",
		data(){
			return{
				tit:'其他',
				radio:'3',
				show:true,
				show1:false
			}
		},
		mounted(){
			this.$emit('toparent',this.tit)
		},
		computed:mapGetters([]),
		methods:mapActions([
			'add',
			'jian'
		]),
		methods:{
			change1(label){
				console.log(label)
				if(label == 3){
					this.show = true
					this.show1 = false
				}else{
					this.show1 = true
					this.show = false
				}
			}
		}
	}
</script>

<style>
</style>