<template>
	<div class="main">
		<header>{{tit}}</header>
		<section>
			<router-view @toparent="getdata"></router-view>
		</section>
		<footer>
			<router-link to="/home" tag="span">首页</router-link>
			<router-link to="/about" tag="span">关于</router-link>
			<router-link to="/other" tag="span">其他</router-link>
		</footer>
	</div>
</template>

<script>
	export default{
		name:"Main",
		data(){
			return{
				tit:"首页"
			}
		},
		methods:{
			getdata(msg){
				this.tit = msg
			}
		}
	}
</script>

<style scoped="">
	.main{
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	header,footer{
		height: 50px;
		line-height: 50px;
		text-align: center;
		color:#fff;
		background:orange;
		overflow: hidden;
		font-size: 18px;
	}
	section{
		flex: 1;
		overflow-y: auto;
	}
	
	footer span{
		width: 33.3%;
		float: left;
		text-align: center;
	}
	
	.router-link-active{
		color: hotpink;
	}
</style>