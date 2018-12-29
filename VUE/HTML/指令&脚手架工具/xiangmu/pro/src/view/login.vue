<template>
	<div class="register">
		<h1>登陆</h1>
		<div>
			用户名：<el-input type="text" v-model="user" />
		</div>
		<div style="margin-bottom: 20px;">
			密码：<el-input type="text" v-model="pass" />
		</div>
		<mt-button type="primary" size="large" @click="login()">登陆</mt-button>
		<mt-swipe :auto="4000" style="height: 200px;">
		  <mt-swipe-item style="background:orange">1</mt-swipe-item>
		  <mt-swipe-item style="background:yellow">2</mt-swipe-item>
		  <mt-swipe-item style="background:pink">3</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	import store from '../store/store.js';
	export default{
		name:"Login",
		data(){
			return{
				user:'',
				pass:''
			}
		},
		methods:{
			login(){
				if(this.user&&this.pass != ""){
					store.commit('shuju',this.user)
					this.$router.push('/main')
					sessionStorage.setItem('user',this.user)
				}else{
					alert('账号密码不能为空')
				}
			}
		}
	}
</script>

<style>
	button,input{
		border: 1px solid #000;
	}
</style>