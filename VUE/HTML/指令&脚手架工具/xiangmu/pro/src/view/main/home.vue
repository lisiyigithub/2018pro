<template>
	<div class="home">
		首页
		<p>{{str}}</p>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:"Home",
		data(){
			return{
				tit:'首页',
				str:""
			}
		},
		mounted(){
			this.$emit('toparent',this.tit)
			let _this = this
			axios('http://localhost:3000',{
				method:'get'
			}).then(function(data){
				console.log(data)
				_this.str = data.data
			})
		}
	}
</script>

<style>
</style>