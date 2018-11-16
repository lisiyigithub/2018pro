<template>
	<div id="about">
		<input type="text" name="" id="" v-model="value">
		<p>接收子组件信息------{{message}}</p>
		<!-- 父传子 -->
		<Detail :name="value" @toparent="msg"></Detail>
	</div>
</template>

<script>
import Detail from '../components/detail'
	export default{
		name:"About",
		data(){
			return{
				value:"",
				message:""
			}
		},
		methods:{
			msg(data){
				var _this = this
				_this.message = data
			}
		},
		components:{
			Detail
		}
	}
</script>

<style>
</style>