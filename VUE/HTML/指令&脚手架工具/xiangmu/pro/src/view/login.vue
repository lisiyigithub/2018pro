<template>
	<div class="register">
		<h1>登陆</h1>
		<div>
			用户名：<input type="text" v-model="user" />
		</div>
		<div>
			密码：<input type="text" v-model="pass" />
		</div>
		<button @click="login()">登陆</button>
	</div>
</template>

<script>
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
					this.$router.push('/main')
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