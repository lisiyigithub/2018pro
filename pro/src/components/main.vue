<template>
	<div id="main">
		<header>Home</header>
		<section>
			<router-view/>
		</section>
		<footer>
			<router-link to="/home">首页</router-link>
			<router-link to="/about">关于</router-link>
			<router-link to="/other">其他</router-link>
			<router-link to="/mine">我的</router-link>
		</footer>
	</div>
</template>

<script>
	export default{
		name:"Main"
	}
</script>

<style scoped="">
	#main{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	section{
		flex: 1;
		overflow: hidden;
	}
	header,footer{
		height: 44px;
		line-height: 44px;
		background: orange;
		color: #fff;
		text-align: center;
	}
	footer{
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	footer a{
		width: 25%;
		float: left;
		text-align: center;
		text-decoration: none;
		color: #fff;
	}
	.router-link-active{
		color: #000;
	}
</style>